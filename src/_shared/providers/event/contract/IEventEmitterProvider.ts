export abstract class IEventEmitterProvider {
  abstract emit(event: string, payload: string): Promise<void>;
  abstract findByPrefix(prefix: string): Promise<string[]>;
  abstract findBySufix(sufix: string): Promise<string[]>;
  abstract findMany(): Promise<string[]>;
}
