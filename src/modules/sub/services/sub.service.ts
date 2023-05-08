import { Injectable } from '@nestjs/common/decorators';
import { ICreateSubDTO } from '../dtos/ICreateSubDTO';
import { Sub } from '@prisma/client';
import { ISubRepository } from '../contracts/ISubRepository';
import { MessageService } from '../../msg/services/msg.service';
import { blockConfig } from '../../../config/blockConfig';
import QRCode from 'qrcode';
import QRCodeReader from 'qrcode-reader';
import Jimp from 'jimp';
import fs from 'fs';
import { QRCodePaths } from '../../../config/resolver/QRCodePaths.resolver';
import path from 'path';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { OnEvent } from '@nestjs/event-emitter';
import { IDateProvider } from '../../../_shared/providers/date/contract/IDateProvider';
import { IMessageRepository } from '../../msg/contracts/IMessageRepository';

Injectable();
export class SubService {
  constructor(
    readonly subRepository: ISubRepository,
    readonly msgService: MessageService,
    readonly dateProvider: IDateProvider,
    readonly msgRepository: IMessageRepository,
  ) {}

  //Revisado
  async create(sub: ICreateSubDTO): Promise<void> {
    const encodePassword = await bcrypt.hash(sub.password, 10);
    await this.subRepository.create({ password: encodePassword, ...sub });
  }

  //Revisado
  async findById(id: string): Promise<Sub> {
    const sub = await this.subRepository.findById(id);

    if (!sub) {
      throw new HttpException('Sub not found!', HttpStatus['NOT_FOUND']);
    }

    return sub;
  }

  //Revisado
  async findByEmail(email: string): Promise<Sub> {
    const sub = await this.subRepository.findByEmail(email);

    if (!sub) {
      throw new HttpException('Sub not found!', HttpStatus['NOT_FOUND']);
    }

    return sub;
  }

  //Revisado
  @OnEvent('new.SUB')
  async connectionEmail(email: string): Promise<void> {
    const sub = await this.findByEmail(email);

    const connectionMsgs = await this.msgRepository.findByBlock(sub.block);
    const orderingMsgs = connectionMsgs
      .sort(
        (item, nextItem) =>
          new Date(nextItem.created_at).getTime() -
          new Date(item.created_at).getTime(),
      )
      .reverse()
      .filter((msg) => msg.subject === 'Seja bem vindo a nossa lista de email');

    const { id } = orderingMsgs[0];

    await this.msgService.notifySubs(id, false);
  }

  //Revisado
  async findAll(): Promise<Sub[]> {
    return await this.subRepository.findAll();
  }

  //Revisado
  async updateStageBlock(id: string): Promise<void> {
    const sub = await this.findById(id);
    const { block, last_message } = sub;

    const msgs = await this.msgRepository.findByBlock(block);

    if (
      last_message === msgs[msgs.length - 1].id &&
      block !== blockConfig.block['REMARKETING']
    ) {
      const actualBlock = blockConfig[sub.block];
      let nextBlock: string;

      for (let item = 0; item < Object.keys(blockConfig.block).length; item++) {
        const actualItem = Object.keys(blockConfig.block)[item];
        const nextItem = Object.keys(blockConfig.block)[item + 1];

        if (actualItem === actualBlock) continue;
        {
          nextBlock = nextItem;
        }
        if (nextItem === 'REMARKETING') {
          await this.isUnActive(id);
          break;
        }
      }

      await this.subRepository.updateStageBlock(id, nextBlock);
    }
  }

  //Revisado
  async updateLastMessage(id: string, last_message: string): Promise<void> {
    await this.subRepository.updateLastMessage(id, last_message);
  }

  //Revisado
  async isUnActive(id: string): Promise<void> {
    await this.subRepository.isUnActive(id);
  }

  async generateSubQRCode(id: string): Promise<void> {
    const sub = await this.subRepository.findById(id);

    const stringData = JSON.stringify(sub);
    QRCode.toDataURL(stringData, (error, url) => {
      if (error) {
        throw new Error(error.message);
      }

      fs.writeFileSync(
        `${path.join(QRCodePaths.qrCode_path)}/${sub.id}.png`,
        url,
      );
    });
  }

  async readSubQRCode(qrCode: Express.Multer.File): Promise<Sub> {
    if (!qrCode) {
      throw new BadRequestException();
    }

    let qrCodeContent;
    fs.readFile(qrCode.buffer, (error, buffer) => {
      if (error) {
        throw new Error(error.message);
      }

      Jimp.read(buffer, (err, value) => {
        if (err) {
          throw new Error(err.message);
        }

        const qrCode = new QRCodeReader();
        qrCodeContent = qrCode.decode(value);
      });
    });

    const sub = JSON.parse(qrCodeContent) as Sub;
    return sub;
  }

  //Revisado
  @OnEvent('group.HISTORY')
  async groupingSubsByFlowHistory(group_by: string) {
    const [aggroupedDelimiter, flags] = group_by.split(':');
    const splitDelimiter = flags.split(';');

    const subs = await this.subRepository.findAll();
    let aggroupedSubs: Sub[];

    const groupByPreviousHistory = async (segment_flag: string) => {
      const inPreviousBlock: Sub[] = [];

      for (const sub of subs) {
        const { previous_history } = sub;
        const blocks = previous_history.split(';');

        if (blocks.includes(segment_flag)) {
          inPreviousBlock.push(sub);
        }
      }

      return inPreviousBlock;
    };

    const groupByBlock = async (flag: string) => {
      const inBlock: Sub[] = subs.filter((sub) => sub.block === flag);
      return inBlock;
    };

    for (const flag of splitDelimiter) {
      if (aggroupedDelimiter === 'PREVIOUS_HISTORY') {
        aggroupedSubs = await groupByPreviousHistory(flag);
      } else if (aggroupedDelimiter === 'BLOCK') {
        aggroupedSubs = await groupByBlock(flag);
      }
    }

    return aggroupedSubs;
  }

  //Revisado
  @OnEvent('group.DATE')
  async groupSubsByDate(standard: string): Promise<Sub[]> {
    const targetDates = standard.split(';');
    const [start_at, finished_at] = targetDates;

    const subs = await this.subRepository.findAll();

    const filterSubs = subs.filter(
      async (sub) =>
        (await this.dateProvider.compareIsBefore(
          sub.created_at,
          new Date(finished_at),
        )) &&
        (await this.dateProvider.compareIsAfter(
          sub.created_at,
          new Date(start_at),
        )),
    );

    return filterSubs;
  }

  //Revisado
  @OnEvent('group.ACTIVE')
  async groupSubsByActive(): Promise<Sub[]> {
    const subs = await this.subRepository.findActiveSubs();
    return subs;
  }

  //Revisado
  @OnEvent('group.LAST_MESSAGE')
  async groupSubsByLastMessageInFlow(standard: string): Promise<Sub[]> {
    const subs = await this.subRepository.findAll();

    const filterSubs = subs.filter((sub) => sub.last_message === standard);
    return filterSubs;
  }

  //Revisado
  @OnEvent('group.UN_ACTIVE')
  async groupSubsByUnActive(): Promise<Sub[]> {
    const activeSubs = await this.subRepository.findActiveSubs();
    const subs = await this.subRepository.findAll();

    const unActiveSubs = subs.filter((sub) => !activeSubs.includes(sub));
    return unActiveSubs;
  }
}
