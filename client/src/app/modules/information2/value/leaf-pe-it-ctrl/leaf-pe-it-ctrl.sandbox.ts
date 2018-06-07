import { sandboxOf } from 'angular-playground';
import { InfRole } from 'app/core';

import { LeafPeItCtrlComponent } from './leaf-pe-it-ctrl.component';
import { NgReduxModule } from '@angular-redux/store';
import { EntityAddModalModule } from '../../add-modal/entity-add-modal.module';
import { PeItAddFormModule } from '../../data-unit/pe-it/pe-it-add-form/pe-it-add-form.module';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';



export default sandboxOf(LeafPeItCtrlComponent, {
    imports: [
        InitStateModule,
        NgReduxModule,
        EntityAddModalModule,
        PeItAddFormModule
    ],
    declarations: [

    ],
    providers: [

    ]
})
    .add('Leaf PeIt Ctrl ', {
        context: {
            initState:{
                activeProject:{
                    pk_project:50
                }
            },
            model: {
                peIt: {
                    fk_property: 99,
                } as InfRole
            },
            dfhClass: {
                "dfh_pk_class": 1,
                "dfh_identifier_in_namespace": "E21",
                "dfh_standard_label": "Person",
                "pk_entity": 726,
            }
        },
        template: `
        <gv-init-state [initState]="initState"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">
                <form #f="ngForm">
                    <gv-leaf-pe-it-ctrl class="form-control" name="peIt" [(ngModel)]="model.peIt" #peIt="ngModel" 
                    [dfhClass]="dfhClass" required></gv-leaf-pe-it-ctrl>
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
