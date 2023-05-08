import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import path from 'path';
import { QRCodePaths } from '../../../../config/resolver/QRCodePaths.resolver';
import { compressUploadImages } from '../../../services/compressUploadImages.service';

const supportedFileTypes = ['.png', '.jpg', '.svg'];

@Injectable()
export class ValidationFilePipe implements PipeTransform {
  async transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    const uploadFileType = value.originalname.split('.');
    const fileType = uploadFileType[uploadFileType.length - 1];

    if (!supportedFileTypes.includes(`.${fileType}`)) {
      throw new HttpException(
        `Unsurppoted file type ${fileType}`,
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
