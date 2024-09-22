import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'value',
})
export class ValuePipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value === undefined || Number.isNaN(value)) return 'Nobody knows!';

    return value.toString();
  }
}
