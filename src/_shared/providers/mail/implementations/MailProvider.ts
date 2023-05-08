import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMailProvider } from '../contract/IMailProvider';
import { mailTemplate } from '../../../utils/templates/emailTemplate';

@Injectable()
export class MailProvider implements IMailProvider {
  constructor(private mailerService: MailerService) {}

  async sendEmail(
    to: string,
    from: string,
    subject: string,
    header: string,
  ): Promise<void> {
    const { template } = await mailTemplate(header, subject);

    await this.mailerService.sendMail({
      to,
      from,
      subject,
      html: template,
    });
  }
}
