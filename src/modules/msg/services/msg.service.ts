import { Message } from '@prisma/client';
import { IMessageRepository } from '../contracts/IMessageRepository';
import { ICreateMessageDTO } from '../dtos/ICreateMessageDTO';
import { blockConfig } from '../../../config/blockConfig';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ISubRepository } from 'modules/sub/contracts/ISubRepository';
import { IMailProvider } from '_shared/providers/mail/contract/IMailProvider';
import { OnEvent } from '@nestjs/event-emitter';
import { IEventEmitterProvider } from '../../../_shared/providers/event/contract/IEventEmitterProvider';
import { IDateProvider } from '../../../_shared/providers/date/contract/IDateProvider';

interface IFollowMsgFlow {
  asc_ordering: Message[];
  desc_ordering: Message[];
}

Injectable();
export class MessageService {
  constructor(
    private messageRepository: IMessageRepository,
    private subRepository: ISubRepository,
    private mailProvider: IMailProvider,
    private eventEmitterProvider: IEventEmitterProvider,
    private dateProvider: IDateProvider,
  ) {}

  //Revisado
  async create(msg: ICreateMessageDTO): Promise<void> {
    await this.messageRepository.create(msg);
  }

  //Revisado
  async findById(id: string): Promise<Message> {
    const message = await this.messageRepository.findById(id);
    return message;
  }

  //Revisado
  async findAll(): Promise<Message[]> {
    const messages = await this.messageRepository.findAll();
    return messages;
  }

  //Revisado
  async findByBlock(block: string): Promise<Message[]> {
    const messages = await this.messageRepository.findByBlock(block);
    return messages;
  }

  //Revisado
  async msgsOrder(): Promise<Message[]> {
    let orderedMsgs: Message[];

    for (const block in blockConfig) {
      const getMsgsInBlocks = await this.findByBlock(block);

      orderedMsgs = getMsgsInBlocks
        .filter((msg) => {
          msg.block === block;
        })
        .sort(
          (item, nextItem) =>
            new Date(nextItem.created_at).getTime() -
            new Date(item.created_at).getTime(),
        )
        .reverse();
    }

    return orderedMsgs as Message[];
  }

  //Revisado
  async read(id: string): Promise<void> {
    await this.messageRepository.read(id);
  }

  //Revisado
  async followMsgFlow(id: string): Promise<IFollowMsgFlow> {
    const msgsOnSubs = await this.messageRepository.followMsgFlow(id);

    const readedMsgs: Message[] = [];
    const unreadedMsgs: Message[] = [];

    const msgsOrdering = async (msgs: Message[], order: string) => {
      if (order === 'ASC') {
        const ascendingOrdering = msgs.sort(
          (msg, nxtMsg) =>
            new Date(msg.created_at).getTime() -
            new Date(nxtMsg.created_at).getTime(),
        );

        return ascendingOrdering;
      } else if (order === 'DESC') {
        const descendingOrdering = msgs
          .sort(
            (msg, nxtMsg) =>
              new Date(msg.created_at).getTime() -
              new Date(nxtMsg.created_at).getTime(),
          )
          .reverse();

        return descendingOrdering;
      }
    };

    for (const msgOnSub of msgsOnSubs) {
      const { msg_id } = msgOnSub;

      const findMsg = await this.messageRepository.findById(msg_id);

      if (findMsg.read) {
        readedMsgs.push(findMsg);
      } else {
        unreadedMsgs.push(findMsg);
      }
    }

    const readedMsgsOrder = await msgsOrdering(readedMsgs, 'DESC');
    const unreadedMsgsOrder = await msgsOrdering(unreadedMsgs, 'ASC');

    return {
      asc_ordering: readedMsgsOrder,
      desc_ordering: unreadedMsgsOrder,
    } as IFollowMsgFlow;
  }

  //Revisado
  async notifySubs(
    msg_id: string,
    segment: boolean,
    segStandard?: string,
  ): Promise<void> {
    const { header, subject } = await this.messageRepository.findById(msg_id);
    const subs = await this.subRepository.findActiveSubs();

    const [flag, values] = segStandard.split(':');
    const [action, standard] = flag.split('.');

    const flags = await this.eventEmitterProvider.findByPrefix(action);

    const findWithFlagsByStandards = flags.find(
      (segmentFlag) => segmentFlag === `${action}.${standard}`,
    );

    if (!findWithFlagsByStandards) {
      throw new HttpException('Event not found!', HttpStatus['NOT_FOUND']);
    }

    await this.eventEmitterProvider.emit(flag, values);

    if (segment && segStandard) {
      for (const sub of subs) {
        await this.mailProvider.sendEmail(
          sub.email,
          process.env.DOMAIN_EMAIL_CONTACT,
          subject,
          header,
        );
      }
    } else if (segment && !flag) {
      const defaultFlag = 'DATE';
      const auxiliarSubs = subs;

      for (let i = 0; i < auxiliarSubs.length; i++) {
        let k = i + 1;

        const itemDate = auxiliarSubs[i].created_at;
        const nextItemDate = auxiliarSubs[k].created_at;

        const isBefore = await this.dateProvider.compareIsBefore(
          itemDate,
          nextItemDate,
        );

        if (isBefore) {
          let tmp = auxiliarSubs[i];
          auxiliarSubs[i] = auxiliarSubs[k];
          auxiliarSubs[k] = tmp;
        }
      }

      const start_at = auxiliarSubs[0].created_at;
      const end_at = auxiliarSubs[auxiliarSubs.length - 1].created_at;

      await this.eventEmitterProvider.emit(
        `segment.${defaultFlag}`,
        `${start_at};${end_at}`,
      );

      //Retorno do evento disparado
    }
  }

  //Revisado
  @OnEvent('segment.DATE')
  async segmentByDate(standard: string): Promise<Message[]> {
    const rangeDates = standard.split(';');
    const [start_at, end_at] = rangeDates;

    const msgs = await this.messageRepository.findByRangeDates(
      new Date(start_at),
      new Date(end_at),
    );

    return msgs;
  }

  //Revisado
  @OnEvent('segment.HISTORY')
  async segmentByHistory(standard: string) {
    const history = standard.split(';');
    const msgs = await this.messageRepository.findAll();

    const segmentsMsgs = history.map((block) =>
      msgs.filter((msg) => msg.block === block),
    );

    return segmentsMsgs;
  }

  //Revisado
  @OnEvent('segment.FEEDBACK')
  async segmentByFeedback(standard: string) {
    const msgs = await this.messageRepository.findAll();

    const standards = standard.split(';');

    const msgsWithFeedbacks: Message[][] = standards.map((value) =>
      msgs.filter((msg) => msg.feedback === value),
    );

    return msgsWithFeedbacks;
  }
}
