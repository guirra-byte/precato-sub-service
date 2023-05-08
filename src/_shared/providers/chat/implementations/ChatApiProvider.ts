import { IChatApiProvider } from '../contract/IChatApiProvider';
import twilioClient from 'twilio';

export class ChatApiProvider implements IChatApiProvider {
  private client = twilioClient;

  constructor() {}

  async send(from: string, body: string, to: string): Promise<void> {
    const client = await twilioClient().messages.create({
      from,
      body,
      to,
    });
  }
}
