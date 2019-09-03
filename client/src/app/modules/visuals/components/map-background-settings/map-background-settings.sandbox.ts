import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { MapBackgroundSettingsComponent } from './map-background-settings.component';
import { VisualsModule } from '../../visuals.module';




export default sandboxOf(MapBackgroundSettingsComponent, {
    declareComponent: false,
    imports: [
        VisualsModule,
        MatFormFieldModule,
        FormsModule
    ]
})
    .add('MapBackgroundSettings | New ', {
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
                        <gv-map-background-settings placeholder="Enter Foo" name="model" [(ngModel)]="model" #model="ngModel" required></gv-map-background-settings>
                        <mat-error *ngIf="model.invalid">You must enter a value</mat-error>
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

                Invalid: {{model.invalid | json}}

            </div>
        </div>`
    })
