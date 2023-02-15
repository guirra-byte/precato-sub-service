import { Injectable } from '@nestjs/common/decorators';
import { ICreateSubDTO } from '../dtos/ICreateSubDTO';
import { Sub } from '@prisma/client';
import { ISubRepository } from '../contracts/ISubRepository';
import { MessageService } from 'src/modules/msg/services/msg.service';
import { blockConfig } from 'src/config/blockConfig';
import QRCode from 'qrcode';
import QRCodeReader from 'qrcode-reader';
import Jimp from 'jimp';
import fs from 'fs';
import { QRCodePaths } from 'src/config/resolver/QRCodePaths.resolver';
import path from 'path';
import { BadRequestException } from '@nestjs/common';

Injectable();
export class SubService {
  constructor(
    private readonly subRepository: ISubRepository,
    private msgService: MessageService,
  ) {}

  async create(sub: ICreateSubDTO): Promise<void> {
    await this.subRepository.create(sub);
  }

  async findById(id: string): Promise<Sub> {
    return await this.subRepository.findById(id);
  }

  async findAll(): Promise<Sub[]> {
    return await this.subRepository.findAll();
  }

  async updateStageBlock(id: string): Promise<void> {
    const sub = await this.findById(id);
    const { block, las_message } = sub;

    const msgs = await this.msgService.findByBlock(block);

    if (
      las_message === msgs[msgs.length - 1].id &&
      block !== blockConfig.block['REMARKETING']
    ) {
      const actualBlock = blockConfig[sub.block];
      let nextBlock;

      for (let item = 0; item < Object.keys(blockConfig.block).length; item++) {
        const actualItem = Object.keys(blockConfig.block)[item];
        const nextItem = Object.keys(blockConfig.block)[item + 1];

        if (actualItem === actualBlock) continue;
        {
          nextBlock = {
            nextItem,
          };
        }
        if (nextItem === 'REMARKETING') {
          await this.isUnActive(id);
          break;
        }
      }

      await this.subRepository.updateStageBlock(id, nextBlock);
    }
  }

  async updateLastMessage(id: string, last_message: string): Promise<void> {
    await this.subRepository.updateLastMessage(id, last_message);
  }

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
}
