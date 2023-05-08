import { Message, MessagesOnSubs } from '@prisma/client';
import { IMessageRepository } from '../../../../contracts/IMessageRepository';
import { ICreateMessageDTO } from '../../../../dtos/ICreateMessageDTO';
import { PrismaService } from '../../../../../../_shared/infra/prisma/prisma.service';
import { IDateProvider } from '../../../../../../_shared/providers/date/contract/IDateProvider';

export class MessageRepository implements IMessageRepository {
  constructor(
    private ormRepository: PrismaService,
    private dateProvider: IDateProvider,
  ) {}

  async create(msg: ICreateMessageDTO): Promise<void> {
    await this.ormRepository.message.create({
      data: {
        header: msg.header,
        block: msg.block,
        position: msg.position,
        template: msg.template,
        read: false,
        subject: msg.subject,
      },
    });
  }

  async addFeedback(feedback: string, msg_id: string): Promise<void> {
    await this.ormRepository.message.update({
      where: {
        id: msg_id,
      },
      data: {
        feedback,
      },
    });
  }

  async findById(id: string): Promise<Message> {
    return await this.ormRepository.message.findUnique({ where: { id } });
  }

  async findByBlock(block: string): Promise<Message[]> {
    return await this.ormRepository.message.findMany({ where: { block } });
  }

  async findAll(): Promise<Message[]> {
    return await this.ormRepository.message.findMany();
  }

  async findByRangeDates(
    start_at: Date,
    finished_at: Date,
  ): Promise<Message[]> {
    const messages = await this.ormRepository.message.findMany();

    const msgsInRangeDates = messages.filter(async (message) => {
      const [isBefore, isAfter] = await Promise.all([
        await this.dateProvider.compareIsBefore(
          message.created_at,
          finished_at,
        ),
        await this.dateProvider.compareIsAfter(message.created_at, start_at),
      ]);

      if (isBefore && isAfter) {
        return message;
      }
    });

    return msgsInRangeDates;
  }

  async findByFeedback(feedback: string): Promise<Message[]> {
    const messages = await this.ormRepository.message.findMany({
      where: {
        feedback,
      },
    });

    return messages;
  }

  async read(id: string): Promise<void> {
    await this.ormRepository.message.update({
      where: {
        id,
      },
      data: {
        read: true,
      },
    });
  }

  async followMsgFlow(id: string): Promise<MessagesOnSubs[]> {
    return await this.ormRepository.messagesOnSubs.findMany({
      where: { sub_id: id },
    });
  }
}
