import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { VisualsModule } from '../../visuals.module';
import { MapSettingsComponent, MapVisualSettings } from './map-settings.component';

export default sandboxOf(MapSettingsComponent, {
    declareComponent: false,
    imports: [
        VisualsModule,
        MatFormFieldModule,
        FormsModule,
        InitStateModule
    ]
})
    .add('MapSettings | New ', {
        context: {
            pkProject: 9,
            model: {
                foo: 'Hello World'
            },
            parentPath: ''
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <gv-map-settings placeholder="Enter Foo" name="mapSettings" [(ngModel)]="model" #m="ngModel" #c [gvNoInvalidChildren]="c.formGroup.controls"></gv-map-settings>
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
    .add('MapSettings | Preset ', {
        context: {
            pkProject: 9,
            model: {
                queryLayers: [
                    {
                        queryPk: 614,
                        queryVersion: 8,
                        color: '#EE1690',
                        geoCol: 'Geburtsort',
                        entityPreviewCol: 'Entity'
                    }
                ],
                backgroundLayer: {}
            } as MapVisualSettings,
            parentPath: ''
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100">
                        <gv-map-settings placeholder="Enter Foo" name="mapSettings" [(ngModel)]="model" #m="ngModel" #c [gvNoInvalidChildren]="c.formGroup.controls"></gv-map-settings>
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