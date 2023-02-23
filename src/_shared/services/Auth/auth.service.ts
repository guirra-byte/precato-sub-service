import { SubService } from 'src/modules/sub/services/sub.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { Sub } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private subService: SubService, private jwtService: JwtService) {}

  async verify(email: string, password: string): Promise<Sub> {
    const sub = await this.subService.findByEmail(email);

    if (!sub) {
      throw new BadRequestException('', 'Email or Password are incorrect!');
    }

    const decodePassword = await bcrypt.compare(password, sub.password);

    if (!decodePassword) {
      throw new BadRequestException('', 'Email or Password are incorrect');
    }

    return sub;
  }

  async login(sub: Sub) {
    const payload = { email: sub.email, password: sub.password };
    return {
      auth_token: this.jwtService.sign(payload),
    };
  }
}
