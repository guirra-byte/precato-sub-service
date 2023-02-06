import { Message } from '@prisma/client';
import { IMessageRepository } from '../contracts/IMessageRepository';
import { ICreateMessageDTO } from '../dtos/ICreateMessageDTO';
import { blockConfig } from 'src/config/blockConfig';
import { Injectable } from '@nestjs/common';

Injectable();
export class MessageService {
  constructor(private messageRepository: IMessageRepository) {}

  async create(msg: ICreateMessageDTO): Promise<void> {
    await this.messageRepository.create(msg);
  }

  async findById(id: string): Promise<Message> {
    const message = await this.messageRepository.findById(id);
    return message;
  }

  async findByBlock(block: string): Promise<Message[]> {
    const messages = await this.messageRepository.findByBlock(block);

    const orderedMsgs = messages.sort(
      (item, nextItem) =>
        new Date(nextItem.created_at).getTime() -
        new Date(item.created_at).getTime(),
    );

    return orderedMsgs;
  }

  async msgsOrder(): Promise<Message[]> {
    let orderedMsgs;

    for (const block in blockConfig) {
      const getMsgsInBlocks = await this.findByBlock(block);

      const isDescendingDate = getMsgsInBlocks
        .filter((msg) => {
          msg.block === block;
        })
        .sort(
          (item, nextItem) =>
            new Date(nextItem.created_at).getTime() -
            new Date(item.created_at).getTime(),
        )
        .reverse();

      orderedMsgs = isDescendingDate;
    }

    return orderedMsgs as Message[];
  }
}
