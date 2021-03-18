import { Pipe, PipeTransform } from '@angular/core';
import { Ops } from 'projects/app-toolbox/src/app/modules/quill/quill.models';

@Pipe({
  name: 'quillOpsToStr'
})
export class QuillOpsToStrPipe implements PipeTransform {

  transform(ops: Ops): any {
    if (!ops || !ops.length) return '';
    return ops.map(op => op.insert).join('');
  }

}
