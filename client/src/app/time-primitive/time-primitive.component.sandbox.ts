import { sandboxOf } from 'angular-playground';

import { ReactiveFormsModule } from '@angular/forms';

import { TimePrimitiveComponent } from './time-primitive.component';
import { ControlMessagesComponent } from '../control-messages/control-messages.component';
import { ValidationService } from '../shared/services/validation.service';

export default sandboxOf(TimePrimitiveComponent, {
  declarations: [
    ControlMessagesComponent
  ],
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    ValidationService
  ]
})
  .add('State: Edit – With: 430px', {
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px">
        <gv-time-primitive>Hey playground!</gv-time-primitive>
      </div>
    </div>
    `
  });