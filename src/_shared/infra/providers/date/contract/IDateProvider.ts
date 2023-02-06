export abstract class IDateProvider {
  abstract compareIsBefore(target_date: Date): Promise<boolean>;
  abstract compareIsAfter(target_date: Date): Promise<boolean>;
  abstract compareInDays(start_date: Date, end_date: Date): Promise<number>;
  abstract compareInHours(start_date: Date, end_date: Date): Promise<number>;
  abstract addDays(days: number): Promise<Date>;
  abstract addHours(hours: number): Promise<Date>;
  abstract dateNow(): Promise<Date>;
  abstract replaceToUTC(date: Date): Promise<string>;
}
