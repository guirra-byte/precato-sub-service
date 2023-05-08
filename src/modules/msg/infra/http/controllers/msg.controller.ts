import { Controller, UsePipes } from '@nestjs/common/decorators';
import { MessageService } from '../../../services/msg.service';
import { Post, Get, Query } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { ICreateMessageDTO } from '../../../dtos/ICreateMessageDTO';
import { Cron } from '@nestjs/schedule';
import { FlowService } from '../../../services/flow.service';
import { ValidationsSegmentsPipe } from '../../../../../_shared/infra/http/pipes/ValidationSegmentsType.pipe';
import { IEventEmitterProvider } from '../../../../../_shared/providers/event/contract/IEventEmitterProvider';
import { Roles } from '../../../../../_shared/decorators/roles.decorator';
import { segmentTypeSchema } from '../../../../../_shared/schemas/ISegmentsTypeSchema';
import { Message } from '@prisma/client';

@Controller('/messages')
export class MessageController {
  constructor(
    private msgService: MessageService,
    private flowService: FlowService,
    private eventEmitterProvider: IEventEmitterProvider,
  ) {}

  @Roles('DEVELOPER;CLOSER;HUNTER')
  @Post()
  async create(@Body() msg: ICreateMessageDTO): Promise<void> {
    await this.msgService.create(msg);
  }

  @Roles('DEVELOPER;CLOSER;HUNTER')
  @Get(':id')
  async findById(@Param() id: string): Promise<Message> {
    const findMessageById = await this.msgService.findById(id);
    return findMessageById;
  }

  @Roles('DEVELOPER;CLOSER;HUNTER')
  @Get()
  async findAll(): Promise<Message[]> {
    const findAllMsgs = await this.msgService.findAll();
    return findAllMsgs;
  }

  @Roles('DEVELOPER;CLOSER;HUNTER')
  @Get()
  async findByBlock(@Body() block: string): Promise<Message[]> {
    const findMessagesByBlock = await this.msgService.findByBlock(block);
    return findMessagesByBlock;
  }

  @Roles(
    'DEVELOPER;QUALITY_ASSURANCE_ANALYST;REQUIREMENT_ANALYST;SOLUTIONS_ARCHITECT;CLOSER;HUNTER',
  )
  @Cron('* */13 * * *')
  @Get('/schedule')
  async flow(): Promise<void> {
    await this.flowService.execute();
  }

  @Get('/follow-messages/:id')
  async followMsgFlow(@Param() id: string): Promise<void> {
    await this.msgService.followMsgFlow(id);
  }

  @Roles(
    'DEVELOPER;QUALITY_ASSURANCE_ANALYST;REQUIREMENT_ANALYST;SOLUTIONS_ARCHITECT;CLOSER;HUNTER',
  )
  @Get('/segments')
  @UsePipes(new ValidationsSegmentsPipe(segmentTypeSchema))
  async segmentsPayload(
    @Query('type') type: string,
    @Query('standard') standard: string,
  ): Promise<void> {
    await this.eventEmitterProvider.emit(
      `segment.${type.toUpperCase()}`,
      standard,
    );
  }
}
