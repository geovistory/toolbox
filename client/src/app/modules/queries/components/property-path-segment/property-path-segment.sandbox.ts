import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { QueriesModule } from '../../queries.module';
import { PropertyPathSegmentComponent } from './property-path-segment.component';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { BehaviorSubject } from 'rxjs';
import { first, delay } from 'rxjs/operators';
import { propertyFieldKeyFromParams } from 'app/core/state/services/state-creator';
import { PropertyOption } from '../property-select/property-select.component';

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

export default sandboxOf(PropertyPathSegmentComponent, {
    declareComponent: false,
    imports: [
        QueriesModule,
        MatFormFieldModule,
        FormsModule,
        InitStateModule
    ]
})

    .add('PropertyPathSegment | Empty ', {
        context: {
            options$,
            model: {
                data: {}
            },
            parentPath: ''
        },
        template: `
    <gv-init-state [projectFromApi]="pkProject" [sandboxState]="sandboxState"></gv-init-state>


    <div class="d-flex justify-content-center mt-5">
        <div style="width:430px;height:400px" class="d-flex mr-4">
            <form #f="ngForm" class="gv-grow-1">
                <mat-form-field>
                    <gv-property-path-segment [propertyOptions$]="options$" placeholder="Enter Foo" name="propertyPathSegment" [(ngModel)]="model" #propertyPathSegment="ngModel" 
                    gvPropertyPathSegmentRequired></gv-property-path-segment>
                    <mat-error *ngIf="propertyPathSegment.invalid">You must enter a value</mat-error>
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

            Invalid: {{propertyPathSegment.invalid | json}}

        </div>
    </div>`
    })

    .add('PropertyPathSegment | Preset ', {
        context: {
            options$,
            model: {
                type: 'properties',
                data: {
                    ingoingProperties: [],
                    outgoingProperties: [1192]
                }
            },
            parentPath: ''
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject" [sandboxState]="sandboxState"></gv-init-state>


        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field>
                        <gv-property-path-segment [propertyOptions$]="options$" placeholder="Enter Foo" name="propertyPathSegment" [(ngModel)]="model" #propertyPathSegment="ngModel" required></gv-property-path-segment>
                        <mat-error *ngIf="propertyPathSegment.invalid">You must enter a value</mat-error>
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

                Invalid: {{propertyPathSegment.invalid | json}}

            </div>
        </div>`
    })
