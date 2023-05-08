import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { agroupMsgBy, agroupSubBy } from '../../../../config/segmentStandard';
import { ObjectSchema } from 'joi';

export interface ISegment {
  type: string;
  data: string;
}

@Injectable()
export class ValidationsSegmentsPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<ISegment> {
    if (metadata.type === 'query') {
      let aggregation: ISegment;

      const { type, flag } = value;
      const isValid = this.schema.validate(flag);

      if (type === 'SUB') {
        if (!agroupSubBy.includes(flag) || !isValid) {
          throw new HttpException(
            'The aggregation is not supported!',
            HttpStatus['NOT_FOUND'],
          );
        } else {
          for (const groupBy of agroupSubBy) {
            if (metadata.data[`${groupBy}`]) {
              aggregation = {
                type: groupBy,
                data: metadata.data[`${groupBy}`],
              };
            }
          }
        }
      } else if (type === 'MSG') {
        if (!agroupMsgBy.includes(flag) || !isValid) {
          throw new HttpException(
            'The aggregation is not supported!',
            HttpStatus['NOT_FOUND'],
          );
        } else {
          for (const groupBy of agroupMsgBy) {
            if (metadata.data[`${groupBy}`]) {
              aggregation = {
                type: groupBy,
                data: metadata.data[`${groupBy}`],
              };
            }
          }
        }
      }

      if (aggregation.type && aggregation.data) {
        return aggregation;
      } else {
        throw new HttpException(
          'The entrance data is required!',
          HttpStatus['NO_CONTENT'],
        );
      }
    } else {
      throw new HttpException(
        'The entrance data is not defined!',
        HttpStatus['BAD_REQUEST'],
      );
    }
  }
}
