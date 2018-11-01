import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import * as Delta from 'quill-delta/lib/delta';
import { QuillService } from '../quill.service';

@Component({
  selector: 'gv-quill-view',
  templateUrl: './quill-view.component.html',
  styleUrls: ['./quill-view.component.scss']
})
export class QuillViewComponent implements OnChanges {
  @Input() contents: Delta;

  @Input() formatItalic: boolean;

  @ViewChild('editor') editorElem: ElementRef;

  Quill;

  // the editor
  quillEditor: any;

  constructor(
    private quillService: QuillService,

  ) {
    this.Quill = quillService.Quill;

  }

  ngOnChanges() {
    this.quillEditor = new this.Quill(this.editorElem.nativeElement, {
      theme: 'snow',
      readOnly: true,
      modules: {
        toolbar: false
      }
    });

    if (this.formatItalic) {
      const d = new Delta();
      if (this.contents && this.contents.ops) {
        this.contents.ops.forEach(op => {
          if (op.attributes && op.attributes.node) {
            op.attributes = {
              node: op.attributes.node,
              italic: true
            }
          }
        });
      }
    }

    // set the initial contents
    this.quillEditor.setContents(this.contents);

  }

}
