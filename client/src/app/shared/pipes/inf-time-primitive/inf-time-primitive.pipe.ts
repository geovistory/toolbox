import { Pipe, PipeTransform } from '@angular/core';
import { TimePrimitive, InfStatement, U } from 'app/core';
import { TimePrimitivePipe } from '../time-primitive/time-primitive.pipe';

@Pipe({
  name: 'infTimePrimitiveRole'
})
export class InfTimePrimitivePipe implements PipeTransform {

  constructor(private timePrimitivePipe: TimePrimitivePipe) { }

  transform(role: InfStatement): string {
    if (!role) return '';
    if (!role.object_time_primitive || !Object.keys(role.object_time_primitive).length) return '';

    return this.timePrimitivePipe.transform(U.infRole2TimePrimitive(role));

  }

}

