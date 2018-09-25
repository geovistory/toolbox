import { sandboxOf } from 'angular-playground';
import { InfRole } from 'app/core';

import { Information2Module } from '../../information.module';
import { AppellationCtrl2Component } from './appellation-ctrl2.component';



export default sandboxOf(AppellationCtrl2Component, {
    imports: [
        Information2Module
    ],
    declareComponent: false
})
    .add('Appellation Ctrl 2 | New ', {
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
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-flex-grow-1">
                    <gv-appellation-ctrl2 name="appe2" [(ngModel)]="model.appe2" #appe2="ngModel" required></gv-appellation-ctrl2>
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
    .add('Appellation Ctrl 2 | Existing ', {
        context: {
            model: {
                appe2: {
                    fk_property: 99,
                    appellation: {
                        // tslint:disable-next-line:max-line-length
                        // tslint:disable-next-line:quotemark
                        appellation_label: { "tokens": [{ "id": 0, "string": "Rudolf", "isSeparator": false }, { "id": 1, "string": " ", "isSeparator": true }, { "id": 2, "string": "I", "isSeparator": false }, { "id": 3, "string": ",", "isSeparator": true }, { "id": 4, "string": " ", "isSeparator": true }, { "id": 5, "string": "Duke", "isSeparator": false }, { "id": 6, "string": " ", "isSeparator": true }, { "id": 7, "string": "of", "isSeparator": false }, { "id": 8, "string": " ", "isSeparator": true }, { "id": 9, "string": "Bavaria", "isSeparator": false }], "latestTokenId": 9 }
                    }
                } as InfRole
            },
            parentPath: ''
        },
        template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-flex-grow-1">
                <gv-appellation-ctrl2 name="appe2" [(ngModel)]="model.appe2" #appe2="ngModel" required></gv-appellation-ctrl2>
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
