import { SubService } from 'src/modules/sub/services/sub.service';
import { Controller, Post, Get, Body, Param, UsePipes } from '@nestjs/common';
import { ICreateSubDTO } from 'src/modules/sub/dtos/ICreateSubDTO';
import { ValidateEmailPipe } from 'src/_shared/pipes/ValidateSubEmail.pipe';
import { CreateSubSchema } from '../schema/CreateSubSchema';

Controller('sub');
export class SubController {
  constructor(private readonly subService: SubService) {}

  @Post()
  @UsePipes(new ValidateEmailPipe(CreateSubSchema))
  async create(@Body() sub: ICreateSubDTO) {
    await this.subService.create(sub);
  }

  @Get(':id')
  async findById(@Param() id: string) {
    return this.subService.findById(id);
  }
}
