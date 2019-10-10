import { sandboxOf } from 'angular-playground';
import { InfRole } from 'app/core';

import { Information2Module } from '../../information.module';
import { AppellationCtrlComponent } from './appellation-ctrl.component';



export default sandboxOf(AppellationCtrlComponent, {
    imports: [
        Information2Module
    ],
    declareComponent: false
})
    .add('Appellation Ctrl | New ', {
        context: {
            model: {},
            parentPath: ''
        },
        template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                <form #f="ngForm">
                    <gv-appellation-ctrl class="form-control p-0" name="appe2" [(ngModel)]="model.appe2" #appe2="ngModel" required></gv-appellation-ctrl>
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
                        // tslint:disable-next-line:max-line-length
                        // tslint:disable-next-line:quotemark
                        quill_doc: { "tokens": [{ "id": 0, "string": "Rudolf", "isSeparator": false }, { "id": 1, "string": " ", "isSeparator": true }, { "id": 2, "string": "I", "isSeparator": false }, { "id": 3, "string": ",", "isSeparator": true }, { "id": 4, "string": " ", "isSeparator": true }, { "id": 5, "string": "Duke", "isSeparator": false }, { "id": 6, "string": " ", "isSeparator": true }, { "id": 7, "string": "of", "isSeparator": false }, { "id": 8, "string": " ", "isSeparator": true }, { "id": 9, "string": "Bavaria", "isSeparator": false }], "latestTokenId": 9 }
                    }
                } as InfRole
            },
            parentPath: ''
        },
        template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                <form #f="ngForm">
                    <gv-appellation-ctrl class="form-control p-0" name="appe2" [(ngModel)]="model.appe2" #appe2="ngModel" required>
                    </gv-appellation-ctrl>
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






