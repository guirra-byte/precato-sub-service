import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import path from 'path';
import { QRCodePaths } from 'src/config/resolver/QRCodePaths.resolver';
import { compressUploadImages } from '../services/compressUploadImages.service';

const supportedFileTypes = ['.png', '.jpg', '.svg'];

@Injectable()
export class ValidationFilePipe implements PipeTransform {
  async transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    let isSupported = false;
    for (const type of supportedFileTypes) {
      if (value.mimetype !== type) {
        continue;
      } else {
        isSupported = true;
      }
    }

    if (!isSupported) {
      throw new HttpException(
        'File extension is not supported!',
        HttpStatus['BAD_REQUEST'],
      );
    }

    const maxFileSizeInKb = 25000;
    if (value.size >= maxFileSizeInKb * 2) {
      await compressUploadImages(
        path.join(QRCodePaths.qrCodeUpload_path),
        value.buffer,
      );
    }
  }
}
