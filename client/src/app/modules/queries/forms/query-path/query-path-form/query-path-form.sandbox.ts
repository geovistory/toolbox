import { sandboxOf } from 'angular-playground';
import { QueriesModule } from 'app/modules/queries/queries.module';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { BehaviorSubject, of } from 'rxjs';
import { QueryPathSegment } from '../../../../../../../../src/query/query-path-segment';
import { QueryPathFormComponent } from './query-path-form.component';

const initVal1: QueryPathSegment[] = [{
  type: 'classes',
  data: {
    classes: [21, 365, 61]
  }
}
]
const initVal2: QueryPathSegment[] = [{
  type: 'classes',
  data: {
    classes: [21]
  }
}]
const initVal3: QueryPathSegment[] = [{ type: 'classes', data: { classes: [442], types: [] } }, { data: { ingoingProperties: [], outgoingProperties: [1189] }, type: 'properties' }, { data: { types: [81893], classes: [68] }, type: 'classes' }, { data: { ingoingProperties: [1182], outgoingProperties: [] }, type: 'properties' }, { data: { types: [], classes: [212] }, type: 'classes' }, { data: { ingoingProperties: [], outgoingProperties: [1178] }, type: 'properties' }, { data: { types: [80412], classes: [363] }, type: 'classes' }]
const initVal4: QueryPathSegment[] = [{ type: 'classes', data: { classes: [442], types: [] } }, { data: { ingoingProperties: [], outgoingProperties: [1189] }, type: 'properties' }, { data: { types: [81893], classes: [68] }, type: 'classes' }]
export default sandboxOf(QueryPathFormComponent, {
  declareComponent: false,
  imports: [
    QueriesModule,
    InitStateModule
  ]
})
  .add('QueryPath Form | Empty ', {
    context: {
      pkProject: 24,
      rootClasses$: of([21, 365, 61]),
      initVal$: of(initVal1)
    },
    template: `
      <gv-init-state [projectFromApi]="pkProject">
        <div class="d-flex justify-content-center mt-5">
            <div style="width:600px;height:400px" class="d-flex mr-4">
                <gv-query-path-form #c [rootClasses$]="rootClasses$" [initVal$]="initVal$"></gv-query-path-form>
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
  .add('QueryPath Form | Changeable ', {
    context: {
      pkProject: 24,
      rootClasses$: of([21, 365, 61]),
      initVal1,
      initVal2,
      initVal$: new BehaviorSubject(initVal1)
    },
    template: `
      <gv-init-state [projectFromApi]="pkProject">
        <div class="d-flex justify-content-center mt-5">
            <div style="width:600px;height:400px" class="d-flex mr-4">
                <gv-query-path-form #c [rootClasses$]="rootClasses$" [initVal$]="initVal$"></gv-query-path-form>


                <p>
                  <button (click)="initVal$.next(initVal1)">changeInitVal1</button>
                  <button (click)="initVal$.next(initVal2)">changeInitVal2</button>
                </p>
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

  .add('QueryPath Form | Preset ', {
    context: {
      pkProject: 27,
      rootClasses$: of([442]),
      initVal$: new BehaviorSubject(initVal3)
    },
    template: `
      <gv-init-state [projectFromApi]="pkProject">
        <div class="d-flex justify-content-center mt-5">
            <div style="width:600px;height:400px" class="d-flex mr-4">
                <gv-query-path-form #c [rootClasses$]="rootClasses$" [initVal$]="initVal$"></gv-query-path-form>
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

  .add('QueryPath Form | Preset 2 ', {
    context: {
      pkProject: 27,
      rootClasses$: of([442]),
      initVal$: new BehaviorSubject(initVal4)
    },
    template: `
      <gv-init-state [projectFromApi]="pkProject">
        <div class="d-flex justify-content-center mt-5">
            <div style="width:600px;height:400px" class="d-flex mr-4">
                <gv-query-path-form #c [rootClasses$]="rootClasses$" [initVal$]="initVal$"></gv-query-path-form>
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
