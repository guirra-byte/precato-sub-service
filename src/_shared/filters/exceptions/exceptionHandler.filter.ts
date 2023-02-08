import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Injectable } from '@nestjs/common';
import { HttpStatus, HttpException } from '@nestjs/common';
import fs from 'fs';
import { IDateProvider } from 'src/_shared/providers/date/contract/IDateProvider';

@Injectable()
export class ExceptionHandlerLog extends BaseExceptionFilter {
  constructor(private dateProvider: IDateProvider) {
    super();
  }

  async handler(exception: unknown, host: ArgumentsHost) {
    const handler =
      exception instanceof HttpException
        ? HttpStatus[`${exception.getStatus()}`]
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const dateNow = await this.dateProvider.dateNow();

    fs.writeFileSync(
      `logs/log-${dateNow}`,
      JSON.stringify(`${dateNow}\n${handler}`),
    );

    super.catch(handler, host);
  }
}
