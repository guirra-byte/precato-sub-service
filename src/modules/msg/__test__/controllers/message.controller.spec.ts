import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from '../../infra/http/controllers/msg.controller';
import { ICreateMessageDTO } from '../../dtos/ICreateMessageDTO';
import { MessageService } from '../../services/msg.service';
import { FlowService } from '../../services/flow.service';
import { EventEmitterProvider } from '../../../../_shared/providers/event/implementations/EventEmitterProvider';
import { IEventEmitterProvider } from '../../../../_shared/providers/event/contract/IEventEmitterProvider';
import { Message } from '@prisma/client';

const message1 = {
  id: '1',
  header: 'Test 1',
  block: 'OPT_IN',
  template: '<div class="',
  subject: 'WELCOME [OPT_IN]',
  created_at: new Date(),
  position: new Date(),
  read: false,
  feedback: '',
};

const messagesBlock = [
  {
    id: '1',
    header: 'Test 1',
    block: 'OPT_IN',
    template: '<div class="',
    subject: 'WELCOME [OPT_IN]',
    created_at: new Date(),
    position: new Date(),
    read: false,
    feedback: '',
  },
  {
    id: '3',
    header: 'Test 3',
    block: 'OPT_IN',
    template: '<div class="',
    subject: 'WELCOME [OPT_IN]',
    created_at: new Date(),
    position: new Date(),
    read: true,
    feedback: '',
  },
];

const messages: Message[] = [
  {
    id: '1',
    header: 'Test 1',
    block: 'OPT_IN',
    template: '<div class="',
    subject: 'WELCOME [OPT_IN]',
    created_at: new Date(),
    position: new Date(),
    read: false,
    feedback: '',
  },
  {
    id: '2',
    header: 'Test 2',
    block: 'OPT_OUT',
    template: '<div class="',
    subject: 'WELCOME [OPT_OUT]',
    created_at: new Date(),
    position: new Date(),
    read: true,
    feedback: '',
  },
  {
    id: '3',
    header: 'Test 3',
    block: 'OPT_IN',
    template: '<div class="',
    subject: 'WELCOME [OPT_IN]',
    created_at: new Date(),
    position: new Date(),
    read: true,
    feedback: '',
  },
  {
    id: '4',
    header: 'Test 4',
    block: 'OPT_OUT',
    template: '<div class="',
    subject: 'WELCOME [OPT_OUT]',
    created_at: new Date(),
    position: new Date(),
    read: false,
    feedback: '',
  },
];
describe('Message controller tests suits', () => {
  let messageController: MessageController;
  let messageService: MessageService;
  let flowService: FlowService;
  let eventEmitterProvider: EventEmitterProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: MessageService,
          useValue: {
            create: jest.fn().mockResolvedValue(void 0),
            findById: jest.fn().mockResolvedValue(message1),
            findAll: jest.fn().mockResolvedValue(messages),
            findByBlock: jest.fn().mockResolvedValue(messagesBlock),
            msgsOrder: jest.fn(),
            read: jest.fn(),
            followMsgFlow: jest.fn(),
            notifySubs: jest.fn(),
            segmentByDate: jest.fn(),
            segmentByHistory: jest.fn(),
            segmentByFeedback: jest.fn(),
          },
        },
        {
          provide: FlowService,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: IEventEmitterProvider,
          useValue: {
            emit: jest.fn(),
            findByPrefix: jest.fn(),
            findBySufix: jest.fn(),
            findMany: jest.fn(),
          },
        },
      ],
    }).compile();

    messageController = module.get<MessageController>(MessageController);
    messageService = module.get<MessageService>(MessageService);
    flowService = module.get<FlowService>(FlowService);
    eventEmitterProvider = module.get<EventEmitterProvider>(
      IEventEmitterProvider,
    );
  });

  it('Should be defined', async () => {
    expect(messageController).toBeDefined();
    expect(messageService).toBeDefined();
    expect(flowService).toBeDefined();
    expect(eventEmitterProvider).toBeDefined();
  });
  it('Should be able to find all messages', async () => {
    const result = await messageController.findAll();
    expect(result).toBe(messages);
  });

  it('Shoud be able to create a new message', async () => {
    await messageController.create({
      ...message1,
    });
    expect(messageService.create).toHaveBeenCalledTimes(1);
    expect(await messageService.findById(message1.id)).toStrictEqual(message1);
  });

  it('Should be able to find message by block', async () => {
    const block = 'OPT_IN';
    const allMsgs = await messageService.findAll();

    const filterByBlock = allMsgs.filter((msg) => msg.block === block);
    const findByBlock = await messageController.findByBlock(block);

    expect(filterByBlock).toStrictEqual(findByBlock);
    expect(messageService.findByBlock).toHaveBeenCalledTimes(1);
  });
});
