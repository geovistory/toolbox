import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { sandboxOf } from 'angular-playground';
import { MapSettingsComponent } from './map-settings.component';
import { VisualsModule } from '../../visuals.module';




export default sandboxOf(MapSettingsComponent, {
    declareComponent: false,
    imports: [
        VisualsModule,
        MatFormFieldModule,
        FormsModule
    ]
})
    .add('MapSettings | New ', {
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
                    <mat-form-field class="w-100">
                        <gv-map-settings placeholder="Enter Foo" name="mapSettings" [(ngModel)]="model" #m="ngModel" required></gv-map-settings>
                        <mat-error *ngIf="m.invalid">You must enter a value</mat-error>
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

                Invalid: {{m.invalid | json}}

            </div>
        </div>`
    })
