import { sandboxOf } from 'angular-playground';
import { DomChangeModule } from 'app/shared';
import { BehaviorSubject } from 'rxjs';
import { QuillModule } from '..';
import { QuillDoc } from '../quill.models';
import { QuillEditComponent, IndexedCharids } from './quill-edit.component';
import { textBüchel, _33095characters, wikiRats } from './quill-edit.sandbox.mock';
import { ChangeDetectorRef } from '../../../../../node_modules/@angular/core';



export default sandboxOf(QuillEditComponent, {
  imports: [
    DomChangeModule,
    QuillModule
  ],
  providers: [
    ChangeDetectorRef
  ],
  declareComponent: false
})
  .add('Quill-Edit | New text editor only ', {
    context: {
      blurCount: 0,
      quillDoc: {
        latestId: 7,
        contents: {}
      }
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [quillDoc]="quillDoc"
                    (quillDocChange)="quillDoc=$event" (htmlChange)="html=$event" (blur)="(blurCount = blurCount + 1)"></gv-quill-edit>
                </div>
            </div>
        </div>
    `
  })
  .add('Quill-Edit | New text ', {
    context: {
      blurCount: 0,
      quillDoc: {
        latestId: 7,
        contents: {}
      }
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [quillDoc]="quillDoc"
                    (quillDocChange)="quillDoc=$event" (htmlChange)="html=$event" (blur)="(blurCount = blurCount + 1)"  (textLengthChange)="length = $event"></gv-quill-edit>
                </div>
                <div class="col-6 font-sm" style="height:500px;">
                    <p>
                      Characters: {{length}}
                    </p>
                    <strong>
                    Latest Token Id: {{quillDoc.latestId}}
                    </strong>
                    <br>

                    <strong>
                    HTML:
                    </strong>
                    <br>
                    <pre>
                    {{html}}
                    </pre>

                    <strong>
                    Blur Count: {{blurCount}}
                    </strong>
                    <br>
                    <strong>
                    Blur Count: {{blurCount}}
                    </strong>
                    <br>

                    <strong>
                    JSON:
                    </strong>

                    <pre>
                    {{quillDoc | json:2}}
                    </pre>
                </div>
            </div>
        </div>
        `
  })
  .add('Quill-Edit | Short Text ', {
    context: {
      blurCount: 0,
      // quillDoc: wikiRats,
      quillDoc: {
        'ops': [
          {
            'insert': 'J',
            'attributes': {
              charid: 1
            }
          },
          {
            'insert': 'a',
            'attributes': {
              charid: 2
            }
          },
          {
            'insert': 'k',
            'attributes': {
              charid: 3
            }
          },
          {
            'insert': 'o',
            'attributes': {
              charid: 4
            }
          },
          {
            'insert': 'b',
            'attributes': {
              charid: 5
            }
          },
          {
            'insert': ' ',
            'attributes': {
              charid: 6
            }
          },
          {
            'insert': 'I',
            'attributes': {
              charid: 7
            }
          },
          {
            'insert': '.',
            'attributes': {
              charid: 8
            }
          },
          {
            'insert': ' ',
            'attributes': {
              charid: 9
            }
          },
          {
            'insert': 'B',
            'attributes': {
              charid: 10
            }
          },
          {
            'insert': 'e',
            'attributes': {
              charid: 11
            }
          },
          {
            'insert': 'r',
            'attributes': {
              charid: 12
            }
          },
          {
            'insert': 'n',
            'attributes': {
              charid: 13
            }
          },
          {
            'insert': 'o',
            'attributes': {
              charid: 14
            }
          },
          {
            'insert': 'u',
            'attributes': {
              charid: 15
            }
          },
          {
            'insert': 'l',
            'attributes': {
              charid: 16
            }
          },
          {
            'insert': 'l',
            'attributes': {
              charid: 17
            }
          },
          {
            'insert': 'i',
            'attributes': {
              charid: 18
            }
          },
          {
            'insert': '\n',
            'attributes': {
              blockid: 19
            }
          }
        ],
        'latestId': 19
      },
      showOutput: true,
      showAnnotations: new BehaviorSubject(true),
      annotatedNodes$: new BehaviorSubject({
        45: [123],
        46: [123],
        47: [123],
      })
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [quillDoc]="quillDoc" [annotatedNodes$]="annotatedNodes$"
                    (quillDocChange)="quillDoc=$event" (htmlChange)="html=$event" (blur)="(blurCount = blurCount + 1)"  (textLengthChange)=" length = $event"></gv-quill-edit>
                </div>
                <div class="col-6 font-sm" style="height:500px;">

                    <div>
                        <label>
                            <input type="checkbox" [(ngModel)]="showOutput" />
                            Show Output
                        </label>
                    </div>

                    <div>
                        <label>
                            <input type="checkbox" [(ngModel)]="showEnableQuillNodeHandles" />
                            Show Annotations
                        </label>
                    </div>

                    <div *ngIf="showOutput">
                        <p>
                          Characters: {{length}}
                        </p>
                        <strong>
                        Latest Token Id: {{quillDoc.latestId}}
                        </strong>
                        <br>

                        <strong>
                        HTML:
                        </strong>
                        <br>
                        <pre>
                        {{html}}
                        </pre>

                        <strong>
                        Blur Count: {{blurCount}}
                        </strong>
                        <br>

                        <strong>
                        JSON:
                        </strong>

                        <pre>
                        {{quillDoc | json:2}}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
        `
  })
  .add('Quill-Edit | Middle long Text ', {
    context: {
      blurCount: 0,
      quillDoc: wikiRats,
      showOutput: false,
      showAnnotations: new BehaviorSubject(true),
      annotatedNodes$: new BehaviorSubject({
        45: [123],
        46: [123],
        47: [123],
      })
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [quillDoc]="quillDoc" [annotatedNodes$]="annotatedNodes$"
                    (quillDocChange)="quillDoc=$event" (htmlChange)="html=$event" (blur)="(blurCount = blurCount + 1)"  (textLengthChange)=" length = $event"></gv-quill-edit>
                </div>
                <div class="col-6 font-sm" style="height:500px;">

                    <div>
                        <label>
                            <input type="checkbox" [(ngModel)]="showOutput" />
                            Show Output
                        </label>
                    </div>

                    <div>
                        <label>
                            <input type="checkbox" [(ngModel)]="showEnableQuillNodeHandles" />
                            Show Annotations
                        </label>
                    </div>

                    <div *ngIf="showOutput">
                        <p>
                          Characters: {{length}}
                        </p>
                        <strong>
                        Latest Token Id: {{quillDoc.latestId}}
                        </strong>
                        <br>

                        <strong>
                        HTML:
                        </strong>
                        <br>
                        <pre>
                        {{html}}
                        </pre>

                        <strong>
                        Blur Count: {{blurCount}}
                        </strong>
                        <br>

                        <strong>
                        JSON:
                        </strong>

                        <pre>
                        {{quillDoc | json:2}}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
        `
  })
  .add('Quill-Edit | Long Text ', {
    context: {
      blurCount: 0,
      quillDoc: _33095characters,
      showOutput: false,
      showAnnotations: new BehaviorSubject(true),
      annotatedNodes$: new BehaviorSubject({
        45: [123],
        46: [123],
        47: [123],
      })
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [quillDoc]="quillDoc" [annotatedNodes$]="annotatedNodes$"
                    (quillDocChange)="quillDoc=$event" (htmlChange)="html=$event" (blur)="(blurCount = blurCount + 1)"  (textLengthChange)=" length = $event"></gv-quill-edit>
                </div>
                <div class="col-6 font-sm" style="height:500px;">

                    <div>
                        <label>
                            <input type="checkbox" [(ngModel)]="showOutput" />
                            Show Output
                        </label>
                    </div>

                    <div>
                        <label>
                            <input type="checkbox" [(ngModel)]="showEnableQuillNodeHandles" />
                            Show Annotations
                        </label>
                    </div>

                    <div *ngIf="showOutput">
                        <p>
                          Characters: {{length}}
                        </p>
                        <strong>
                        Latest Token Id: {{quillDoc.latestId}}
                        </strong>
                        <br>

                        <strong>
                        HTML:
                        </strong>
                        <br>
                        <pre>
                        {{html}}
                        </pre>

                        <strong>
                        Blur Count: {{blurCount}}
                        </strong>
                        <br>

                        <strong>
                        JSON:
                        </strong>

                        <pre>
                        {{quillDoc | json:2}}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
        `
  })

  .add('Quill-Edit | Readonly ', {
    context: {
      blurCount: 0,
      quillDoc: textBüchel
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [quillDoc]="quillDoc" [readOnly]="true"></gv-quill-edit>
                </div>
                <div class="col-6 font-sm" style="height:500px;">
                    <strong>
                    Latest Token Id: {{quillDoc.latestId}}
                    </strong>
                    <br>

                    <strong>
                    HTML:
                    </strong>
                    <br>
                    <pre>
                    {{html}}
                    </pre>

                    <strong>
                    Blur Count: {{blurCount}}
                    </strong>
                    <br>

                    <strong>
                    JSON:
                    </strong>

                    <pre>
                    {{quillDoc | json:2}}
                    </pre>
                </div>
            </div>
        </div>
        `
  })
  .add('Quill-Edit | Annotations Visible', {
    context: {
      blurCount: 0,
      quillDoc: {
        'latestId': 86,
        'ops': [
          {
            'attributes': {
              'charid': '2'
            },
            'insert': 'E'
          },
          {
            'attributes': {
              'charid': '3'
            },
            'insert': 'm'
          },
          {
            'attributes': {
              'charid': '4'
            },
            'insert': 'a'
          },
          {
            'insert': '\n',
            'attributes': {
              'blockid': '5'
            },
          }
        ]
      },
      a: { 3: [1, 3], 4: [2, 3] },
      b: { 3: [1, 3] },
      c: { 3: [1, 3], 4: [2], 2: [9, 8, 7] },
      annotatedNodes$: new BehaviorSubject<IndexedCharids<number[]>>({
        3: [1, 3],
        4: [2, 3]
      }),
      x: { 3: true, 4: true },
      y: {},
      z: { 4: true, 2: true },
      accentuatedNodes$: new BehaviorSubject<IndexedCharids<true>>({}),
      annotationsVisible$: new BehaviorSubject(true)
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [quillDoc]="quillDoc" [annotationsVisible$]="annotationsVisible$" [accentuatedNodes$]="accentuatedNodes$"
                    [annotatedNodes$]="annotatedNodes$" (quillDocChange)="quillDoc=$event"></gv-quill-edit>
                </div>
                <div class="col-6 font-sm" style="height:500px;">
                    <button *ngIf="annotationsVisible$ | async" (click)="annotationsVisible$.next(false)">
                       hide annotations
                    </button>
                    <button *ngIf="!(annotationsVisible$ | async)" (click)="annotationsVisible$.next(true)">
                       show annotations
                    </button>
                   <p>
                      <button (click)="annotatedNodes$.next(a)">
                        highlight nodes: {{a | json}}
                      </button>
                      <button (click)="annotatedNodes$.next(b)">
                        highlight nodes: {{b | json}}
                      </button>
                      <button (click)="annotatedNodes$.next(c)">
                        highlight nodes: {{c | json}}
                      </button>
                    </p>
                    <p>
                      <button (click)="accentuatedNodes$.next(x)">
                        accentuate nodes: {{x | json}}
                      </button>
                      <button (click)="accentuatedNodes$.next(y)">
                        accentuate nodes: {{y | json}}
                      </button>
                      <button (click)="accentuatedNodes$.next(z)">
                        accentuate nodes: {{z | json}}
                      </button>
                    </p>
                    <strong>
                    Annotated Nodes:
                    </strong>
                    <pre>
                    {{annotatedNodes?._value | json:2}}
                    </pre>

                    <strong>
                    Content:
                    </strong>
                    <pre>
                    {{quillDoc | json:2}}
                    </pre>
                </div>

            </div>
        </div>
        `
  })
  .add('Quill-Edit | Annotations Not Visible', {
    context: {
      blurCount: 0,
      quillDoc: textBüchel,
      annotatedNodes: [
        ['20', 1],
        ['21', 3],
        ['24', 5]
      ],
      annotationsVisible: false
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [quillDoc]="quillDoc" [annotationsVisible]="annotationsVisible"
                    [annotatedNodes]="annotatedNodes" (quillDocChange)="quillDoc=$event"></gv-quill-edit>
                </div>
                <div class="col-6 font-sm" style="height:500px;">

                    <strong>
                    Annotated Nodes:
                    </strong>
                    <pre>
                    {{annotatedNodes | json:2}}
                    </pre>

                    <strong>
                    Content:
                    </strong>
                    <pre>
                    {{quillDoc | json:2}}
                    </pre>
                </div>

            </div>
        </div>
        `
  })
  .add('Quill-Edit | Creating Annotation', {
    context: {
      blurCount: 0,
      quillDoc: textBüchel,
      annotatedNodes: [
        ['20', 1],
        ['21', 3],
        ['24', 5]
      ],
      annotationsVisible: false,
      creatingAnnotation: true,
      selectedDelta: {}
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [quillDoc]="quillDoc" [annotationsVisible]="annotationsVisible"
                    [annotatedNodes]="annotatedNodes" [creatingAnnotation]="creatingAnnotation" (quillDocChange)="quillDoc=$event" (selectedDeltaChange)="selectedDelta=$event"></gv-quill-edit>

                </div>
                <div class="col-6 font-sm" style="height:500px;">

                    <strong>
                    Annotated Chunk:
                    </strong>
                    <gv-quill-view [contents]="selectedDelta" [formatItalic]="true"></gv-quill-view>

                    <strong>
                    Selected Delta:
                    </strong>
                    <pre>
                    {{selectedDelta | json:2}}
                    </pre>
                </div>

            </div>
        </div>
        `
  })
  .add('Quill-Edit | Input-Like ', {
    context: {
      blurCount: 0,
      quillDoc: {
        latestId: 0,
        ops: []
      } as QuillDoc
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [inputLike]="true" [quillDoc]="quillDoc" [editorConfig]="editorConfig" class="gv-outer-form-control"
                    (quillDocChange)="quillDoc=$event" (htmlChange)="html=$event" (blur)="(blurCount = blurCount + 1)"></gv-quill-edit>
                    <p>Some normal input element with .form-control:</p>
                    <input class="form-control" type="text" />
                </div>
                <div class="col-6 font-sm" style="height:500px;">
                    <strong>
                    Latest Token Id: {{quillDoc.latestId}}
                    </strong>
                    <br>

                    <strong>
                    HTML:
                    </strong>
                    <br>
                    <pre>
                    {{html}}
                    </pre>

                    <strong>
                    Blur Count: {{blurCount}}
                    </strong>
                    <br>

                    <strong>
                    JSON:
                    </strong>

                    <pre>
                    {{quillDoc | json:2}}
                    </pre>
                </div>
            </div>
        </div>
        `
  })
  .add('Quill-Edit | Textarea-Like ', {
    context: {
      blurCount: 0,
      quillDoc: {}
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [textareaLike]="true" [editorConfig]="editorConfig" class="gv-outer-form-control"
                    (quillDocChange)="quillDoc=$event" (htmlChange)="html=$event" (blur)="(blurCount = blurCount + 1)"></gv-quill-edit>
                    <p>Some normal textarea element with .form-control:</p>
                    <textarea class="form-control" type="text"></textarea>
                </div>
                <div class="col-6 font-sm" style="height:500px;">
                    <strong>
                    Latest Token Id: {{quillDoc.latestId}}
                    </strong>
                    <br>

                    <strong>
                    HTML:
                    </strong>
                    <br>
                    <pre>
                    {{html}}
                    </pre>

                    <strong>
                    Blur Count: {{blurCount}}
                    </strong>
                    <br>

                    <strong>
                    JSON:
                    </strong>

                    <pre>
                    {{quillDoc | json:2}}
                    </pre>
                </div>
            </div>
        </div>
        `
  })



  .add('Quill-Edit | Mat-Input-Like ', {
    context: {
      blurCount: 0,
      quillDoc: {}
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [matInputLike]="true" [editorConfig]="editorConfig" class="gv-outer-form-control"
                    (quillDocChange)="quillDoc=$event" (htmlChange)="html=$event" (blur)="(blurCount = blurCount + 1)"></gv-quill-edit>
                    <p>Some normal textarea element with .form-control:</p>
                    <textarea class="form-control" type="text"></textarea>
                </div>
                <div class="col-6 font-sm" style="height:500px;">
                    <strong>
                    Latest Token Id: {{quillDoc.latestId}}
                    </strong>
                    <br>

                    <strong>
                    HTML:
                    </strong>
                    <br>
                    <pre>
                    {{html}}
                    </pre>

                    <strong>
                    Blur Count: {{blurCount}}
                    </strong>
                    <br>

                    <strong>
                    JSON:
                    </strong>

                    <pre>
                    {{quillDoc | json:2}}
                    </pre>
                </div>
            </div>
        </div>
        `
  })



