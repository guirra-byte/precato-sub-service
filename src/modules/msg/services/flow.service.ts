import { Injectable } from '@nestjs/common';
import { SubService } from '../../sub/services/sub.service';
import { MessageService } from './msg.service';
import { IDateProvider } from '../../../_shared/providers/date/contract/IDateProvider';
import { IMailProvider } from '../../../_shared/providers/mail/contract/IMailProvider';

@Injectable()
export class FlowService {
  constructor(
    private msgService: MessageService,
    private subService: SubService,
    private dateProvider: IDateProvider,
    private mailerProvider: IMailProvider,
  ) {}

  async execute() {
    const receivers = await this.subService.findAll();

    const msgs = (await this.msgService.msgsOrder()).filter(async (msg) => {
      const isNow = await this.dateProvider.dateNow();

      const isAfter = await this.dateProvider.compareIsAfter(
        msg.position,
        isNow,
      );

      if (isAfter || msg.position === isNow) {
        return msg;
      }
    });

    const flow = async () => {
      for (const receiver of receivers) {
        for (let index = 0; index < msgs.length; index++) {
          const msg = msgs[index];

          const nextMsg = msgs.find(
            async (msgItem, msgIndex) =>
              msgIndex + 1 ===
              msgs.indexOf(
                await this.msgService.findById(receiver.last_message),
              ) +
                1,
          );

          await this.mailerProvider.sendEmail(
            receiver.email,
            process.env.MAILER_DEFAULT_SENDER,
            msg.template,
            msg.header,
          );

          if (!nextMsg && receiver.block === 'REMARKETING') {
            await this.subService.isUnActive(receiver.id);

            await this.subService.updateLastMessage(receiver.id, msg.id);
          } else if (nextMsg) {
            await this.subService.updateLastMessage(receiver.id, msg.id);
          }
        }
      }
    };

    await flow();
  }
}
