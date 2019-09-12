import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { Information2Module } from '../../information.module';
import { CtrlEntityComponent } from './ctrl-entity.component';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';




export default sandboxOf(CtrlEntityComponent, {
  declareComponent: false,
  imports: [
    Information2Module,
    InitStateModule,
    MatFormFieldModule,
    FormsModule
  ]
})
  .add('CtrlEntity | New ', {
    context: {
      model: undefined,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <gv-ctrl-entity [pkClass]="21" placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-entity>
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
  .add('CtrlEntity | Existing ', {
    context: {
      model: 26172,
      parentPath: ''
    },
    template: `
        <gv-init-state [projectFromApi]="24" ></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <gv-ctrl-entity [pkClass]="21" placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-entity>
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
