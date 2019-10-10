import { sandboxOf } from 'angular-playground';
import { InfRole } from 'app/core';

import { LanguageCtrlComponent } from './language-ctrl.component';
import { Information2Module } from '../../information.module';



export default sandboxOf(LanguageCtrlComponent, {
    declareComponent:false,
    imports: [
        Information2Module
    ]
})
    .add('Language Ctrl | Select ', {
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
                    <gv-language-ctrl class="form-control" name="appe2" [(ngModel)]="model.appe2" #appe2="ngModel" required></gv-language-ctrl>
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
    .add('Language Ctrl | Existing ', {
        context: {
            model: {
                appe2: {
                    fk_property: 99,
                    "language": {
                        "fk_class": 4,
                        "lang_type": "living",
                        "scope": "individual",
                        "iso6392b": "ger",
                        "iso6392t": "deu",
                        "iso6391": "de ",
                        "notes": "German",
                        "pk_entity": 146438
                      }
                } as InfRole
            },
            parentPath: ''
        },
        template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                <form #f="ngForm">
                    <gv-language-ctrl class="form-control" name="appe2" [(ngModel)]="model.appe2" #appe2="ngModel" required></gv-language-ctrl>
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
   