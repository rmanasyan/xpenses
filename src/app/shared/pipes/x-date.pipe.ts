import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import firebase from 'firebase/compat/app';

@Pipe({
  name: 'xDate'
})
export class XDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  static daysDiff(date1: Date, date2: Date) {
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utc2 - utc1) / 864e5);
  }

  transform(timestamp: any, format: string, asToday = false): string {
    timestamp = timestamp instanceof firebase.firestore.Timestamp ? timestamp.toDate() : timestamp;
    const defaultTransform = this.datePipe.transform(timestamp, format);

    if (asToday === false) {
      return defaultTransform;
    } else {
      const notToday = new Date(timestamp);
      const today = new Date();
      const diff = XDatePipe.daysDiff(notToday, today);

      if (diff === 0 || diff === 1) {
        const when = ['Today', 'Yesterday'][diff];

        return `${when}, ${this.datePipe.transform(timestamp, 'H:mm')}`;
      } else {
        return defaultTransform;
      }
    }
  }
}
