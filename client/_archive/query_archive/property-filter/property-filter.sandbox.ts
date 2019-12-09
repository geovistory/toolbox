import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { BehaviorSubject } from 'rxjs';
import { delay, first } from 'rxjs/operators';
import { QueriesModule } from '../../queries.module';
import { propertyFieldKeyFromParams } from 'app/core/state/services/state-creator';
import { PropertyOption } from '../property-select/property-select.component';
import { PropertyFilterComponent } from './property-filter.component';


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

export default sandboxOf(PropertyFilterComponent, {
    declareComponent: false,
    imports: [
        QueriesModule,
        MatFormFieldModule,
        FormsModule,
        InitStateModule
    ]
})

    .add('Property Filter | Preset ', {
        context: {
            pkProject: 15,
            sandboxState: {},
            model: {
                data: {
                    ingoingProperties: [],
                    outgoingProperties: [1192]
                }
            },
            options$
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject" [sandboxState]="sandboxState"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <gv-property-filter name="control" [(ngModel)]="model" #control="ngModel" [propertyOptions$]="options$" 
                    gvPropertyFilterRequired></gv-property-filter>
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

                Invalid: {{control.invalid | json}}

            </div>
        </div>`
    })