import { Pipe, PipeTransform } from '@angular/core';
import { Ops } from '../../components/text-editor/quill.models';

@Pipe({
  name: 'quillOpsToStr',
  standalone: true
})
export class QuillOpsToStrPipe implements PipeTransform {

  transform(ops: Ops) {
    if (!ops || !ops.length) return '';
    return ops.map(op => op.insert).join('');
  }

}
