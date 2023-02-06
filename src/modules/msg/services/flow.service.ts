import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { SubService } from 'src/modules/sub/services/sub.service';
import { MessageService } from './msg.service';
import { IDateProvider } from 'src/_shared/infra/providers/date/contract/IDateProvider';

interface IMailProps {
  [block: string]: {
    name: string;
    email: string;
    messages: Message[];
    last_message: string;
  };
}

@Injectable()
export class FlowService {
  constructor(
    private msgService: MessageService,
    private subService: SubService,
    private dateProvider: IDateProvider,
  ) {}

  async execute() {
    const receivers = await this.subService.findAll();
    const msgs = await this.msgService.msgsOrder();

    const mails: IMailProps[] = [];

    const sameBlock = async () => {
      for (const receiver of receivers) {
        const msgsInBlock = [];

        for (const msg of msgs) {
          if (msg.block === receiver.block) {
            msgsInBlock.push(msg);
          }
        }

        if (receiver.block in mails) {
          mails[receiver.block] = {
            name: receiver.name,
            email: receiver.email,
            last_message: receiver.las_message,
            messages: msgsInBlock,
          };
        }
      }
    };
  }
}
