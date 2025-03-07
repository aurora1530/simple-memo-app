/**
 * Date型の日付を指定のタイムゾーンに変換して文字列に変換する
 * @param date
 * @param timeZoneOffsetHourToUTC UTCとの時差（hour）（例：日本時間の場合は+9）
 * @returns
 */
export const formatDate = (date: Date, timeZoneOffsetHourToUTC: number): string => {
  const dateWithOffset = new Date(date);
  dateWithOffset.setHours(dateWithOffset.getHours() + timeZoneOffsetHourToUTC);
  return dateWithOffset.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

export const TIMEZONE_OFFSET_JST = 9;
