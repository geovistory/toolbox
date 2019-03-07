import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { sandboxOf } from 'angular-playground';
import { QueriesModule } from '../../queries.module';
import { QueryPathControlComponent } from './query-path-control.component';




export default sandboxOf(QueryPathControlComponent, {
    declareComponent: false,
    imports: [
        QueriesModule,
        MatFormFieldModule,
        FormsModule
    ]
})
    .add('PropertyPathSegment | New ', {
        context: {
            model: {
                foo: 'Hello World'
            },
            parentPath: ''
        },
        template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field>
                        <gv-property-path-segment placeholder="Enter Foo" name="propertyPathSegment" [(ngModel)]="model" #propertyPathSegment="ngModel" required></gv-property-path-segment>
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
