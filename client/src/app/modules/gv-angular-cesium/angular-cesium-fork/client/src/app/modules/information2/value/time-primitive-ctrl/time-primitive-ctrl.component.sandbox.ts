import { sandboxOf } from 'angular-playground';

import { ReactiveFormsModule } from '@angular/forms';

import { registerLocaleData, DatePipe } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
registerLocaleData(localeDeCh);


import { TimePrimitiveCtrlComponent } from './time-primitive-ctrl.component';
import { TimePrimitive, ValidationService, InfRole, InfTimePrimitive, InfEntityProjectRel } from 'app/core';
import { DfhConfig } from '../../shared/dfh-config';



export default sandboxOf(TimePrimitiveCtrlComponent, {
  providers: [
    ValidationService,
    DatePipe
  ]
})

  .add('Time Primitive Ctrl | Empty ', {
    context: {
      model: {
        role: {
          fk_property: 99
        } as InfRole
      }
    },
    template: `
  <div class="d-flex justify-content-center mt-5">
      <div style="width:430px;height:400px" class="d-flex">
          <form #f="ngForm">
          <gv-time-primitive-ctrl  name="role" [(ngModel)]="model.role" #role="ngModel" required>Hey playground!</gv-time-primitive-ctrl>
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
  </div>`
  })
  .add('Time Primitive Ctrl | Existing gregorian ', {
    context: {
      model: {
        role: {
          fk_property: 99,
          pk_entity: 1234,
          time_primitive: new InfTimePrimitive({
            'julian_day': 2371231,
            'duration': '1 day',
            fk_class: DfhConfig.timePrimitiveClass
          }),
          entity_version_project_rels: [
            {
              calendar: 'gregorian'
            } as InfEntityProjectRel
          ]
        } as InfRole
      }
    },
    template: `
  <div class="d-flex justify-content-center mt-5">
      <div style="width:430px;height:400px" class="d-flex">
          <form #f="ngForm">
          <gv-time-primitive-ctrl  name="role" [(ngModel)]="model.role" #role="ngModel" required>Hey playground!</gv-time-primitive-ctrl>
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
  </div>`
  })
  .add('State: Edit – existing julian', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2371231,
        'duration': '1 day',
        'calendar': 'julian'
      })
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px">
        <gv-time-primitive-ctrl [state]="'edit'" [timePrimitive]="tp"></gv-time-primitive-ctrl>
      </div>
    </div>
    `
  })
  .add('State: Editable – existing', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444270,
        'duration': '1 year',
        'calendar': 'gregorian'
      })
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px">
        <gv-time-primitive-ctrl [state]="'editable'" [timePrimitive]="tp"></gv-time-primitive-ctrl>
      </div>
    </div>
    `
  });

  /* 
  
   .add('State: View – firstSecond of 1980', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444270,
        'duration': '1 year'
      })
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px">
        <gv-time-primitive-ctrl [state]="'view'" [show]="'firstSecond'" currentCal="gregorian" [timePrimitive]="tp"></gv-time-primitive-ctrl>
      </div>
    </div>
    `
  })
  .add('State: View – lastSecond of 1980', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444240,
        'duration': '1 year'
      })
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px">
        <gv-time-primitive-ctrl [state]="'view'" [show]="'lastSecond'" currentCal="gregorian" [timePrimitive]="tp"></gv-time-primitive-ctrl>
      </div>
    </div>
    `
  })
  .add('State: View – duration of 1 year', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444240,
        'duration': '1 year'
      })
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">
          <gv-time-primitive-ctrl [state]="'view'" [show]="'duration'" currentCal="gregorian" [timePrimitive]="tp"></gv-time-primitive-ctrl>
        </div>
      </div>
      `
  })
  .add('State: View – duration of 1 month', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444271,
        'duration': '1 month'
      })
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">
          <gv-time-primitive-ctrl [state]="'view'" [show]="'duration'" currentCal="gregorian" [timePrimitive]="tp"></gv-time-primitive-ctrl>
        </div>
      </div>
      `
  })
  .add('State: View – duration of 1 day', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444275,
        'duration': '1 day'
      })
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">
          <gv-time-primitive-ctrl [state]="'view'" [show]="'duration'" currentCal="gregorian" [timePrimitive]="tp"></gv-time-primitive-ctrl>
        </div>
      </div>
      `
  })
  .add('State: View – duration of 1 hour', {
    context: {
      tp: new TimePrimitive({
        'julianDay': 2444275,
        'duration': '1 hour'
      })
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">
          <gv-time-primitive-ctrl [state]="'view'" [show]="'duration'" currentCal="gregorian" [timePrimitive]="tp"></gv-time-primitive-ctrl>
        </div>
      </div>
      `
  })
  
  */