import { sandboxOf } from 'angular-playground';
import { AnalysisModule } from '../../analysis.module';
import { TimeChartContFormComponent } from './time-chart-cont-form.component';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

export default sandboxOf(TimeChartContFormComponent, {
  declareComponent: false,
  imports: [
    AnalysisModule,
    InitStateModule
  ]
})
  .add('TimeChartCont Form | Empty ', {
    context: {
      pkProject: 24,
      f: {},
    },
    template: `
      <gv-init-state [projectFromApi]="pkProject">
        <div class="d-flex justify-content-center mt-5">
            <div style="width:600px;height:400px" class="d-flex mr-4">
                <gv-time-chart-cont-form #c></gv-time-chart-cont-form>
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
