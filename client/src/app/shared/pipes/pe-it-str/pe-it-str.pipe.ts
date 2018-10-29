import { Pipe, PipeTransform } from '@angular/core';
import { PeItDetail, U } from 'app/core';

@Pipe({
  name: 'peItStr'
})
export class PeItStrPipe implements PipeTransform {

  transform(peItDetail: PeItDetail): string {
    const l = U.labelFromDataUnitChildList(peItDetail._children, { path: [] });
    return !l.parts ? '' :
      !l.parts[0] ? '' :
        !l.parts[0].roleLabels ? '' :
          !l.parts[0].roleLabels[0] ? '' :
            l.parts[0].roleLabels[0].string;

  }

}
