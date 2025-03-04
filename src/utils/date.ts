export const formatDate = (date: Date, timeZoneOffsetHourToUTC: number): string => {
  const dateWithOffset = new Date(date);
  dateWithOffset.setHours(dateWithOffset.getHours() + timeZoneOffsetHourToUTC);
  return dateWithOffset.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

export const TIMEZONE_OFFSET_JST = 9;
