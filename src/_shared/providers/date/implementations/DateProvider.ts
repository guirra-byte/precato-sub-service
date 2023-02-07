import { IDateProvider } from '../contract/IDateProvider';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { Injectable } from '@nestjs/common/decorators';

dayjs.extend(utc);

@Injectable()
export class DateProvider implements IDateProvider {
  async compareIsBefore(date: Date): Promise<boolean> {
    const dateInUTC = await this.replaceToUTC(await this.dateNow());
    const dateToCompare = await this.replaceToUTC(date);

    return dayjs(dateInUTC).isBefore(dateToCompare);
  }

  async compareIsAfter(target_date: Date): Promise<boolean> {
    const dateInUTC = await this.replaceToUTC(target_date);
    const dateToCompare = await this.replaceToUTC(await this.dateNow());

    return dayjs(dateInUTC).isAfter(dateToCompare);
  }

  async compareInDays(start_date: Date, end_date: Date): Promise<number> {
    const startDateInUTC: string = await this.replaceToUTC(start_date);
    const endDateInUTC: string = await this.replaceToUTC(end_date);

    return dayjs(endDateInUTC).diff(startDateInUTC, 'days');
  }

  async compareInHours(end_date_return: Date): Promise<number> {
    const dateInUTC: string = await this.replaceToUTC(end_date_return);

    const dateNow: Date = await this.dateNow();
    const dateNowInUTC: string = await this.replaceToUTC(dateNow);

    return dayjs(dateInUTC).diff(dateNowInUTC, 'hours');
  }

  async addDays(date: number): Promise<Date> {
    return dayjs().add(date, 'days').toDate();
  }

  async addHours(hours: number): Promise<Date> {
    return dayjs().add(hours, 'hours').toDate();
  }

  async dateNow(): Promise<Date> {
    return dayjs().utc().local().toDate();
  }

  async replaceToUTC(date: Date): Promise<string> {
    return dayjs(date).utc().local().format();
  }
}
