import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { Information2Module } from '../../information.module';
import { CreateOrAddEntityComponent } from './create-or-add-entity.component';
import { CreateOrAddEntity } from './api/create-or-add-entity.models';
import { SysConfig } from 'app/core';



export default sandboxOf(CreateOrAddEntityComponent, {
    declareComponent: false,
    imports: [
        Information2Module,
        InitStateModule
    ]
})
    .add('Create or Add PeIt', {
        context: {
            basePath: ['sandboxState', 'createOrAddEntity'],
            sandboxState: {
                createOrAddEntity: {
                    pkUiContext: SysConfig.PK_UI_CONTEXT_DATAUNITS_CREATE,
                    classAndTypePk: {
                        pkClass: 21
                    }
                } as CreateOrAddEntity
            }
        },
        template: `
        <gv-init-state [sandboxState]="sandboxState" [projectFromApi]="8"  (ok)="ok = true">
            <div *ngIf="ok" class="d-flex justify-content-center mt-5">
                <div style="width:700px;height:400px">
                        <gv-create-or-add-entity [basePath]="basePath" (done)="item = $event" (cancel)="cancelled = 'cancelled'"></gv-create-or-add-entity>
                </div>
                <div>
                    {{cancelled}}
                    {{item | json}}
                </div>
            </div>
        </gv-init-state>`
    })

