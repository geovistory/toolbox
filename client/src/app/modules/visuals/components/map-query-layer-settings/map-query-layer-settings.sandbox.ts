import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';
import { VisualsModule } from '../../visuals.module';
import { MapQueryLayerSettings, MapQueryLayerSettingsComponent } from './map-query-layer-settings.component';




export default sandboxOf(MapQueryLayerSettingsComponent, {
    declareComponent: false,
    imports: [
        InitStateModule,
        VisualsModule,
        MatFormFieldModule,
        FormsModule
    ]
})
    .add('MapQueryLayerSettings | Preset ', {
        context: {
            pkProject: 12,
            model: {
                queryPk: 665,
                queryVersion: 14
            } as MapQueryLayerSettings,
            parentPath: ''
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100" appearance="outline">
                        <gv-map-query-layer-settings placeholder="Enter Foo" name="controlName" [(ngModel)]="model"
                        #m="ngModel" required></gv-map-query-layer-settings>
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

    .add('MapQueryLayerSettings | Preset Old Query Version ', {
        context: {
            pkProject: 12,
            model: {
                queryPk: 665,
                queryVersion: 10

            } as MapQueryLayerSettings,
            parentPath: ''
        },
        template: `
        <gv-init-state [projectFromApi]="pkProject"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                    <mat-form-field class="w-100" appearance="outline">
                        <gv-map-query-layer-settings placeholder="Enter Foo" name="controlName" [(ngModel)]="model"
                        #m="ngModel" required></gv-map-query-layer-settings>
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
