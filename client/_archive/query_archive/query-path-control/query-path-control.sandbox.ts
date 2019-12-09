import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { propertyFieldKeyFromParams } from 'app/core/state/services/state-creator';
import { ValidationDirectivesModule } from 'app/core/validation/validation.directives';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { BehaviorSubject, of } from 'rxjs';
import { delay, first } from 'rxjs/operators';
import { QueryPathSegment } from '../../../../../../../src/common/interfaces';
import { QueriesModule } from '../../queries.module';
import { ClassAndTypeSelectModel } from '../class-and-type-select/class-and-type-select.component';
import { PropertyOption } from '../property-select/property-select.component';
import { QueryPathControlComponent } from './query-path-control.component';


const options$ = new BehaviorSubject(null)
options$.pipe(first(), delay(1000)).subscribe(() => {
  options$.next([
    {
      label: 'A',
      isOutgoing: true,
      pk: 1192,
      propertyFieldKey: propertyFieldKeyFromParams(1192, true)
    }
  ] as PropertyOption[])
})

export default sandboxOf(QueryPathControlComponent, {
  declareComponent: false,
  imports: [
    QueriesModule,
    MatFormFieldModule,
    FormsModule,
    InitStateModule,
    ValidationDirectivesModule
  ]
})
  .add('Query Path | Empty ', {
    context: {
      classesAndTypes$: of({
        classes: [523],
        types: []
      } as ClassAndTypeSelectModel),
      options$,
      pkProject: 374840,
      model: [],
    },
    template: `

        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field>
                        <gv-query-path-control [classesAndTypes$]="classesAndTypes$" name="queryPath" [(ngModel)]="model"
                        #queryPath="ngModel" #c [gvNoInvalidChildren]="c.formGroup.controls"></gv-query-path-control>
                        <mat-error *ngIf="queryPath.invalid">You must enter a value</mat-error>
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

                Invalid: {{queryPath.invalid | json}}

            </div>
        </div>`
  })
  .add('Query Path | Preset ', {
    context: {
      classesAndTypes$: of({
        classes: [21, 62],
        types: []
      } as ClassAndTypeSelectModel),
      options$,
      pkProject: 24,
      model: [
        {
          'type': 'properties',
          'data': {
            'outgoingProperties': [],
            'ingoingProperties': [
              86
            ]
          }
        },
        {
          'type': 'classes',
          'data': {
            'classes': [
              61
            ],
            'types': []
          }
        },
        {
          'type': 'properties',
          'data': {
            'outgoingProperties': [
              84
            ],
            'ingoingProperties': []
          }
        },
        {
          'type': 'classes',
          'data': {
            'classes': [
              21
            ],
            'types': []
          }
        },
        {
          'type': 'properties',
          'data': {
            'outgoingProperties': [],
            'ingoingProperties': [
              1188
            ]
          }
        },
        {
          'type': 'classes',
          'data': {
            'classes': [
              442
            ],
            'types': []
          }
        }
      ] as QueryPathSegment[],
      parentPath: ''
    },
    template: `

        <gv-init-state [projectFromApi]="pkProject" ></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field>
                        <gv-query-path-control [classesAndTypes$]="classesAndTypes$" name="queryPath" [(ngModel)]="model"
                        #queryPath="ngModel" #c [gvNoInvalidChildren]="c.formGroup.controls"></gv-query-path-control>
                        <mat-error *ngIf="queryPath.invalid">You must enter a value</mat-error>
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

                Invalid: {{queryPath.invalid | json}}

            </div>
        </div>`
  })
