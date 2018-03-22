import { sandboxOf } from 'angular-playground';


import { registerLocaleData, DatePipe } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
registerLocaleData(localeDeCh);

import { SDKBrowserModule } from '../shared/sdk/index';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ExistenceTimeComponent } from './existence-time.component';
import { ValidationService } from '../shared/services/validation.service';
import { ControlMessagesComponent } from '../control-messages/control-messages.component';
import { TimePrimitiveComponent } from '../time-primitive/time-primitive.component';
import { InfEntityProjectRelApi } from '../shared/sdk/services/custom/InfEntityProjectRel';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { RoleService } from '../shared/services/role.service';
import { PropertyService } from '../shared/services/property.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import { EntityEditorService } from '../shared/services/entity-editor.service';
import { PassiveLinkDirective } from '../passive-link.directive';
import { TimePrimitive } from '../shared/classes/date-time/time-primitive';
import { FieldComponent } from './field/field.component';
import { FieldsetBeginComponent } from './fieldset-begin/fieldset-begin.component';
import { FieldsetOuterComponent } from './fieldset-outer/fieldset-outer.component';
import { FieldsetEndComponent } from './fieldset-end/fieldset-end.component';
import { FieldsetInnerComponent } from './fieldset-inner/fieldset-inner.component';



export default sandboxOf(ExistenceTimeComponent, {
  declarations: [
    FieldComponent,
    ControlMessagesComponent,
    TimePrimitiveComponent,
    PassiveLinkDirective,
    FieldsetBeginComponent,
    FieldsetEndComponent,
    FieldsetOuterComponent,
    FieldsetInnerComponent,

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SDKBrowserModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    NgbModule.forRoot()
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

  .add('State: Editable', {
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px">

        <gv-existence-time [state]="'editable'"></gv-existence-time>

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
  .add('State: Edit – Begins', {
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
  });;