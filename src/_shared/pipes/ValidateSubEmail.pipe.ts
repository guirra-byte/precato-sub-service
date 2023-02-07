import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { ICreateSubDTO } from 'src/modules/sub/dtos/ICreateSubDTO';

@Injectable()
export class ValidateEmailPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(validate: ICreateSubDTO, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const { error } = this.schema.validate(validate);

      if (!validate) {
        throw new BadRequestException('Missing Params!');
      }

      if (error) {
        throw new BadRequestException(error.message);
      }

      return validate;
    }
  }
}
