import { sandboxOf } from 'angular-playground';
import { AnalysisModule } from '../../analysis.module';
import { TableFormComponent } from './table-form.component';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { mockQuery } from './table-form.mock';
import { of } from 'rxjs';

export default sandboxOf(TableFormComponent, {
  declareComponent: false,
  imports: [
    AnalysisModule,
    InitStateModule
  ]
})
  .add('Table Form | Empty ', {
    context: {
      pkProject: 591,
      f: {},
    },
    template: `
      <gv-init-state [projectFromApi]="pkProject">
        <div class="d-flex justify-content-center mt-5">
            <div style="width:600px;height:400px" class="d-flex mr-4">
                <gv-table-form #c></gv-table-form>
            </div>
            <div>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>
      </gv-init-state>`
  })
  .add('Table Form | Preset ', {
    context: {
      pkProject: 591,
      f: {},
      initVal$: of(mockQuery)
    },
    template: `
      <gv-init-state [projectFromApi]="pkProject">
        <div class="d-flex justify-content-center mt-5">
            <div style="width:600px;height:400px" class="d-flex mr-4">
                <gv-table-form #c [initVal$]="initVal$"></gv-table-form>
            </div>
            <div>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>
      </gv-init-state>`
  })
