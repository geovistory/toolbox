import { sandboxOf } from 'angular-playground';


import { registerLocaleData, DatePipe } from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';
registerLocaleData(localeDeCh);

import { SDKBrowserModule } from '../shared/sdk/index';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PropertySectionForDatesComponent } from './property-section-for-dates.component';
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



export default sandboxOf(PropertySectionForDatesComponent, {
  declarations: [
    ControlMessagesComponent,
    TimePrimitiveComponent,
    PassiveLinkDirective
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SDKBrowserModule.forRoot(),
    SlimLoadingBarModule.forRoot()
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
  .add('State: Edit', {
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px">

        <gv-property-section-for-dates [propState]="'edit'"></gv-property-section-for-dates>

      </div>
    </div>
    `
  })
  .add('State: View', {
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px">

        <gv-property-section-for-dates [propState]="'view'"></gv-property-section-for-dates>

      </div>
    </div>
    `
  });