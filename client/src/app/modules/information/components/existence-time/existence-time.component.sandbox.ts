import { sandboxOf } from 'angular-playground';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData, DatePipe } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
registerLocaleData(localeDeCh);

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ExistenceTimeComponent } from './existence-time.component';

import { FieldComponent } from './field/field.component';
import { FieldsetBeginComponent } from './fieldset-begin/fieldset-begin.component';
import { FieldsetOuterComponent } from './fieldset-outer/fieldset-outer.component';
import { FieldsetEndComponent } from './fieldset-end/fieldset-end.component';
import { FieldsetInnerComponent } from './fieldset-inner/fieldset-inner.component';
import { ValidationService, InfEntityProjectRelApi, ActiveProjectService, TimePrimitive } from 'app/core';
import { RoleService } from '../../shared/role.service';
import { PropertyService } from '../../shared/property.service';
import { UtilitiesService } from '../../shared/utilities.service';
import { EntityEditorService } from 'app/core/entity-editor/entity-editor.service';
import { TimePrimitiveComponent } from '../time-primitive/time-primitive.component';



export default sandboxOf(ExistenceTimeComponent, {
  declarations: [
    FieldComponent,
    FieldsetBeginComponent,
    FieldsetEndComponent,
    FieldsetOuterComponent,
    FieldsetInnerComponent,
    TimePrimitiveComponent
  ],
  imports: [
  ],
  providers: [
    ValidationService,    
    InfEntityProjectRelApi,
    ActiveProjectService,
    RoleService,
    PropertyService,
    UtilitiesService,
    EntityEditorService,
    DatePipe
  ]
})

  .add('State: Editable – no value', {
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px">

        <gv-existence-time [state]="'editable'"></gv-existence-time>

      </div>
    </div>
    `
  })
  .add('State: Editable – Left & Right Inner (81a & 81b)', {
    context: {
      existenceTime: {
        p81a: new TimePrimitive({
          calendar: 'gregorian',
          julianDay: 2431180,
          duration: '1 day'
        }),
        p81b: new TimePrimitive({
          calendar: 'gregorian',
          julianDay: 2451180,
          duration: '1 year'
        })
      }
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">

          <gv-existence-time [cardState]="'expanded'" [state]="'editable'" [existenceTime]="existenceTime"></gv-existence-time>

        </div>
      </div>
      `
  })
  .add('State: Edit – new', {
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">

          <gv-existence-time [state]="'edit'"></gv-existence-time>

        </div>
      </div>
      `
  })
  .add('State: Edit – Begin of Begin (82a)', {
    context: {
      existenceTime: {
        p82a: new TimePrimitive({
          calendar: 'gregorian',
          julianDay: 2451180,
          duration: '1 year'
        })
      }
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">

          <gv-existence-time [cardState]="'expanded'" [state]="'edit'" [existenceTime]="existenceTime"></gv-existence-time>

        </div>
      </div>
      `
  })
  .add('State: Edit – End of Begin (81a)', {
    context: {
      existenceTime: {
        p81a: new TimePrimitive({
          calendar: 'gregorian',
          julianDay: 2451180,
          duration: '1 year'
        })
      }
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">

          <gv-existence-time [cardState]="'expanded'" [state]="'edit'" [existenceTime]="existenceTime"></gv-existence-time>

        </div>
      </div>
      `
  })
  .add('State: Edit – Begin of End (81b)', {
    context: {
      existenceTime: {
        p81b: new TimePrimitive({
          calendar: 'gregorian',
          julianDay: 2451180,
          duration: '1 year'
        })
      }
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">

          <gv-existence-time [cardState]="'expanded'" [state]="'edit'" [existenceTime]="existenceTime"></gv-existence-time>

        </div>
      </div>
      `
  })
  .add('State: Edit – End of end (82b)', {
    context: {
      existenceTime: {
        p82b: new TimePrimitive({
          calendar: 'gregorian',
          julianDay: 2451180,
          duration: '1 year'
        })
      }
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">

          <gv-existence-time [cardState]="'expanded'" [state]="'edit'" [existenceTime]="existenceTime"></gv-existence-time>

        </div>
      </div>
      `
  })
  .add('State: Edit – Outer (82)', {
    context: {
      existenceTime: {
        p82: new TimePrimitive({
          calendar: 'gregorian',
          julianDay: 2451180,
          duration: '1 year'
        })
      }
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">

          <gv-existence-time [cardState]="'expanded'" [state]="'edit'" [existenceTime]="existenceTime"></gv-existence-time>

        </div>
      </div>
      `
  })
  .add('State: Edit – Inner (81)', {
    context: {
      existenceTime: {
        p81: new TimePrimitive({
          calendar: 'gregorian',
          julianDay: 2451180,
          duration: '1 year'
        })
      }
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">

          <gv-existence-time [cardState]="'expanded'" [state]="'edit'" [existenceTime]="existenceTime"></gv-existence-time>

        </div>
      </div>
      `
  })

  .add('State: Edit – Begin&End (81a, 81b)', {
    context: {
      existenceTime: {
        p81a: new TimePrimitive({
          calendar: 'gregorian',
          julianDay: 2431180,
          duration: '1 day'
        }),
        p81b: new TimePrimitive({
          calendar: 'gregorian',
          julianDay: 2451180,
          duration: '1 year'
        })
      }
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
        <div style="width:430px">

          <gv-existence-time [cardState]="'expanded'" [state]="'edit'" [existenceTime]="existenceTime"></gv-existence-time>

        </div>
      </div>
      `
  })