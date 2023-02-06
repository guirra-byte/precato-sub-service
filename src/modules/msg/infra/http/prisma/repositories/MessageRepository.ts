import { Message } from '@prisma/client';
import { IMessageRepository } from 'src/modules/msg/contracts/IMessageRepository';
import { ICreateMessageDTO } from 'src/modules/msg/dtos/ICreateMessageDTO';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';

export class MessageRepository implements IMessageRepository {
  constructor(private ormRepository: PrismaService) {}

  async create(msg: ICreateMessageDTO): Promise<void> {
    await this.ormRepository.message.create({
      data: {
        header: msg.header,
        block: msg.block,
        position: msg.position,
        template: msg.template,
      },
    });
  }

  async findById(id: string): Promise<Message> {
    return await this.ormRepository.message.findUnique({ where: { id } });
  }

  async findByBlock(block: string): Promise<Message[]> {
    return await this.ormRepository.message.findMany({ where: { block } });
  }
}
