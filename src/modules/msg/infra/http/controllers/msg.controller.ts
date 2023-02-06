import { Controller } from '@nestjs/common/decorators';
import { MessageService } from 'src/modules/msg/services/msg.service';
import { Post, Get } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { ICreateMessageDTO } from 'src/modules/msg/dtos/ICreateMessageDTO';

@Controller('/messages')
export class MessageController {
  constructor(private msgService: MessageService) {}

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
}
