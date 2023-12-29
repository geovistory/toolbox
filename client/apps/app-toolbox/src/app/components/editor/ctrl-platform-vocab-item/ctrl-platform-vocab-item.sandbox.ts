import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GvPositiveSchemaObject, InfResource, ProInfoProjRel, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { DfhApiClassMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiClassMock';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { ProInfoProjRelMock } from 'projects/__test__/data/auto-gen/gvDB/ProInfoProjRelMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { PubAccountMock } from 'projects/__test__/data/auto-gen/gvDB/PubAccountMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { OmitEntity } from 'projects/__test__/data/auto-gen/gvDB/local-model.helpers';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { BaseModule } from '../../../modules/base/base.module';
import { InitStateModule } from '../../misc/init-state/init-state.module';
import { CtrlPlatformVocabItemComponent } from './ctrl-platform-vocab-item.component';


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


for (let i = 0; i < 20; i++) {
  const pkEntity = 490000 + i;
  const resource: OmitEntity<InfResource> = ({
    pk_entity: pkEntity,
    fk_class: DfhApiClassMock.EN_364_GEO_PLACE_TYPE.dfh_pk_class,
    community_visibility: { toolbox: true, dataApi: true, website: true }
  })
  const preview: OmitEntity<WarEntityPreview> = ({
    ...resource,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    project: ProProjectMock.PROJECT_1.pk_entity,
    class_label: DfhApiClassMock.EN_364_GEO_PLACE_TYPE.dfh_class_label,
    entity_label: 'Type ' + pkEntity,
    entity_type: 'peIt',
  })
  const projRel: OmitEntity<ProInfoProjRel> = ({
    pk_entity: 290000 + i,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    fk_entity: pkEntity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  })
  geoPlaceTypeMock.inf.resource.push(resource)
  geoPlaceTypeMock.war.entity_preview.push(preview)
  geoPlaceTypeMock.pro.info_proj_rel.push(projRel)
}

// mock schema objects to initialize sandboxes below
const initialSchemaObects = [
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18, // add basics profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  }),
  geoPlaceTypeMock,
  GvSchemaObjectMock.project1, // add project and its default language
]




export default sandboxOf(CtrlPlatformVocabItemComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    MatFormFieldModule,
    FormsModule,
    InitStateModule
  ]
})
  .add('CtrlPlatformVocabItem | New ', {
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
                    <gv-ctrl-platform-vocab-item [showPrimaryAction]="true" [primaryActionText]="'Advanced dialog...'" [pkTypedClass]="363" [pkTypeClass]="364" placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-platform-vocab-item>
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
  .add('CtrlPlatformVocabItem | Autoopen ', {
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
                    <gv-ctrl-platform-vocab-item [pkTypedClass]="363" [pkTypeClass]="364" placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required [autoopen]="true"></gv-ctrl-platform-vocab-item>
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
  .add('CtrlPlatformVocabItem | Edit ', {
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
                    <gv-ctrl-platform-vocab-item [pkTypedClass]="363" [pkTypeClass]="364" placeholder="Enter Foo" name="controlName" [(ngModel)]="model" #m="ngModel" required></gv-ctrl-platform-vocab-item>
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
