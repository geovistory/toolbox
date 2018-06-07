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
import { PeItEntityPreviewComponent } from './pe-it-entity-preview.component';
import { PeItEntityPreviewModalModule } from './pe-it-entity-preview-modal/pe-it-entity-preview-modal.module';




export default sandboxOf(PeItEntityPreviewComponent, {
    imports: [
        InitStateModule,
        PeItEntityPreviewModalModule
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

             <gv-pe-it-entity-preview [basePath]="basePath" [pkEntity]="pkEntity" [isCircular]="false"></gv-pe-it-entity-preview>      

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

             <gv-pe-it-entity-preview [basePath]="basePath" [pkEntity]="pkEntity" [isCircular]="true"></gv-pe-it-entity-preview>      

            </div>
        </div>`
    })
