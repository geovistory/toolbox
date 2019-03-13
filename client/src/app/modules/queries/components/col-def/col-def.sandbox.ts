import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { BehaviorSubject } from 'rxjs';
import { delay, first } from 'rxjs/operators';
import { QueriesModule } from '../../queries.module';
import { ColDefComponent } from './col-def.component';
import { propertyFieldKeyFromParams } from 'app/core/state/services/state-creator';
import { PropertyOption } from '../property-select/property-select.component';
import { ColDef } from '../col-def-editor/col-def-editor.component';

const options$ = new BehaviorSubject(null)
options$.pipe(first(), delay(1000)).subscribe(() => {
    options$.next([
        {
            label: 'A',
            isOutgoing: true,
            pk: 85,
            propertyFieldKey: propertyFieldKeyFromParams(85, true)
        }
    ] as PropertyOption[])
})

export default sandboxOf(ColDefComponent, {
    declareComponent: false,
    imports: [
        QueriesModule,
        MatFormFieldModule,
        FormsModule,
        InitStateModule
    ]
})
    .add('Col Def | Empty ', {
        context: {
            pkProject: 15,
            sandboxState: {},
            model: {},
            options$
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:630px;height:400px" class="d-flex border mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <mat-label>Entity classes and types</mat-label>
                        <gv-col-def name="control" [(ngModel)]="model" #control="ngModel" [propertyOptions$]="options$" #c [gvNoInvalidChildren]="c.formGroup.controls"></gv-col-def>
                        <mat-error *ngIf="control.invalid">Invalid</mat-error>
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
    .add('Col Def | Preset ', {
        context: {
            pkProject: 15,
            sandboxState: {},
            model: new ColDef({
                ofRootTable: true,
                defaultType: 'entity_preview',
                label: 'Entity'
            }),
            options$
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:630px;height:400px" class="d-flex border mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <mat-label>Entity classes and types</mat-label>
                        <gv-col-def name="control" [(ngModel)]="model" #control="ngModel" [propertyOptions$]="options$"></gv-col-def>
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
    .add('Col Def | Preset Custom Col ', {
        context: {
            pkProject: 15,
            sandboxState: {},
            model: new ColDef({
                label: 'Father',
                queryPath: [
                    {
                        data: {
                            ingoingProperties: [],
                            outgoingProperties: [
                                85
                            ]
                        },
                        type: 'properties'
                    },
                    {
                        data: {
                            types: [],
                            classes: [
                                21
                            ]
                        },
                        type: 'classes'
                    }
                ]
            }),
            options$
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:630px;height:400px" class="d-flex border mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <mat-label>Entity classes and types</mat-label>
                        <gv-col-def name="control" [(ngModel)]="model" #control="ngModel" [propertyOptions$]="options$"></gv-col-def>
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
