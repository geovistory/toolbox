import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GvPositiveSchemaObject } from '@kleiolab/lib-sdk-lb4/public-api';
import { sandboxOf } from 'angular-playground';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { ProInfoProjRelMock } from 'projects/__test__/data/auto-gen/gvDB/ProInfoProjRelMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { PROFILE_5_GEOVISTORY_BASI_2021_08_24 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2021-08-24';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { BaseModule } from '../../base.module';
import { CtrlTypeComponent } from './ctrl-type.component';


/*****************************************************************************
 * MOCK data
 *****************************************************************************/
// mock entity previews (used below in ActiveProjectPipesServiceMock)
const geoPlaceTypeMock: GvPositiveSchemaObject = {
  inf: {
    resource: [
      InfResourceMock.GEO_PLACE_TYPE_CITY,
      InfResourceMock.GEO_PLACE_TYPE_VILLAGE
    ]
  },
  war: {
    entity_preview: [
      WarEntityPreviewMock.GEO_PLACE_TYPE_CITY,
      WarEntityPreviewMock.GEO_PLACE_TYPE_VILLAGE
    ]
  },
  pro: {
    info_proj_rel: [
      ProInfoProjRelMock.PROJ_1_CITY_TYPE,
      ProInfoProjRelMock.PROJ_1_VILLAGE_TYPE,
    ]
  }
}

// mock schema objects to initialize sandboxes below
const initialSchemaObects = [
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2021_08_24, // add basics profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  }),
  geoPlaceTypeMock,
  GvSchemaObjectMock.project1, // add project and its default language
]




export default sandboxOf(CtrlTypeComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    MatFormFieldModule,
    FormsModule,
    InitStateModule
  ]
})
  .add('CtrlType | New ', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                  <mat-form-field class="w-100">
                    <gv-ctrl-type [pkTypedClass]="363" [pkTypeClass]="364" placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-type>
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
  .add('CtrlType | Autoopen ', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                  <mat-form-field class="w-100">
                    <gv-ctrl-type [pkTypedClass]="363" [pkTypeClass]="364" placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required [autoopen]="true"></gv-ctrl-type>
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
  .add('CtrlType | Edit ', {
    context: {
      model: WarEntityPreviewMock.GEO_PLACE_TYPE_CITY.pk_entity,
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>


        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex mr-4">
                <form #f="ngForm" class="gv-grow-1">
                  <mat-form-field class="w-100">
                    <gv-ctrl-type [pkTypedClass]="363" [pkTypeClass]="364" placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-type>
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
