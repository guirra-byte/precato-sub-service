import { Controller } from '@nestjs/common/decorators';
import { MessageService } from 'src/modules/msg/services/msg.service';
import { Post, Get } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { ICreateMessageDTO } from 'src/modules/msg/dtos/ICreateMessageDTO';
import { Cron } from '@nestjs/schedule';
import { FlowService } from 'src/modules/msg/services/flow.service';

@Controller('/messages')
export class MessageController {
  constructor(
    private msgService: MessageService,
    private flowService: FlowService,
  ) {}

  @Post()
  async create(@Body() msg: ICreateMessageDTO) {
    await this.msgService.create(msg);
  }

  @Get(':id')
  async findById(@Param() id: string) {
    const findMessageById = await this.msgService.findById(id);
    return findMessageById;
  }

  @Get()
  async findByBlock(@Body() block: string) {
    const findMessagesByBlock = await this.msgService.findByBlock(block);
    return findMessagesByBlock;
  }

  @Cron('* */13 * * *')
  @Get('/schedule')
  async flow(): Promise<void> {
    await this.flowService.execute();
  }
}
