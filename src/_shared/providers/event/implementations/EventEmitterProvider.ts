import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IEventEmitterProvider } from '../contract/IEventEmitterProvider';

@Injectable()
export class EventEmitterProvider implements IEventEmitterProvider {
  constructor(private eventEmitter: EventEmitter2) {}

  async emit(event: string, payload: string): Promise<void> {
    await this.eventEmitter.emitAsync(event, payload);
  }

  async findByPrefix(prefix: string): Promise<string[]> {
    const events = this.eventEmitter.eventNames() as string[];
    const segEvents = events.filter((event) => event.split('.')[0] === prefix);

    return segEvents;
  }

  async findBySufix(sufix: string): Promise<string[]> {
    const events = this.eventEmitter.eventNames() as string[];
    const segEvents = events.filter(
      (event) => event.split('.')[events.length - 1] === sufix,
    );

    return segEvents;
  }

  async findMany(): Promise<string[]> {
    return this.eventEmitter.eventNames() as string[];
  }
}
