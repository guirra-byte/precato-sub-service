import { SubService } from 'src/modules/sub/services/sub.service';
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UsePipes,
  UseFilters,
} from '@nestjs/common';
import { ICreateSubDTO } from 'src/modules/sub/dtos/ICreateSubDTO';
import { ValidateEmailPipe } from 'src/_shared/pipes/ValidateSubEmail.pipe';
import { CreateSubSchema } from '../schema/CreateSubSchema';
import { ParseUUIDPipe } from '@nestjs/common';
import { ExceptionHandlerLog } from 'src/_shared/filters/exceptions/exceptionHandler.filter';

@Controller('sub')
export class SubController {
  constructor(private readonly subService: SubService) {}

  @Post()
  @UseFilters(ExceptionHandlerLog)
  @UsePipes(new ValidateEmailPipe(CreateSubSchema))
  async create(@Body() sub: ICreateSubDTO) {
    await this.subService.create(sub);
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.subService.findById(id);
  }
}
