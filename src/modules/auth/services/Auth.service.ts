import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ISubRepository } from 'src/modules/sub/contracts/ISubRepository';
import { IAuthConsumerDTO } from '../dtos/IAuthConsumerDTO';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private subRepository: ISubRepository,
    private jwtService: JwtService,
    private executionContext: ExecutionContext,
  ) {}

  async signIn(data: IAuthConsumerDTO): Promise<any> {
    const consumer = await this.subRepository.findByEmail(data.email);

    if (!consumer) {
      throw new HttpException(
        'Email or Password is incorrect!',
        HttpStatus['UNAUTHORIZED'],
      );
    }

    const decodeConsumerPass = await bcrypt.compare(
      data.password,
      consumer.password,
    );

    if (!decodeConsumerPass) {
      throw new HttpException(
        'Email or Password is incorrect!',
        HttpStatus['UNAUTHORIZED'],
      );
    }

    const payload = { email: consumer.email, consumer: consumer.id };

    const access_token = await this.jwtService.signAsync(payload, {
      algorithm: 'RS256',
      expiresIn: '30s',
      privateKey: process.env.JWT_AUTH_SECRET,
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      algorithm: 'RS256',
      expiresIn: '20d',
      privateKey: process.env.JWT_AUTH_SECRET,
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async refresh(body): Promise<any> {
    const refresh_token = body.refresh_token;

    if (!refresh_token) {
      throw new HttpException('Consumer not found!', HttpStatus['NOT_FOUND']);
    }

    const decode = this.jwtService.decode(refresh_token);

    const email = decode['email'];
    const consumer = await this.subRepository.findByEmail(email);

    if (!consumer) {
      throw new HttpException('Consumer not found!', HttpStatus['NOT_FOUND']);
    }

    try {
      this.jwtService.verify(refresh_token, {
        secret: process.env.JWT_AUTH_SECRET,
      });

      return consumer;
    } catch (err) {
      if (err?.name === 'JsonWebTokenError') {
        throw new HttpException(
          'Invalid Signature!',
          HttpStatus['UNAUTHORIZED'],
        );
      }

      if (err?.name === 'TokenExpiredError') {
        throw new HttpException(
          'Token has expired!',
          HttpStatus['UNAUTHORIZED'],
        );
      }

      throw new HttpException(err?.name, HttpStatus['UNAUTHORIZED']);
    }
  }

  async setHeader() {}
}
