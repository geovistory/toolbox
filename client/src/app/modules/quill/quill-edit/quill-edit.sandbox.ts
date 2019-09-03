import { sandboxOf } from 'angular-playground';
import { DomChangeModule } from 'app/shared';
import { BehaviorSubject } from 'rxjs';
import { QuillModule } from '..';
import { QuillDoc } from '../quill.models';
import { QuillEditComponent } from './quill-edit.component';
import { textBüchel, wikiRats, _33095characters } from './quill-edit.sandbox.mock';
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
  .add('Quill-Edit | Long Text ', {
    context: {
      blurCount: 0,
      quillDoc: _33095characters,
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
  .add('Quill-Edit | Existing Text ', {
    context: {
      blurCount: 0,
      // quillDoc: wikiRats,
      quillDoc: {
        "ops": [
          {
            "insert": "J",
            "attributes": {
              "node": 1
            }
          },
          {
            "insert": "a",
            "attributes": {
              "node": 2
            }
          },
          {
            "insert": "k",
            "attributes": {
              "node": 3
            }
          },
          {
            "insert": "o",
            "attributes": {
              "node": 4
            }
          },
          {
            "insert": "b",
            "attributes": {
              "node": 5
            }
          },
          {
            "insert": " ",
            "attributes": {
              "node": 6
            }
          },
          {
            "insert": "I",
            "attributes": {
              "node": 7
            }
          },
          {
            "insert": ".",
            "attributes": {
              "node": 8
            }
          },
          {
            "insert": " ",
            "attributes": {
              "node": 9
            }
          },
          {
            "insert": "B",
            "attributes": {
              "node": 10
            }
          },
          {
            "insert": "e",
            "attributes": {
              "node": 11
            }
          },
          {
            "insert": "r",
            "attributes": {
              "node": 12
            }
          },
          {
            "insert": "n",
            "attributes": {
              "node": 13
            }
          },
          {
            "insert": "o",
            "attributes": {
              "node": 14
            }
          },
          {
            "insert": "u",
            "attributes": {
              "node": 15
            }
          },
          {
            "insert": "l",
            "attributes": {
              "node": 16
            }
          },
          {
            "insert": "l",
            "attributes": {
              "node": 17
            }
          },
          {
            "insert": "i",
            "attributes": {
              "node": 18
            }
          },
          {
            "insert": "\n"
          }
        ],
        "latestId": 18
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
      quillDoc: textBüchel,
      annotatedNodes: new BehaviorSubject([
        ['20', 1],
        ['21', 3],
        ['24', 5]
      ]),
      annotationsVisible$: new BehaviorSubject(true)
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [quillDoc]="quillDoc" [annotationsVisible$]="annotationsVisible$"
                    [annotatedNodes$]="annotatedNodes$" (quillDocChange)="quillDoc=$event"></gv-quill-edit>
                </div>
                <div class="col-6 font-sm" style="height:500px;">
                    <button (click)="annotationsVisible$.next(!annotationsVisible$.value)">toggle annotations visibility</button>
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



