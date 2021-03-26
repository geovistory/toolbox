import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { BaseModule } from '../../base.module';
import { CtrlLanguageComponent } from './ctrl-language.component';




export default sandboxOf(CtrlLanguageComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    MatFormFieldModule,
    FormsModule
  ]
})
  .add('CtrlLanguage | New ', {
    context: {
      model: undefined,
      parentPath: ''
    },
    template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <gv-ctrl-language placeholder="Choose a language" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-language>
                        <mat-error *ngIf="m.invalid">You must enter a value</mat-error>
                    </mat-form-field>
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

                Invalid: {{m.invalid | json}}

            </div>
        </div>`
  })
  .add('CtrlLanguage | Existing ', {
    context: {
      model: {
        "fk_class": 54,
        "pk_language": "spo",
        "lang_type": "living",
        "scope": "individual",
        "iso6392b": null,
        "iso6392t": null,
        "iso6391": null,
        "notes": "Spokane",
        "pk_entity": 23053
      },
      parentPath: ''
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
          <div style="width:430px;height:400px" class="d-flex mr-4">
              <form #f="ngForm" class="gv-grow-1">
                  <mat-form-field class="w-100">
                      <gv-ctrl-language placeholder="Choose a language" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-language>
                      <mat-error *ngIf="m.invalid">You must enter a value</mat-error>
                  </mat-form-field>
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

              Invalid: {{m.invalid | json}}

          </div>
      </div>`
  })
