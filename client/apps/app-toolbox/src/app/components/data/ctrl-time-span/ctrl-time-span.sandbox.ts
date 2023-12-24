import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { InitStateModule } from '../../../shared/components/init-state/init-state.module';
import { BaseModule } from '../../../modules/base/base.module';
import { CtrlTimeSpanComponent } from './ctrl-time-span.component';




export default sandboxOf(CtrlTimeSpanComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    MatFormFieldModule,
    FormsModule,
    InitStateModule
  ]
})
  .add('CtrlTimeSpan | New ', {
    context: {
      model: undefined,
      initState: IAppStateMock.stateProject1,
      schemaObjects: [
        GvSchemaObjectMock.basicClassesAndProperties,
        GvSchemaObjectMock.modelOfPresence,
        GvSchemaObjectMock.project1,
        GvSchemaObjectMock.sysConfig,
      ]
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <gv-ctrl-time-span placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-time-span>
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
  .add('CtrlTimeSpan | Existing ', {
    context: {
      model: {
        '151': {
          'julian_day': 2458721,
          'duration': '1 day',
          'calendar': 'julian'
        },
        '152': {
          'julian_day': 2447193,
          'duration': '1 day',
          'calendar': 'gregorian'
        }
      },
      initState: IAppStateMock.stateProject1,
      schemaObjects: [
        GvSchemaObjectMock.basicClassesAndProperties,
        GvSchemaObjectMock.modelOfPresence,
        GvSchemaObjectMock.project1,
        GvSchemaObjectMock.sysConfig,
      ]
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <gv-ctrl-time-span placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-time-span>
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
