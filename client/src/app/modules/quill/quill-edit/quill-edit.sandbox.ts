import { sandboxOf } from "angular-playground";
import { QuillEditComponent } from "./quill-edit.component";
import { QuillService } from "../quill.service";
import { textBüchel } from "./quill-edit.sandbox.mock";
import { DomChangeModule } from "app/shared";
import { QuillViewComponent } from "../quill-view/quill-view.component";



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
            latestId: 7,
            contents: {}
        },
        template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [contents]="contents" [latestId]="latestId" (latestIdChange)="latestId=$event"
                    (contentChange)="contents=$event" (htmlChange)="html=$event"></gv-quill-edit>
                </div>
                <div class="col-6 font-sm" style="height:500px;">
                    <strong>
                    Latest Token Id: {{latestId}}
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
                    JSON:
                    </strong>

                    <pre>
                    {{contents | json:2}}
                    </pre>
                </div>
            </div>
        </div>
        `
    })
    .add('Quill-Edit | Existing Text ', {
        context: {
            latestId: textBüchel.latestId,
            contents: textBüchel.contents
        },
        template: `
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <gv-quill-edit [contents]="contents" [latestId]="latestId" (latestIdChange)="latestId=$event"
                    (contentChange)="contents=$event" (htmlChange)="html=$event"></gv-quill-edit>
                </div>
                <div class="col-6 font-sm" style="height:500px;">
                    <strong>
                    Latest Token Id: {{latestId}}
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
                    JSON:
                    </strong>

                    <pre>
                    {{contents | json:2}}
                    </pre>
                </div>
            </div>
        </div>
        `
    })
    .add('Quill-Edit | Annotations Visible', {
        context: {
            latestId: textBüchel.latestId,
            contents: textBüchel.contents,
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
                    <gv-quill-edit [contents]="contents" [latestId]="latestId" [annotationsVisible]="annotationsVisible" 
                    [annotatedNodes]="annotatedNodes" (contentChange)="contents=$event"></gv-quill-edit>
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
                    {{contents | json:2}}
                    </pre>
                </div>

            </div>
        </div>
        `
    })
    .add('Quill-Edit | Annotations Not Visible', {
        context: {
            latestId: textBüchel.latestId,
            contents: textBüchel.contents,
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
                    <gv-quill-edit [contents]="contents" [latestId]="latestId" [annotationsVisible]="annotationsVisible" 
                    [annotatedNodes]="annotatedNodes" (contentChange)="contents=$event"></gv-quill-edit>
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
                    {{contents | json:2}}
                    </pre>
                </div>

            </div>
        </div>
        `
    })
    .add('Quill-Edit | Creating Annotation', {
        context: {
            latestId: textBüchel.latestId,
            contents: textBüchel.contents,
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
                    <gv-quill-edit [contents]="contents" [latestId]="latestId" [annotationsVisible]="annotationsVisible" 
                    [annotatedNodes]="annotatedNodes" [creatingAnnotation]="creatingAnnotation" (contentChange)="contents=$event" (selectedDeltaChange)="selectedDelta=$event"></gv-quill-edit>

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


