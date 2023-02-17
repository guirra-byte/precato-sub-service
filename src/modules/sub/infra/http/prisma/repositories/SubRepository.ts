import { Sub } from '@prisma/client';
import { ISubRepository } from 'src/modules/sub/contracts/ISubRepository';
import { ICreateSubDTO } from 'src/modules/sub/dtos/ICreateSubDTO';
import { PrismaService } from 'src/_shared/infra/prisma/prisma.service';
import { blockConfig } from 'src/config/blockConfig';

export class SubRepository implements ISubRepository {
  constructor(private ormRepository: PrismaService) {}

  async create(sub: ICreateSubDTO): Promise<void> {
    await this.ormRepository.sub.create({
      data: {
        active: true,
        name: sub.name,
        email: sub.email,
        password: sub.password,
        block: blockConfig.ids['c77762d9-872b-497f-bd72-9e445f80231f'],
        history: 'ENTRY',
        previous_history: '',
      },
    });
  }

  async findById(id: string): Promise<Sub> {
    const sub = await this.ormRepository.sub.findUnique({ where: { id } });
    return sub;
  }

  async findByEmail(email: string): Promise<Sub> {
    return await this.ormRepository.sub.findFirst({ where: { email } });
  }

  async findActiveSubs(): Promise<Sub[]> {
    return await this.ormRepository.sub.findMany({ where: { active: true } });
  }

  async findAll(): Promise<Sub[]> {
    return await this.ormRepository.sub.findMany({
      where: {
        active: true,
      },
    });
  }

  async updateStageBlock(id: string, nextBlock: string): Promise<void> {
    const item = blockConfig.block[nextBlock];
    const sub = await this.findById(id);

    await this.ormRepository.sub.update({
      where: { id },
      data: {
        block: blockConfig.ids[item],
        history: sub.history.concat(`;${blockConfig.ids[item]}`),
      },
    });

    await this.ormRepository.sub.update({
      where: {
        id,
      },
      data: {
        previous_history: sub.history.split(`${blockConfig.ids[item]}`)[0],
      },
    });
  }

  async updateLastMessage(id: string, last_message: string): Promise<void> {
    await this.ormRepository.sub.update({
      where: { id },
      data: { last_message },
    });
  }

  async isUnActive(id: string): Promise<void> {
    await this.ormRepository.sub.update({
      where: { id },
      data: { active: false },
    });
  }
}
