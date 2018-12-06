import { Pipe, PipeTransform } from '@angular/core';
import { Delta } from 'app/modules/quill';

@Pipe({
  name: 'quillDeltaToStr'
})
export class QuillDeltaToStrPipe implements PipeTransform {

  transform(d: Delta): any {
    if (!d || !d.ops || !d.ops.length) return '';
    return d.ops.map(op => op.insert).join('');
  }

}
