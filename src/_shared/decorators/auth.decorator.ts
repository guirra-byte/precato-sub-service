import { SetMetadata } from '@nestjs/common';

export const auth = async (jwtToken: string) =>
  SetMetadata('AUTHORIZED', jwtToken);
