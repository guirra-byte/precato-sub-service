import { Module } from '@nestjs/common';
import { SubController } from '@modules/sub/infra/http/controllers/sub.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MessageController } from '@modules/msg/infra/http/controllers/msg.controller';
import { MessageRepository } from '../../../modules/msg/infra/http/prisma/repositories/MessageRepository';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerModuleConfig } from '../../../config/mailerModuleConfig';
import { SubRepository } from '../../../modules/sub/infra/http/prisma/repositories/SubRepository';
import { DateProvider } from '../../providers/date/implementations/DateProvider';
import { SubService } from '../../../modules/sub/services/sub.service';
import { MessageService } from '../../../modules/msg/services/msg.service';
import { FlowService } from '../../../modules/msg/services/flow.service';
import { MailProvider } from '../../providers/mail/implementations/MailProvider';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventEmitterProvider } from '../../providers/event/implementations/EventEmitterProvider';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      delimiter: '.',
    }),
    ScheduleModule.forRoot(),
    MailerModule.forRoot(mailerModuleConfig),
  ],
  controllers: [SubController, MessageController],
  providers: [
    MailProvider,
    DateProvider,
    EventEmitterProvider,
    PrismaService,
    SubService,
    MessageService,
    FlowService,
    MessageRepository,
    SubRepository,
  ],
})
export class AppModule {}
