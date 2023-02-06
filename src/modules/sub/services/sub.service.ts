import { Injectable } from '@nestjs/common/decorators';
import { ICreateSubDTO } from '../dtos/ICreateSubDTO';
import { Sub } from '@prisma/client';
import { ISubRepository } from '../contracts/ISubRepository';
import { MessageService } from 'src/modules/msg/services/msg.service';
import { blockConfig } from 'src/config/blockConfig';

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

  async isUnActive(id: string): Promise<void> {
    await this.subRepository.isUnActive(id);
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
}
