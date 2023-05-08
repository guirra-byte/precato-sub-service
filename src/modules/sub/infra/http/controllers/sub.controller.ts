import { SubService } from '../../../services/sub.service';
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UsePipes,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ICreateSubDTO } from '../../../dtos/ICreateSubDTO';
import { ValidateEmailPipe } from '../../../../../_shared/infra/http/pipes/ValidateSubEmail.pipe';
import { CreateSubSchema } from '../schema/CreateSubSchema';
import { ParseUUIDPipe } from '@nestjs/common';
import { ValidationFilePipe } from '../../../../../_shared/infra/http/pipes/ValidationFile.pipe';
import { Sub } from '@prisma/client';
import { Roles } from '../../../../../_shared/decorators/roles.decorator';
import { ValidationsSegmentsPipe } from '../../../../../_shared/infra/http/pipes/ValidationSegmentsType.pipe';
import { segmentTypeSchema } from '../../../../../_shared/schemas/ISegmentsTypeSchema';
import { IEventEmitterProvider } from '../../../../../_shared/providers/event/contract/IEventEmitterProvider';

@Controller('sub')
export class SubController {
  constructor(
    private subService: SubService,
    private eventEmitterProvider: IEventEmitterProvider,
  ) {}

  @Post()
  @UsePipes(new ValidateEmailPipe(CreateSubSchema))
  async create(@Body() sub: ICreateSubDTO) {
    await this.subService.create(sub);
    await this.eventEmitterProvider.emit(`new.SUB`, sub.email);
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

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.subService.findById(id);
  }

  @Get()
  async findAll(): Promise<Sub[]> {
    return this.subService.findAll();
  }

  @Roles(
    'DEVELOPER;QUALITY_ASSURANCE;REQUIREMENT_ANALYST;SOLUTIONS_ARCHITECT;CLOSER;HUNTER',
  )
  @Get('/aggrouped')
  @UsePipes(new ValidationsSegmentsPipe(segmentTypeSchema))
  async segmentsSubs(
    @Query('type') type: string,
    @Query('data') standard: string,
  ): Promise<void> {
    await this.eventEmitterProvider.emit(
      `group.${type.toUpperCase()}`,
      standard,
    );
  }
}
