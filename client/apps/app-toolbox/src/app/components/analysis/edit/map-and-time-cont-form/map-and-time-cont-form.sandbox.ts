import { sandboxOf } from 'angular-playground';
import { AnalysisModule } from '../../analysis.module';
import { MapAndTimeContFormComponent } from './map-and-time-cont-form.component';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';

export default sandboxOf(MapAndTimeContFormComponent, {
  declareComponent: false,
  imports: [
    AnalysisModule,
    InitStateModule
  ]
})
  .add('MapAndTimeContForm | Empty ', {
    context: {
      pkProject: 24,
      f: {},
    },
    template: `
      <gv-init-state [projectFromApi]="pkProject">
        <div class="d-flex justify-content-center mt-5">
            <div style="width:600px;height:400px;boarder: 1px dashed red;" class="d-flex m-4 p-1">
                <gv-map-and-time-cont-form #c></gv-map-and-time-cont-form>
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
