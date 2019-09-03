import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { CtrlTimePrimitiveComponent, InfTimePrimitiveWithCalendar } from './ctrl-time-primitive.component';
import { Information2Module } from '../../information.module';




export default sandboxOf(CtrlTimePrimitiveComponent, {
  declareComponent: false,
  imports: [
    Information2Module,
    MatFormFieldModule,
    FormsModule
  ]
})
  .add('CtrlTimePrimitive | New ', {
    context: {
      model: undefined,
      parentPath: ''
    },
    template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <gv-ctrl-time-primitive placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-time-primitive>
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
  .add('CtrlTimePrimitive | Existing ', {
    context: {
      model: {
        julian_day: 2433454,
        duration: "1 day",
        calendar: "gregorian"
      } as InfTimePrimitiveWithCalendar,
      parentPath: ''
    },
    template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <gv-ctrl-time-primitive placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-time-primitive>
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
