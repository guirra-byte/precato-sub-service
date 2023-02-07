import { Module } from '@nestjs/common';
import { SubController } from 'src/modules/sub/infra/http/controllers/sub.controller';
import { PrismaService } from './prisma/prisma.service';
import { MessageController } from 'src/modules/msg/infra/http/controllers/msg.controller';
import { MessageRepository } from 'src/modules/msg/infra/http/prisma/repositories/MessageRepository';
import { ScheduleModule } from '@nestjs/schedule';
import { DateProvider } from '../providers/date/implementations/DateProvider';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerModuleConfig } from 'src/config/mailerModuleConfig';

@Module({
  imports: [ScheduleModule.forRoot(), MailerModule.forRoot(mailerModuleConfig)],
  controllers: [SubController, MessageController],
  providers: [PrismaService, MessageRepository, DateProvider],
})
export class AppModule {}
