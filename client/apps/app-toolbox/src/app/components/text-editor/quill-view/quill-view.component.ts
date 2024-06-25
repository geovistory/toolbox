import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { QuillDoc } from "@kleiolab/lib-sdk-lb4";
import { QuillService } from '../quill.service';

@Component({
    selector: 'gv-quill-view',
    templateUrl: './quill-view.component.html',
    styleUrls: ['./quill-view.component.scss'],
    standalone: true
})
export class QuillViewComponent implements OnChanges {
  @Input() contents: QuillDoc;

  @Input() formatItalic: boolean;

  @ViewChild('editor', { static: true }) editorElem: ElementRef;

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
      if (this.contents && this.contents.ops) {
        this.contents.ops.forEach(op => {
          if (op.attributes && op.attributes['node']) {
            op.attributes = {
              node: op.attributes['node'],
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
