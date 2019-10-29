import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { BehaviorSubject } from 'rxjs';
import { delay, first } from 'rxjs/operators';
import { QueriesModule } from '../../queries.module';
import { ClassAndTypeFilterComponent } from './class-and-type-filter.component';
import { QueryFilter } from "../../containers/query-detail/FilterTree";

// create a BehaviorSubject that emits first null, and after 1 sec [21, 61]
const pkClasses$ = new BehaviorSubject(null)
pkClasses$.pipe(first(), delay(1000)).subscribe(() => {
    pkClasses$.next([21, 61])
})

export default sandboxOf(ClassAndTypeFilterComponent, {
    declareComponent: false,
    imports: [
        QueriesModule,
        MatFormFieldModule,
        FormsModule,
        InitStateModule
    ]
})
    .add('Class and type Filter | Empty ', {
        context: {
            pkProject: 15,
            sandboxState: {},
            model: {},
            pkClasses$
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field>
                        <gv-class-and-type-filter placeholder="Enter Foo" name="control" [(ngModel)]="model" #control="ngModel" [pkClasses$]="pkClasses$"
                        #c [gvNoInvalidChildren]="c.formGroup.controls"></gv-class-and-type-filter>
                        <mat-error *ngIf="control.invalid">You must enter a value</mat-error>
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

                Invalid: {{control.invalid | json}}

            </div>
        </div>`
    })
    .add('Class and type Filter | Preset ', {
        context: {
            pkProject: 24,
            sandboxState: {},
            model: {
                data: {
                    classes: [
                        21
                    ],
                    types: []
                },
                children: [{
                    data: {
                        subgroup: 'property'
                    },
                    children: [

                    ]
                }]
            } as QueryFilter,
            pkClasses$
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject" [sandboxState]="sandboxState"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                        <gv-class-and-type-filter name="control" [(ngModel)]="model" #control="ngModel" [pkClasses$]="pkClasses$"
                        #c [gvNoInvalidChildren]="c.formGroup.controls"></gv-class-and-type-filter>
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
    .add('Class and type Filter | Preset 2', {
        context: {
            pkProject: 24,
            sandboxState: {},
            model:
                {
                    data: {
                        types: [],
                        classes: [
                            61
                        ]
                    },
                    children: [
                        {
                            data: {
                                operator: 'AND',
                                subgroup: 'property'
                            },
                            children: [
                                {
                                    data: {
                                        operator: 'IS',
                                        ingoingProperties: [],
                                        outgoingProperties: [
                                            85
                                        ]
                                    },
                                    children: []
                                }
                            ]
                        }
                    ]
                } as QueryFilter,
            pkClasses$
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject" [sandboxState]="sandboxState"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                        <gv-class-and-type-filter name="control" [(ngModel)]="model" #control="ngModel" [pkClasses$]="pkClasses$" ></gv-class-and-type-filter>
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

