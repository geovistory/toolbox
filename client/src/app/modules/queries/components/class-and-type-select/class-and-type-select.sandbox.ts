import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { BehaviorSubject } from 'rxjs';
import { QueriesModule } from '../../queries.module';
import { ClassAndTypeSelectComponent } from './class-and-type-select.component';
import { first, delay } from 'rxjs/operators';

// create a BehaviorSubject that emits first null, and after 1 sec [21, 61]
const pkClasses$ = new BehaviorSubject(null)
pkClasses$.pipe(first(), delay(1000)).subscribe(() => {
    pkClasses$.next([21, 61])
})

export default sandboxOf(ClassAndTypeSelectComponent, {
    declareComponent: false,
    imports: [
        QueriesModule,
        MatFormFieldModule,
        FormsModule,
        InitStateModule
    ]
})
    .add('Class and type Select | Empty ', {
        context: {
            pkProject: 15,
            sandboxState: {},
            model: {},
            pkClasses$
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject" [sandboxState]="sandboxState"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field>
                        <mat-label>Entity classes and types</mat-label>
                        <gv-class-and-type-select name="control" [(ngModel)]="model" #control="ngModel" [pkClasses$]="pkClasses$" gvClassOrTypeRequired></gv-class-and-type-select>
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
    .add('Class and type Select | Preselected ', {
        context: {
            pkProject: 15,
            sandboxState: {},
            model: {
                classes: [
                    21
                ],
                types: []
            },
            pkClasses$
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject" [sandboxState]="sandboxState"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field>
                        <gv-class-and-type-select placeholder="Enter Foo" name="control" [(ngModel)]="model" #control="ngModel" [pkClasses$]="pkClasses$" required></gv-class-and-type-select>
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
