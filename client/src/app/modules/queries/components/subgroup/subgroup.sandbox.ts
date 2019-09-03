import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { BehaviorSubject } from 'rxjs';
import { delay, first } from 'rxjs/operators';
import { FilterTree } from '../../containers/query-detail/query-detail.component';
import { QueriesModule } from '../../queries.module';
import { SubgroupComponent } from './subgroup.component';


const pkClasses$ = new BehaviorSubject(null)
pkClasses$.pipe(first(), delay(1000)).subscribe(() => {
    pkClasses$.next([21, 61])
})

export default sandboxOf(SubgroupComponent, {
    imports: [
        QueriesModule,
        InitStateModule,
        MatFormFieldModule,
        FormsModule
    ],
    declareComponent: false
})
    .add('Subgroup | Preselected ', {
        context: {
            pkProject: 15,
            sandboxState: {},
            model: {
                data: {
                    subgroup: 'classAndType'
                }
            } as FilterTree,
            pkClasses$
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject" [sandboxState]="sandboxState"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:650px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field>
                        <gv-subgroup placeholder="Subgroup" name="control" [(ngModel)]="model" #control="ngModel" [pkClasses$]="pkClasses$"
                        ></gv-subgroup>
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

