import { Pipe, PipeTransform } from '@angular/core';
import { InfStatement } from '@kleiolab/lib-sdk-lb3';
import { U } from 'projects/app-toolbox/src/app/core/util/util';
import { TimePrimitivePipe } from '../time-primitive/time-primitive.pipe';

@Pipe({
  name: 'infTimePrimitiveStatement'
})
export class InfTimePrimitivePipe implements PipeTransform {

  constructor(private timePrimitivePipe: TimePrimitivePipe) { }

  transform(statement: InfStatement): string {
    if (!statement) return '';
    if (!statement.object_time_primitive || !Object.keys(statement.object_time_primitive).length) return '';

    return this.timePrimitivePipe.transform(U.infStatement2TimePrimitive(statement));

  }

}

