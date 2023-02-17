import { Request } from '@nestjs/common';
import { Sub } from '@prisma/client';

export interface AuthRequest extends Request {
  sub: Sub;
}
