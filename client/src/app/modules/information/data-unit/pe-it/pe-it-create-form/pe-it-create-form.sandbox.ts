import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

import { PeItCreateFormComponent } from './pe-it-create-form.component';
import { mockPerson } from './sandbox.mock';
import { Information2Module } from '../../../information.module';
import { InitPeItEditableStateModule } from '../../../../../shared';
import { StateSettings } from 'app/core/state/services/state-creator';


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
      initState: {
        _peIt_create_form: mockPerson
      },
      basePath: ['_peIt_create_form']
    },
    template: `
    <gv-init-state [initState]="initState"></gv-init-state>

    <div class="container">
      <div class="row">
        <div style="width:430px;height:700px" class="col-6">

        <gv-pe-it-create-form [basePath]="basePath"  (formChange)="f = $event" ></gv-pe-it-create-form>

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
        `
  })


  .add('Generate Create State | 21 Person by Api Call  ', {
    context: {
      f: {},
      initState: {
        _peIt_create_form: undefined
      },
      basePath: ['_peIt_create_form'],
      fkClass: 21,
      settings: {
        isCreateMode: true
      } as StateSettings
    },
    template: `
    <gv-init-pe-it-editable-state [fkClass]="fkClass" [settings]="settings" (stateCreated)="initState._peIt_create_form = $event"
    ></gv-init-pe-it-editable-state>

    
    <div class="container" *ngIf="initState._peIt_create_form">
      <gv-init-state [initState]="initState"></gv-init-state>
      <div class="row">
        <div style="width:430px;height:700px" class="col-6">

        <gv-pe-it-create-form [basePath]="basePath"  (formChange)="f = $event" ></gv-pe-it-create-form>

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

    `
  })



  .add('Generate Create State | 363 by Api Call  ', {
    context: {
      f: {},
      initState: {
        _peIt_create_form: undefined
      },
      basePath: ['_peIt_create_form'],
      fkClass: 363,
      settings: {
        isCreateMode: true
      } as StateSettings
    },
    template: `
    <gv-init-pe-it-editable-state [fkClass]="fkClass" [settings]="settings" (stateCreated)="initState._peIt_create_form = $event"
    ></gv-init-pe-it-editable-state>

    
    <div class="container" *ngIf="initState._peIt_create_form">
      <gv-init-state [initState]="initState"></gv-init-state>
      <div class="row">
        <div style="width:430px;height:700px" class="col-6">

        <gv-pe-it-create-form [basePath]="basePath"  (formChange)="f = $event" ></gv-pe-it-create-form>

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

    `
  })


  .add('Generate Create State | 21 Person  ', {
    context: {
      state: {},
      fkClass: 21,
      settings: {
        isCreateMode: true
      } as StateSettings
    },
    template: `
    <gv-init-pe-it-editable-state [fkClass]="fkClass" [settings]="settings" (stateCreated)="state = $event"
    ></gv-init-pe-it-editable-state>

    <pre>
      {{state|json}}
    </pre>
    `
  })



  .add('Generate Create State | 363  ', {
    context: {
      state: {},
      fkClass: 363,
      settings: {
        isCreateMode: true
      } as StateSettings
    },
    template: `
    <gv-init-pe-it-editable-state [fkClass]="fkClass" [settings]="settings" (stateCreated)="state = $event"
    ></gv-init-pe-it-editable-state>

    <pre>
      {{state|json}}
    </pre>
    `
  })