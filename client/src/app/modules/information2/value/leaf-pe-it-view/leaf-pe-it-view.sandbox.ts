import { sandboxOf } from 'angular-playground';

import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { PeItDetail } from '../../information.models';
import { AppellationService } from '../../shared/appellation.service';
import { ClassService } from '../../shared/class.service';
import { EprService } from '../../shared/epr.service';
import { PeItService } from '../../shared/pe-it.service';
import { PropertyService } from '../../shared/property.service';
import { RoleSetService } from '../../shared/role-set.service';
import { RoleService } from '../../shared/role.service';
import { StateCreatorService } from '../../shared/state-creator.service';
import { TeEntService } from '../../shared/te-ent.service';
import { PeItEntityPreviewComponent } from './leaf-pe-it-view.component';
import { LeafPeItViewModule } from './leaf-pe-it-view-modal/leaf-pe-it-view-modal.module';




export default sandboxOf(PeItEntityPreviewComponent, {
    imports: [
        InitStateModule,
        LeafPeItViewModule
    ],
    declarations: [

    ],
    providers: [    
        StateCreatorService,
        ClassService,
        PropertyService,
        RoleSetService,
        RoleService,
        PeItService,
        TeEntService,
        EprService,
        AppellationService
    ]
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
