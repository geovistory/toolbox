import { sandboxOf } from 'angular-playground';
import { Project } from 'app/core';
import { InitPeItEditableStateModule } from 'app/shared';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { Information2Module } from '../../../information2.module';
import { PeItAddFormComponent } from './pe-it-add-form.component';

export default sandboxOf(PeItAddFormComponent, {
  imports: [
    InitPeItEditableStateModule,
    InitStateModule,
    Information2Module
  ],
  declareComponent: false
})
  .add('PeIt add form | with buttons', {
    context: {
      f: {},
      cancelled: undefined,
      added: undefined,
      basePath: ['_peIt_add_form'],
      pkProject: -1, // use a pk of a project that has the pkEntity not yet added 
      pkEntity: 152831,
      state: {
        activeProject: {
          pk_project: -1 // use same pkProject
        } as Project,
        _peIt_add_form: undefined
      }
    },
    template: `
    <gv-init-pe-it-editable-state [pkProject]="pkProject" [pkEntity]="pkEntity" (stateCreated)="state._peIt_add_form = $event"
    ></gv-init-pe-it-editable-state>

    <div class="d-flex justify-content-center mt-5" *ngIf="state._peIt_add_form">
      <div style="width:430px;height:400px" class="d-flex">

        <gv-init-state [initState]="state"></gv-init-state>

        <gv-pe-it-add-form [basePath]="basePath" (formChange)="f = $event" 
        (added)="added = $event" addBtn="true" cancelBtn="true" 
        (cancel)="cancelled = true" ></gv-pe-it-add-form>

      </div>

      <div>
        <p *ngIf="cancelled">Cancelled</p>
        <p *ngIf="added">Added: {{added | json}}</p>
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
  .add('PeIt add form | no buttons', {
    context: {
      f: {},
      added: undefined,
      basePath: ['_peIt_add_form'],
      pkProject: -1, // use a pk of a project that has the pkEntity not yet added 
      pkEntity: 152831,
      state: {
        activeProject: {
          pk_project: -1 // use same pkProject
        } as Project,
        _peIt_add_form: undefined
      }
    },
    template: `
    <gv-init-pe-it-editable-state [pkProject]="pkProject" [pkEntity]="pkEntity" (stateCreated)="state._peIt_add_form = $event"
    ></gv-init-pe-it-editable-state>

    <div class="d-flex justify-content-center mt-5" *ngIf="state._peIt_add_form">
      <div style="width:430px;height:400px" class="d-flex">

        <gv-init-state [initState]="state"></gv-init-state>

        <gv-pe-it-add-form [basePath]="basePath" (formChange)="f = $event" (added)="added = $event"></gv-pe-it-add-form>

      </div>

      <div>
        <p *ngIf="added">Added: {{added | json}}</p>
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