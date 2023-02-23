import { Injectable, INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect().then(async () => {
      if (process.env.NODE_ENV === 'development') {
        if (process.env.GENERATE_SEED === 'true') {
          const encodePassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            10,
          );

          await this.admin.create({
            data: {
              name: 'Athom',
              email: 'athom@ottom.com',
              password: encodePassword,
            },
          });
        }
      }
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
