import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { BaseModule } from '../../base.module';
import { FgPlaceComponent } from './fg-place.component';


export default sandboxOf(FgPlaceComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    MatFormFieldModule,
    FormsModule
  ]
})
  .add('FgPlace | New ', {
    context: {
      model: undefined,
      parentPath: ''
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-fg-place #c [appearance]="'fill'"></gv-fg-place>
      </div>
      <div>
          <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
          <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
          <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
          <p>Form.value </p>
          <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
      </div>
    </div>
    `
  })
