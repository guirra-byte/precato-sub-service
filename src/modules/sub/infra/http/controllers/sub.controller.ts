import { SubService } from 'src/modules/sub/services/sub.service';
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ICreateSubDTO } from 'src/modules/sub/dtos/ICreateSubDTO';

Controller('sub');
export class SubController {
  constructor(private readonly subService: SubService) {}

  @Post()
  async create(@Body() sub: ICreateSubDTO) {
    await this.subService.create(sub);
  }

  @Get(':id')
  async findById(@Param() id: string) {
    return this.subService.findById(id);
  }
}
