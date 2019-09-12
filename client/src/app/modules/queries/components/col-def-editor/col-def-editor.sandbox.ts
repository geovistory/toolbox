import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { BehaviorSubject } from 'rxjs';
import { delay, first } from 'rxjs/operators';
import { QueriesModule } from '../../queries.module';
import { propertyFieldKeyFromParams } from 'app/core/state/services/state-creator';
import { PropertyOption } from '../property-select/property-select.component';
import { ColDefEditorComponent } from '../col-def-editor/col-def-editor.component';
import { ColDef } from "../col-def-editor/ColDef";

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


export default sandboxOf(ColDefEditorComponent, {
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
            model: [],
            options$
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:630px;height:400px" class="d-flex border mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <mat-label>Entity classes and types</mat-label>
                        <gv-col-def-editor name="control" [(ngModel)]="model" #control="ngModel" [propertyOptions$]="options$"
                        #c [gvNoInvalidChildren]="c.formGroup.controls"></gv-col-def-editor>
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
    .add('Col Def | Preset ', {
        context: {
            pkProject: 15,
            sandboxState: {},
            model: [
                {
                    label: 'Entity',
                    defaultType: 'entity_preview',
                    ofRootTable: true
                },
                {
                    label: 'Entity Label',
                    colName: 'entity_label',
                    defaultType: 'entity_label',
                    ofRootTable: true
                },
                {
                    label: 'Class Label',
                    colName: 'class_label',
                    defaultType: 'class_label',
                    ofRootTable: true
                },
                {
                    label: 'Type Label',
                    colName: 'type_label',
                    defaultType: 'type_label',
                    ofRootTable: true
                },
                {
                    label: 'Father',
                    queryPath: [
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
                    ]
                }
            ],
            options$
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:630px;height:400px" class="d-flex border mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <mat-label>Entity classes and types</mat-label>
                        <gv-col-def-editor name="control" [(ngModel)]="model" #control="ngModel" [propertyOptions$]="options$"
                        #c [gvNoInvalidChildren]="c.formGroup.controls"></gv-col-def-editor>
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
