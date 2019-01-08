import { Pipe, PipeTransform } from '@angular/core';
import { TimePrimitive, InfRole, U } from 'app/core';
import { TimePrimitivePipe } from '../time-primitive/time-primitive.pipe';

@Pipe({
  name: 'infTimePrimitiveRole'
})
export class InfTimePrimitivePipe implements PipeTransform {

  constructor(private timePrimitivePipe: TimePrimitivePipe) { }

  transform(role: InfRole): string {
    if (!role) return '';
    if (!role.time_primitive || !Object.keys(role.time_primitive).length) return '';

    return this.timePrimitivePipe.transform(U.infRole2TimePrimitive(role));

  }

}

