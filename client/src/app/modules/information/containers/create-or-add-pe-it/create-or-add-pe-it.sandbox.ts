import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { Information2Module } from '../../information.module';
import { CreateOrAddPeItComponent } from './create-or-add-pe-it.component';
import { CreateOrAddPeIt } from './api/create-or-add-pe-it.models';
import { ComConfig } from 'app/core';



export default sandboxOf(CreateOrAddPeItComponent, {
    declareComponent: false,
    imports: [
        Information2Module,
        InitStateModule
    ]
})
    .add('Create or Add PeIt', {
        context: {
            basePath: ['sandboxState', 'createOrAddPeIt'],
            sandboxState: {
                createOrAddPeIt: {
                    pkUiContext: ComConfig.PK_UI_CONTEXT_DATAUNITS_CREATE,
                    classAndTypePk: {
                        pkClass: 21
                    }
                } as CreateOrAddPeIt
            }
        },
        template: `
        <gv-init-state [sandboxState]="sandboxState" [projectFromApi]="8"  (ok)="ok = true">
            <div *ngIf="ok" class="d-flex justify-content-center mt-5">
                <div style="width:700px;height:400px">
                        <gv-create-or-add-pe-it [basePath]="basePath" (done)="item = $event" (cancel)="cancelled = 'cancelled'"></gv-create-or-add-pe-it>
                </div>
                <div>
                    {{cancelled}}
                    {{item | json}}
                </div>
            </div>
        </gv-init-state>`
    })

