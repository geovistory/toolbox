import { sandboxOf } from 'angular-playground';
import { ComConfig, InfEntityAssociation } from 'app/core';
import { crm } from 'app/core/active-project';
import { createEntityAssociationDetail } from 'app/core/state/services/state-creator';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { Information2Module } from '../../information.module';
import { EntityAssociationCreateCtrlComponent } from './entity-association-create-ctrl.component';




export default sandboxOf(EntityAssociationCreateCtrlComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('Entity Association Create Ctrl | Section ', {
        context: {
            model: {
            },
            basePath: ['sandboxState', 'entityAssociationDetail'],
            sandboxState: {
                entityAssociationDetail: createEntityAssociationDetail(
                    { isOutgoing: false },
                    { fk_property: 1015, fk_range_entity: 99 } as InfEntityAssociation,
                    crm,
                    { pkUiContext: ComConfig.PK_UI_CONTEXT_SOURCES_CREATE }
                )
            }
        },
        template: `
            <gv-init-state [projectFromApi]="12" [sandboxState]="sandboxState"></gv-init-state>

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                    <form #f="ngForm">
                        <gv-entity-association-create-ctrl [basePath]="basePath"
                            name="val" [(ngModel)]="model.val" #val="ngModel" required>
                        </gv-entity-association-create-ctrl>
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
