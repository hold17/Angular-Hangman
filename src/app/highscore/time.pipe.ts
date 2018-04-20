import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'timeFormat'
})
export class TimePipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, Constants.TIME_FMT);
  }
}
export class Constants {
  static readonly TIME_FMT = 'HH:mm';
}
