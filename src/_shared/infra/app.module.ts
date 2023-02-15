import { Module } from '@nestjs/common';
import { SubController } from 'src/modules/sub/infra/http/controllers/sub.controller';
import { PrismaService } from './prisma/prisma.service';
import { MessageController } from 'src/modules/msg/infra/http/controllers/msg.controller';
import { MessageRepository } from 'src/modules/msg/infra/http/prisma/repositories/MessageRepository';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerModuleConfig } from 'src/config/mailerModuleConfig';
import { SubRepository } from 'src/modules/sub/infra/http/prisma/repositories/SubRepository';
import { DateProvider } from '../providers/date/implementations/DateProvider';
import { SubService } from 'src/modules/sub/services/sub.service';
import { MessageService } from 'src/modules/msg/services/msg.service';
import { FlowService } from 'src/modules/msg/services/flow.service';
import { MailProvider } from '../providers/mail/implementations/MailProvider';

@Module({
  imports: [ScheduleModule.forRoot(), MailerModule.forRoot(mailerModuleConfig)],
  controllers: [SubController, MessageController],
  providers: [
    PrismaService,
    SubService,
    MessageService,
    FlowService,
    MessageRepository,
    SubRepository,
  ],
})
export class AppModule {}
