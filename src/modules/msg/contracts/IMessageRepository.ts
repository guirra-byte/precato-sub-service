import { Message, MessagesOnSubs } from '@prisma/client';
import { ICreateMessageDTO } from '../dtos/ICreateMessageDTO';

export abstract class IMessageRepository {
  abstract create(msg: ICreateMessageDTO): Promise<void>;
  abstract addFeedback(feedback: string, msg_id: string): Promise<void>;

  abstract findById(id: string): Promise<Message>;
  abstract findAll(): Promise<Message[]>;
  abstract findByBlock(block: string): Promise<Message[]>;
  abstract findByFeedback(feedback: string): Promise<Message[]>;
  abstract findByRangeDates(
    start_at: Date,
    finished_at: Date,
  ): Promise<Message[]>;

  abstract followMsgFlow(id: string): Promise<MessagesOnSubs[]>;
  abstract read(id: string): Promise<void>;
}
