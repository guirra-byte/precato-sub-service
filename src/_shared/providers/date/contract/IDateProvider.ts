export abstract class IDateProvider {
  abstract compareIsBefore(date: Date, toCompare: Date): Promise<boolean>;
  abstract compareIsAfter(date: Date, toCompare: Date): Promise<boolean>;
  abstract compareInDays(start_date: Date, end_date: Date): Promise<number>;
  abstract compareInHours(start_date: Date, end_date: Date): Promise<number>;
  abstract addDays(days: number): Promise<Date>;
  abstract addHours(hours: number): Promise<Date>;
  abstract dateNow(): Promise<Date>;
  abstract replaceToUTC(date: Date): Promise<string>;
}
