import {Injectable, Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'unique'
})
@Injectable()
export class UniquePipe implements PipeTransform {
  transform(items: any, field: string): any {
    if (!items) { return []; }
    if (!field || field.length === 0) { return items; }
    return items.map(item => item[field]).filter((value, index, self) => self.indexOf(value) === index);
  }
}
