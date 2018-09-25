import { sandboxOf } from 'angular-playground';
import { QuillEditComponent } from './quill-edit.component';
import { QuillService } from '../quill.service';
import { textBüchel } from './quill-edit.sandbox.mock';
import { DomChangeModule } from 'app/shared';
import { QuillViewComponent } from '../quill-view/quill-view.component';



export default sandboxOf(QuillEditComponent, {
    imports: [
        DomChangeModule
    ],
    declarations: [
        QuillViewComponent
    ],
    providers: [
        QuillService
    ]
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
                    (quillDocChange)="quillDoc=$event" (htmlChange)="html=$event" (blur)="(blurCount = blurCount + 1)"></gv-quill-edit>
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
    .add('Quill-Edit | Existing Text ', {
        context: {
            blurCount: 0,
            quillDoc: {
                latestId: 1,
                contents:
                {
                    'ops': [
                        {
                            'attributes': {
                                'node': 1
                            },
                            'insert': 'Emmanuel'
                        }
                    ],
                }
            }
        },
        template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [quillDoc]="quillDoc"
                    (quillDocChange)="quillDoc=$event" (htmlChange)="html=$event" (blur)="(blurCount = blurCount + 1)"></gv-quill-edit>
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
            annotatedNodes: [
                ['20', 1],
                ['21', 3],
                ['24', 5]
            ],
            annotationsVisible: true
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
    .add('Quill-Edit | New text Custom Config ', {
        context: {
            blurCount: 0,
            quillDoc: {
                latestId: 0,
                contents: {}
            }
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


