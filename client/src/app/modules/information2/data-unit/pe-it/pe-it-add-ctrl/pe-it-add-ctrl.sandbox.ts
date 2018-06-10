import { sandboxOf } from 'angular-playground';
import { Project } from 'app/core';
import { InitPeItEditableStateModule } from 'app/shared';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { Information2Module } from '../../../information2.module';
import { PeItAddCtrlComponent } from '../pe-it-add-ctrl/pe-it-add-ctrl.component';

export default sandboxOf(PeItAddCtrlComponent, {
    imports: [
        InitPeItEditableStateModule,
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('PeIt add form', {
        context: {
            model: {},
            basePath: ['_peIt_add_form'],
            pkProject: -1, // use a pk of a project that has the pkEntity not yet added 
            pkEntity: 152831,
            state: {
                activeProject: {
                    pk_project: -1 // use same pkProject
                } as Project,
                _peIt_add_form: undefined
            }
        },
        template: `
        <gv-init-pe-it-editable-state [pkProject]="pkProject" [pkEntity]="pkEntity" (stateCreated)="state._peIt_add_form = $event"
        ></gv-init-pe-it-editable-state>
    
        <div class="d-flex justify-content-center mt-5" *ngIf="state._peIt_add_form">
         
        
            <div style="width:430px;height:400px" class="d-flex">
        
                <gv-init-state [initState]="state"></gv-init-state>
        
                <form #f="ngForm">
                    <gv-pe-it-add-ctrl [basePath]="basePath"
                        name="val" [(ngModel)]="model.val" #val="ngModel" required>
                    </gv-pe-it-add-ctrl>
                </form>     
                
            </div>


            <div style="height:500px; overflow:scroll;">
                <p>Form.valid: {{f?.valid | json}}</p>

                <p>Form.touched: {{f?.touched | json}}</p>

                <p>Form.dirty: {{f?.dirty | json}}</p>

                <p>Form.value </p>
                <pre>
                    {{f?.value | json}}
                </pre>

            </div>

        </div>


    `
    })
