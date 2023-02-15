import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Injectable } from '@nestjs/common';
import { HttpStatus, HttpException } from '@nestjs/common';
import fs from 'fs';

@Injectable()
export class ExceptionHandlerLog extends BaseExceptionFilter {
  async handler(exception: unknown, host: ArgumentsHost) {
    const handler =
      exception instanceof HttpException
        ? HttpStatus[`${exception.getStatus()}`]
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const dateNow = new Date().getTime();

    fs.writeFileSync(
      `logs/log-${dateNow}`,
      JSON.stringify(`${dateNow}\n${handler}`),
    );

    super.catch(handler, host);
  }
}
