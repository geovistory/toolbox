import { sandboxOf } from 'angular-playground';
import { ComConfig, InfPersistentItem } from 'app/core';
import { crm } from 'app/core/active-project/_mock-data';
import { createPeItDetail } from 'app/core/state/services/state-creator';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { InitPeItEditableStateModule } from '../../../../../shared';
import { Information2Module } from '../../../information.module';
import { PeItCreateFormComponent } from './pe-it-create-form.component';



export default sandboxOf(PeItCreateFormComponent, {
  imports: [
    InitPeItEditableStateModule,
    InitStateModule,
    Information2Module
  ],
  declareComponent: false
})
  .add('PeIt Create Form | Person ', {
    context: {
      f: {},
      sandboxState: {
        _peIt_create_form: createPeItDetail({}, new InfPersistentItem({ fk_class: 21 }), crm, { pkUiContext: ComConfig.PK_UI_CONTEXT_DATAUNITS_CREATE })
      },
      basePath: ['sandboxState', '_peIt_create_form']
    },
    template: `
    <gv-init-state [projectFromApi]="12" [sandboxState]="sandboxState">
      <div class="container">
        <div class="row">
          <div style="width:430px;height:700px" class="col-6">

            <gv-pe-it-create-form [basePath]="basePath" createBtn="true" cancelBtn="true" (formChange)="f = $event" ></gv-pe-it-create-form>

          </div>

          <div class="col-6" >

          <p>Form.valid: {{f.valid | json}}</p>

              <p>Form.touched: {{f.touched | json}}</p>

              <p>Form.dirty: {{f.dirty | json}}</p>

              <p>Form.value </p>
              <pre>{{f.value | json}}</pre>

          </div>
        </div>
      </div>
    </gv-init-state>
    `
  })
