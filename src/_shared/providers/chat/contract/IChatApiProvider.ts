export abstract class IChatApiProvider {
  abstract send(from: string, body: string, to: string): Promise<void>;
}
