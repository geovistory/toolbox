import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { BaseModule } from '../../base.module';
import { CtrlPlaceComponent } from './ctrl-place.component';




export default sandboxOf(CtrlPlaceComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    MatFormFieldModule,
    FormsModule
  ]
})
  .add('CtrlPlace | New ', {
    context: {
      model: undefined,
      parentPath: ''
    },
    template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <gv-ctrl-place placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-place>
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
  .add('CtrlPlace | Existing ', {
    context: {
      model: {
        lat: 12,
        long: 22,
        fk_class: 51
      },
      parentPath: ''
    },
    template: `
      <div class="d-flex justify-content-center mt-5">
          <div style="width:430px;height:400px" class="d-flex mr-4">
              <form #f="ngForm" class="gv-grow-1">
                  <mat-form-field class="w-100">
                      <gv-ctrl-place placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-place>
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
