import { SubService } from 'src/modules/sub/services/sub.service';
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UsePipes,
  UseFilters,
  UploadedFile,
} from '@nestjs/common';
import { ICreateSubDTO } from 'src/modules/sub/dtos/ICreateSubDTO';
import { ValidateEmailPipe } from 'src/_shared/pipes/ValidateSubEmail.pipe';
import { CreateSubSchema } from '../schema/CreateSubSchema';
import { ParseUUIDPipe } from '@nestjs/common';
import { ExceptionHandlerLog } from 'src/_shared/filters/exceptions/exceptionHandler.filter';
import { ValidationFilePipe } from 'src/_shared/pipes/ValidationFile.pipe';
import { Sub } from '@prisma/client';

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

  @Get()
  async findAll(): Promise<Sub[]> {
    return this.subService.findAll();
  }

  @Post(':id')
  async updateStageBlock(@Param('id', ParseUUIDPipe) id: string) {
    await this.subService.updateStageBlock(id);
  }

  @Post('/qrcode/:id')
  async generateSubQRCode(@Param('id') id: string) {
    await this.subService.generateSubQRCode(id);
  }

  @Post('/qrcode/connect')
  @UsePipes(new ValidationFilePipe())
  async readSubQRCode(@UploadedFile() qrCode: Express.Multer.File) {
    const connect = await this.subService.readSubQRCode(qrCode);
    return connect;
  }
}
