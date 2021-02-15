import { Pipe, PipeTransform } from '@angular/core';
import { InfStatement } from '@kleiolab/lib-sdk-lb3';
import { TimePrimitivePipe } from '@kleiolab/lib-utils';
import { Utils } from '../../../core/util/util';

@Pipe({
  name: 'infTimePrimitiveStatement'
})
export class InfTimePrimitivePipe implements PipeTransform {

  constructor(private timePrimitivePipe: TimePrimitivePipe) { }

  transform(statement: InfStatement): string {
    if (!statement) return '';
    if (!statement.object_time_primitive || !Object.keys(statement.object_time_primitive).length) return '';

    return this.timePrimitivePipe.transform(Utils.infStatement2TimePrimitive(statement));

  }

}

