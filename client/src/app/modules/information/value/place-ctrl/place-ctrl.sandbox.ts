import { sandboxOf } from 'angular-playground';
import { InfRole } from 'app/core';

import { Information2Module } from '../../information.module';
import { PlaceCtrlComponent } from './place-ctrl.component';



export default sandboxOf(PlaceCtrlComponent, {
    declareComponent:false,
    imports: [
        Information2Module
    ]
})
    .add('Place Ctrl | Empty ', {
        context: {
            model: {
                role: {
                    fk_property: 99
                } as InfRole
            },
            parentPath: ''
        },
        template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                <form #f="ngForm">
                    <gv-place-ctrl class="form-control" name="role" [(ngModel)]="model.role" #role="ngModel" required></gv-place-ctrl>
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
   
   