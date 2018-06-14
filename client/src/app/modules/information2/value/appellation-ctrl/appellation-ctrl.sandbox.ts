import { sandboxOf } from 'angular-playground';
import { InfRole } from 'app/core';

import { Information2Module } from '../../information2.module';
import { AppellationCtrlComponent } from './appellation-ctrl.component';



export default sandboxOf(AppellationCtrlComponent, {
    imports: [
        Information2Module
    ],
    declareComponent:false
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






