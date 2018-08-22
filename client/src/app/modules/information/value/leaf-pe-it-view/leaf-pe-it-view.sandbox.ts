import { sandboxOf } from 'angular-playground';

import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { PeItDetail } from 'app/core/models';
import { LeafPeItViewComponent } from './leaf-pe-it-view.component';
import { Information2Module } from '../../information.module';
import { RouterModule } from '../../../../../../node_modules/@angular/router';




export default sandboxOf(LeafPeItViewComponent, {
    imports: [
        InitStateModule,
        Information2Module,
        RouterModule
    ],
    declareComponent: false
})
    .add('Leaf-PeIt | View not Circular ', {
        context: {
            pkEntity: 152831,
            initState: {
                activeProject: {
                    pk_project: 50
                },
                _leaf_peIt: {
                    // gets filled
                } as PeItDetail,
            },
            basePath: ['_leaf_peIt']
        },
        template: `
        <gv-init-state [initState]="initState"></gv-init-state>
        
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">

             <gv-leaf-pe-it-view [basePath]="basePath" [pkEntity]="pkEntity" [isCircular]="false"></gv-leaf-pe-it-view>      

            </div>
        </div>`
    })
    .add('Leaf-PeIt | View Circular', {
        context: {
            pkEntity: 152831,
            initState: {
                activeProject: {
                    pk_project: 50
                },
                _leaf_peIt: {
                    // gets filled
                } as PeItDetail,
            },
            basePath: ['_leaf_peIt']
        },
        template: `
        <gv-init-state [initState]="initState"></gv-init-state>
        
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">

             <gv-leaf-pe-it-view [basePath]="basePath" [pkEntity]="pkEntity" [isCircular]="true"></gv-leaf-pe-it-view>      

            </div>
        </div>`
    })
