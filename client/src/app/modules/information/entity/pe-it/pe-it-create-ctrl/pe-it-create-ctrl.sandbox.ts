import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { Information2Module } from '../../../information.module';
import { mockPerson } from '../pe-it-create-form/sandbox.mock';
import { PeItCreateCtrlComponent } from './pe-it-create-ctrl.component';
import { createPeItDetail } from 'app/core/state/services/state-creator';
import { InfPersistentItem, SysConfig } from 'app/core';
import { crm } from 'app/core/active-project';



export default sandboxOf(PeItCreateCtrlComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('PeIt Create Ctrl | Name ', {
        context: {
            model: {
            },
            basePath: ['sandboxState', 'peItDetail'],
            sandboxState: {
                peItDetail: createPeItDetail({}, new InfPersistentItem({ fk_class: 21 }), crm, { pkUiContext: SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE })
            }
        },
        template: `
            <gv-init-state [projectFromApi]="12" [sandboxState]="sandboxState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-pe-it-create-ctrl [basePath]="basePath"
                            name="val" [(ngModel)]="model.val" #val="ngModel" required>
                        </gv-pe-it-create-ctrl>
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
            </div>
        `
    })