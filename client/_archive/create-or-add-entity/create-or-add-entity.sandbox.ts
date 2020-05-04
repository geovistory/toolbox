import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { InformationModule } from '../../information.module';
import { CreateOrAddEntityComponent } from './create-or-add-entity.component';
import { SysConfig } from 'app/core';



export default sandboxOf(CreateOrAddEntityComponent, {
    declareComponent: false,
    imports: [
        InformationModule,
        InitStateModule
    ]
})
    .add('Create or Add PeIt', {
        context: {
            classAndTypePk: {
                pkClass: 21
            },
            pkUiContext: SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE
        },
        template: `
        <gv-init-state [projectFromApi]="24">
            <div class="d-flex justify-content-center mt-5">
                <div style="width:700px;height:400px">
                        <gv-create-or-add-entity [classAndTypePk]="classAndTypePk" [pkUiContext]="pkUiContext"
                        alreadyInProjectBtnText="Select me!"
                        notInProjectBtnText="Select me!"
                        notInProjectClickBehavior="selectOnly" (done)="item = $event" (cancel)="cancelled = 'cancelled'"></gv-create-or-add-entity>
                </div>
                <div>
                    {{cancelled}}
                    {{item | json}}
                </div>
            </div>
        </gv-init-state>`
    })

