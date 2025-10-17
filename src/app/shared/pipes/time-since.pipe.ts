import { Pipe, PipeTransform } from '@angular/core';
import { formatSince } from '@shared/utils/date-utils';

@Pipe({
  name: 'timeSince',
  standalone: true
})
export class TimeSincePipe implements PipeTransform {
  transform(value?: string): string {
    return formatSince(value);
  }
}
