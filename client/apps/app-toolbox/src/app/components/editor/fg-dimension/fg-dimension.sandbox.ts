import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DfhConfig } from "@kleiolab/lib-config";
import { InfDimension } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { BehaviorSubject } from 'rxjs';
import { BaseModule } from '../../../modules/base/base.module';
import { InitStateModule } from '../../misc/init-state/init-state.module';
import { FgDimensionComponent } from './fg-dimension.component';

const pkProject = 591;

export default sandboxOf(FgDimensionComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    MatFormFieldModule,
    FormsModule,
    InitStateModule
  ]
})
  .add('FgDimension | New ', {
    context: {
      initVal$: new BehaviorSubject<InfDimension>({
        pk_entity: undefined,
        fk_measurement_unit: undefined,
        numeric_value: undefined,
        fk_class: DfhConfig.CLASS_PK_DIMENSION
      }),
      parentPath: '',
      pkProject
    },
    template: `
    <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>

    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-fg-dimension #c [appearance]="'outline'" [initVal$]="initVal$" [pkClassOfDimension]="709"></gv-fg-dimension>
      </div>
      <div>
          <button (click)="c.focusOnCtrlNumber()" >focus on number</button>
          <button (click)="c.focusOnCtrlMeasurementUnit()" >focus on measurement unit</button>

          <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
          <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
          <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
          <p>Form.value </p>
          <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
      </div>
    </div>
    `
  })
