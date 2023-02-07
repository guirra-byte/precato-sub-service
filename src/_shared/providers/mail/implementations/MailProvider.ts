import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMailProvider } from '../contract/IMailProvider';
import { mailTemplate } from 'src/_shared/templates/emailTemplate';

@Injectable()
export class MailProvider implements IMailProvider {
  constructor(private mailerService: MailerService) {}

  async sendEmail(
    to: string,
    from: string,
    subject: string,
    header: string,
  ): Promise<void> {
    const mail = await mailTemplate(header, subject);

    await this.mailerService.sendMail({
      to,
      from,
      subject,
      html: mail.template,
    });
  }
}
