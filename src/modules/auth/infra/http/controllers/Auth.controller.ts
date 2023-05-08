import { Body, Controller, Post } from '@nestjs/common';
import { IAuthConsumerDTO } from 'src/modules/auth/dtos/IAuthConsumerDTO';
import { AuthService } from 'src/modules/auth/services/Auth.service';
import { IEventEmitterProvider } from 'src/_shared/providers/event/contract/IEventEmitterProvider';

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private eventEmitterProvider: IEventEmitterProvider,
  ) {}

  @Post('/signIn')
  async signIn(@Body() consumer: IAuthConsumerDTO): Promise<any> {
    const tokens = await this.authService.signIn({
      email: consumer.email,
      password: consumer.password,
    });

    await this.eventEmitterProvider.emit(
      'customer.AUTHORIZED',
      JSON.stringify(tokens),
    );
  }

  @Post('/refresh')
  async reauthenticate(@Body() body): Promise<any> {
    return await this.authService.refresh(body);
  }
}
