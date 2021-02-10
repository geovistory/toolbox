import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { BaseModule } from '../../base.module';
import { FgTextPropertyComponent } from './fg-text-property.component';
import { of } from 'rxjs';
import { fgTextPropertyMock } from './mock';
import { InitStateModule } from 'projects/toolbox/src/app/shared/components/init-state/init-state.module';


export default sandboxOf(FgTextPropertyComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    MatFormFieldModule,
    FormsModule,
    InitStateModule
  ]
})
  .add('FgTextProperty | New ', {
    context: {
      model: undefined,
      parentPath: ''
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-init-state [projectFromApi]="591" ></gv-init-state>
          <gv-fg-text-property #c [appearance]="'fill'"></gv-fg-text-property>
      </div>
      <div>
          <button (click)="c.focusOnCtrlText()" >focus on text</button>
          <button (click)="c.focusOnCtrlLanguage()" >focus on lang</button>

          <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
          <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
          <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
          <p>Form.value </p>
          <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
      </div>
    </div>
    `
  })
  .add('FgTextProperty | Edit ', {
    context: {
      initVal$: of(fgTextPropertyMock),
      parentPath: ''
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
        <gv-init-state [projectFromApi]="591" ></gv-init-state>
        <gv-fg-text-property #c [appearance]="'fill'" [initVal$]="initVal$"></gv-fg-text-property>
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
