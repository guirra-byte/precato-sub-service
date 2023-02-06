import { Message } from '@prisma/client';
import { ICreateMessageDTO } from '../dtos/ICreateMessageDTO';

export abstract class IMessageRepository {
  abstract create(msg: ICreateMessageDTO): Promise<void>;
  abstract findById(id: string): Promise<Message>;
  abstract findByBlock(block: string): Promise<Message[]>;
}
