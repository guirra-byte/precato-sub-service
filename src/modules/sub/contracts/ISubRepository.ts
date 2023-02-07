import { Sub } from '@prisma/client';
import { ICreateSubDTO } from '../dtos/ICreateSubDTO';

export abstract class ISubRepository {
  abstract create(sub: ICreateSubDTO): Promise<void>;

  abstract findById(id: string): Promise<Sub>;
  abstract findActiveSubs(): Promise<Sub[]>;
  abstract findAll(): Promise<Sub[]>;

  abstract updateStageBlock(id: string, nextBlock: string): Promise<void>;
  abstract updateLastMessage(id: string, last_message: string): Promise<void>;
  abstract isUnActive(id: string): Promise<void>;
}
