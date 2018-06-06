import { sandboxOf } from "angular-playground";
import { AppellationCtrlComponent } from "./appellation-ctrl.component";
import { FormsModule } from "@angular/forms";
import { AppellationLabelEditorComponent } from "./appellation-label-editor/appellation-label-editor.component";
import { AppellationLabelTokenComponent } from "./appellation-label-token/appellation-label-token.component";
import { AppellationService } from "../../shared/appellation.service";
import { InfRole } from "app/core";



export default sandboxOf(AppellationCtrlComponent, {
    imports: [
        FormsModule,
    ],
    declarations: [
        AppellationLabelEditorComponent,
        AppellationLabelTokenComponent
    ],
    providers: [
        AppellationService
    ]
})
    .add('Appellation Ctrl | New ', {
        context: {
            model: {
                appe2: {
                    fk_property: 99
                } as InfRole
            },
            parentPath: ''
        },
        template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                <form #f="ngForm">
                    <gv-appellation-ctrl class="form-control" name="appe2" [(ngModel)]="model.appe2" #appe2="ngModel" required></gv-appellation-ctrl>
                </form>                               
            </div>
            <div>
                <p>Form.valid: {{f.valid | json}}</p>

                <p>Form.touched: {{f.touched | json}}</p>

                <p>Form.dirty: {{f.dirty | json}}</p>

                <p>Form.value </p>
                <pre>
                    {{f.value | json}}
                </pre>
          
            </div>
        </div>`
    })
    .add('Appellation Ctrl | Existing ', {
        context: {
            model: {
                appe2: {
                    fk_property: 99,
                    appellation: {
                        appellation_label: {
                            tokens: [
                                {
                                    "id": 0,
                                    "string": "Hallo",
                                    "isSeparator": false
                                },
                                {
                                    "string": " ",
                                    "isSeparator": true
                                },
                                {
                                    "string": "Welt",
                                    "isSeparator": false
                                }
                            ],
                            "latestTokenId": 2
                        } 
                    }
                } as InfRole
            },
            parentPath: ''
        },
        template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                <form #f="ngForm">
                    <gv-appellation-ctrl class="form-control" name="appe2" [(ngModel)]="model.appe2" #appe2="ngModel" required></gv-appellation-ctrl>
                </form>                               
            </div>
            <div>
                <p>Form.valid: {{f?.valid | json}}</p>

                <p>Form.touched: {{f?.touched | json}}</p>

                <p>Form.dirty: {{f?.dirty | json}}</p>

                <p>Form.value </p>
                <pre>
                    {{f?.value | json}}
                </pre>
          
            </div>
        </div>`
    })






