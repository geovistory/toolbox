import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { QueriesModule } from '../../queries.module';
import { ClassAndTypePathSegmentComponent } from './class-and-type-path-segment.component';
import { BehaviorSubject } from 'rxjs';
import { first, delay } from 'rxjs/operators';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { QueryPathSegment } from '../col-def-editor/col-def-editor.component';



// create a BehaviorSubject that emits first null, and after 1 sec [21, 61]
const pkClasses$ = new BehaviorSubject(null)
pkClasses$.pipe(first(), delay(1000)).subscribe(() => {
    pkClasses$.next([21, 61])
})

export default sandboxOf(ClassAndTypePathSegmentComponent, {
    declareComponent: false,
    imports: [
        QueriesModule,
        MatFormFieldModule,
        FormsModule,
        InitStateModule
    ]
})
    .add('Class and Type PathSegment | New ', {
        context: {
            pkProject: 15,
            model: {
                type: 'classes',
                data: {}
            } as QueryPathSegment,
            pkClasses$,
            parentPath: ''
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field>
                        <gv-class-and-type-path-segment placeholder="Enter Foo" name="classAndTypePathSegment" [(ngModel)]="model"
                         #classAndTypePathSegment="ngModel" [pkClasses$]="pkClasses$" gvClassAndTypePathSegmentRequired></gv-class-and-type-path-segment>
                        <mat-error *ngIf="classAndTypePathSegment.invalid">You must enter a value</mat-error>
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

                Invalid: {{classAndTypePathSegment.invalid | json}}

            </div>
        </div>`
    })
