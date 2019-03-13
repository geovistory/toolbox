import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { sandboxOf } from 'angular-playground';
import { QueriesModule } from '../../queries.module';
import { QueryPathControlComponent } from './query-path-control.component';
import { delay, first } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { propertyFieldKeyFromParams } from 'app/core/state/services/state-creator';
import { PropertyOption } from '../property-select/property-select.component';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { QueryPathSegment } from '../col-def-editor/col-def-editor.component';
import { ValidationDirectivesModule } from 'app/core/validation/validation.directives';


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
    .add('Query Path | Preset ', {
        context: {
            options$,
            pkProject: 15,
            model: [
                {
                    data: {
                        outgoingProperties: [
                            1192
                        ],
                        ingoingProperties: []
                    }
                },
                {
                    data: {
                        classes: [
                            21
                        ],
                        types: []
                    }
                },
                {
                    data: {
                        outgoingProperties: [],
                        ingoingProperties: [
                            1192
                        ]
                    }
                },
                {
                    data: {
                        classes: [
                            365
                        ],
                        types: []
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
                        <gv-query-path-control [propertyOptions$]="options$" placeholder="Enter Foo" name="queryPath" [(ngModel)]="model" #queryPath="ngModel" #c [gvNoInvalidChildren]="c.formGroup.controls"></gv-query-path-control>
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
