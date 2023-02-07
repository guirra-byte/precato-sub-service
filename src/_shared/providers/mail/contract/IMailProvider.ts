export abstract class IMailProvider {
  abstract sendEmail(
    to: string,
    from: string,
    subject: string,
    header: string,
  ): Promise<void>;
}
