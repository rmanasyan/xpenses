import { getLocaleMonthNames } from '@angular/common';

export function getMonthNames() {
  return getLocaleMonthNames('en', 1, 1);
}
