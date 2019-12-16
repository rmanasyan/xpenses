import { getLocaleMonthNames } from '@angular/common';

export function getMonthNames(): string[] {
  return getLocaleMonthNames('en', 1, 1);
}

export function getCurrentMonthStart(date: string): Date {
  const currentDate = isValidDateString(date) ? new Date(date) : new Date();
  return new Date(currentDate.getFullYear(), currentDate.getMonth());
}

export function getNextMonthStart(date: string): Date {
  const currentDate = isValidDateString(date) ? new Date(date) : new Date();
  return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1 );
}

export function isValidDateString(date: string): boolean {
  const dateObject = new Date(date);
  return dateObject instanceof Date && !isNaN(dateObject.getTime());
}
