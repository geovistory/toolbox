import { sandboxOf } from 'angular-playground';
import { InfRole } from 'app/core';

import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { Information2Module } from '../../information.module';
import { LeafPeItCtrlComponent } from './leaf-pe-it-ctrl.component';
import { RouterModule } from '@angular/router';



export default sandboxOf(LeafPeItCtrlComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('Leaf PeIt Ctrl ', {
        context: {
            model: {
                peIt: {
                    fk_property: 21,
                } as InfRole
            },
            pkClass: 21,
            basePath: ['sandboxState', 'leafPeItCtrl']
        },
        template: `
        <gv-init-state [projectFromApi]="12">
            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-leaf-pe-it-ctrl class="gv-outer-form-control" name="peIt" [(ngModel)]="model.peIt" #peIt="ngModel"
                        [pkClass]="pkClass" [basePath]="basePath" required></gv-leaf-pe-it-ctrl>
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
        </gv-init-state>`
    })
