import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { InfLangString } from 'app/core';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { BehaviorSubject } from 'rxjs';
import { BaseModule } from '../../base.module';
import { FgLangStringComponent } from './fg-lang-string.component';


export default sandboxOf(FgLangStringComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    MatFormFieldModule,
    FormsModule
  ]
})
  .add('FgLangString | New ', {
    context: {
      initVal$: new BehaviorSubject<InfLangString>({
        pk_entity: undefined,
        fk_language: undefined,
        quill_doc: undefined,
        string: undefined,
        fk_class: DfhConfig.CLASS_PK_REFERENCE
      }),
      parentPath: ''
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-fg-lang-string #c [appearance]="'fill'" [initVal$]="initVal$"></gv-fg-lang-string>
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
