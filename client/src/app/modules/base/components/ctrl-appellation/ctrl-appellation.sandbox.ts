import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { BaseModule } from '../../base.module';
import { CtrlAppellationComponent } from './ctrl-appellation.component';
import { ValidationDirectivesModule } from 'app/core';





export default sandboxOf(CtrlAppellationComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    MatFormFieldModule,
    FormsModule,
    ValidationDirectivesModule
  ]
})
  .add('CtrlAppellation | New ', {
    context: {
      model: {},
      parentPath: ''
    },
    template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100" appearance="legacy">
                        <gv-ctrl-appellation #ctrl placeholder="Enter Foo"  name="controlName" [(ngModel)]="model" #m="ngModel" [validAppellation]="f"></gv-ctrl-appellation>
                        <mat-error *ngIf="m.errors?.emptyQuillDoc">You must enter a value</mat-error>
                        <mat-error *ngIf="m.errors?.invalidQuillDoc">Error! Please re-enter value.</mat-error>
                        <mat-hint>Hint</mat-hint>
                    </mat-form-field>
                </form>
            </div>
            <div>
                <button (click)="ctrl.onContainerClick()" >set focus</button>
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
  .add('CtrlAppellation | Existing ', {
    context: {
      model: {
        fk_class: 40,
        "quill_doc": {
          "latestId": 2,
          "ops": [
            {
              "attributes": {
                "charid": "2"
              },
              "insert": "a"
            },
            {
              "attributes": {
                "blockid": "1"
              },
              "insert": "\n"
            }
          ]
        }
      },
      parentPath: ''
    },
    template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100" appearance="legacy">
                        <gv-ctrl-appellation placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-appellation>
                        <mat-error *ngIf="m.invalid">You must enter a value</mat-error>
                        <mat-hint>Hint</mat-hint>
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


