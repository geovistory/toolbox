import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActiveProjectPipesService } from '@kleiolab/lib-queries';
import { GvPositiveSchemaObject, InfLanguage, LanguagesService, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { DatNamespaceMock } from 'projects/__test__/data/auto-gen/gvDB/DatNamespaceMock';
import { InfLanguageMock } from 'projects/__test__/data/auto-gen/gvDB/InfLanguageMock';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { ProInfoProjRelMock } from 'projects/__test__/data/auto-gen/gvDB/ProInfoProjRelMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2022-01-18';
import { PROFILE_16_INTERACTIONS_S_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-16-interactions-s-2022-01-18';
import { PROFILE_20_PHYSICAL_MAN_MA_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-20-physical-man-ma-2022-01-18';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import { PROFILE_8_MARITIME_HISTOR_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-8-maritime-histor-2022-01-18';
import { PROFILE_97_GEOVISTORY_DIGI_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-97-geovistory-digi-2022-01-18';
import { FieldMock } from 'projects/__test__/data/FieldMock';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { InfResourceWithRelationsMock } from 'projects/__test__/data/InfResourceWithRelationsMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { BaseModule } from '../../base.module';
import { FormCreateEntityComponent } from './form-create-entity.component';
import { mockGeoreference } from './georeference.mock';

/*****************************************************************************
 * MOCK data
 *****************************************************************************/
// mock entity previews (used below in ActiveProjectPipesServiceMock)
const warEntityPreviews = [
  WarEntityPreviewMock.APPE_IN_LANG_TYPE_FIRST_NAME,
  WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME,
  WarEntityPreviewMock.PERSON_1,
  WarEntityPreviewMock.VOLUME_UNIT_CUBIC_METER,
  WarEntityPreviewMock.GEO_PLACE_TYPE_CITY
]
// mock schema objects to initialize sandboxes below
const initialSchemaObects = [
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18, // add basics profile
      PROFILE_16_INTERACTIONS_S_2022_01_18, // add social interactions profile
      PROFILE_12_BIOGRAPHICAL_BA_2022_01_18, // add biographical profile
      PROFILE_8_MARITIME_HISTOR_2022_01_18, // add maritime profile
      PROFILE_20_PHYSICAL_MAN_MA_2022_01_18 // add phyical profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  }),
  GvSchemaObjectMock.project1, // add project and its default language
]
const volumeDimensionMock: GvPositiveSchemaObject = {
  inf: { resource: [InfResourceMock.VOLUME_UNIT_CUBIC_METER] },
  war: { entity_preview: [WarEntityPreviewMock.VOLUME_UNIT_CUBIC_METER] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_VOLUME_UNIT_CUBIC_METER] }
}
const appeTypeMock: GvPositiveSchemaObject = {
  inf: { resource: [InfResourceMock.APPE_IN_LANG_TYPE_LAST_NAME] },
  war: { entity_preview: [WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_APPE_IN_LANG_TYPE_LAST_NAME] }
}
const geoPlaceTypeMock: GvPositiveSchemaObject = {
  inf: { resource: [InfResourceMock.GEO_PLACE_TYPE_CITY] },
  war: { entity_preview: [WarEntityPreviewMock.GEO_PLACE_TYPE_CITY] },
  pro: { info_proj_rel: [ProInfoProjRelMock.PROJ_1_CITY_TYPE] }
}

/*****************************************************************************
 * MOCK services
 *****************************************************************************/

/**
 * This service mocks the find-laguages REST API
 */
class LanguagesServiceMock {
  findLanguagesControllerSearchInLanguages(searchString?: string): Observable<InfLanguage[]> {

    const langs = [InfLanguageMock.GERMAN, InfLanguageMock.FRENCH]
    if (!searchString) return of(langs)
    else {
      const filtered = langs.filter(lang => lang.notes.toUpperCase().includes(searchString.toUpperCase()))
      return of(filtered)
    }
  }
}


/**
 * This service mocks the streamEntityPreview method
 */
@Injectable()
export class ActiveProjectPipesServiceMock extends ActiveProjectPipesService {
  pkProject$ = new BehaviorSubject(ProProjectMock.PROJECT_1.pk_entity)
  datNamespaces$ = new BehaviorSubject([DatNamespaceMock.SANDBOX_NAMESPACE])

  streamEntityPreview(pkEntity: number, forceReload?: boolean): Observable<WarEntityPreview> {
    // const previews = values(WarEntityPreviewMock) as WarEntityPreview[]
    const preview = warEntityPreviews.find((x) => x?.pk_entity === pkEntity)
    return new BehaviorSubject(preview).pipe(delay(300))
  }
}



/*****************************************************************************
 * Sandboxes
 *****************************************************************************/
export default sandboxOf(FormCreateEntityComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    FormsModule,
    InitStateModule
  ],
  providers: [
    { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
    { provide: LanguagesService, useClass: LanguagesServiceMock },
  ]
})
  .add('Georeference (new)', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="84" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Georeference (edit)', {
    context: {
      initVal$: of(mockGeoreference),
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="84" [initVal$]="initVal$" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Appellation in a language TeEn (new)', {
    context: {
      initVal$: of(mockGeoreference),
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="365" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Appellation in a language TeEn (edit)', {
    context: {
      initVal$: of(InfResourceWithRelationsMock.mockNaming),
      initState: IAppStateMock.stateProject1,
      schemaObjects: [...initialSchemaObects, appeTypeMock]
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="365" [initVal$]="initVal$" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('TimeSpan (new)', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects
    },
    template: `
        <p>REMARK: We currently do not create Time Span Instances! <br>
        This form illustrates how it would loock, if we had Time Span Instances.</p>
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="50" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Birth (new)', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: [
        ...initialSchemaObects,
      ]
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="61" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Birth (edit)', {
    context: {
      initVal$: of(InfResourceWithRelationsMock.birth),
      initState: IAppStateMock.stateProject1,
      schemaObjects: [
        ...initialSchemaObects,
      ]
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="61" [initVal$]="initVal$" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Joining (new)', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="78" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Ship Voyage (new)', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="523" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Person (new)', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="21"  #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>

                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Person (edit)', {
    context: {
      initVal$: of(InfResourceWithRelationsMock.mockPerson),
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="21" [initVal$]="initVal$"  #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Geographical Place (new)', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects
    },
    template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
    <div class="d-flex justify-content-center mt-5">
    <div style="width:480px;height:500px" class="d-flex mr-5">
    <gv-form-create-entity [pkClass]="363" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
    </div>
    <div>
    <p>searchString: {{s}}</p>
    <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
    <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
    <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
    <p>Form.value </p>
    <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
    </div>
    </div>`
  })
  .add('Geographical Place (edit)', {
    context: {
      initVal$: of(InfResourceWithRelationsMock.mockGeoPlaceWithType),
      initState: IAppStateMock.stateProject1,
      schemaObjects: [...initialSchemaObects, geoPlaceTypeMock]
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="363" [initVal$]="initVal$" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Manifestation Singleton (new)', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="220" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Expression Portion (new)', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="503" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Union (new)', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="633" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Localisation – C2 (new)', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="212" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Definition', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: [
        createCrmAsGvPositiveSchema({
          ontoMocks: [
            PROFILE_5_GEOVISTORY_BASI_2022_01_18,
            PROFILE_97_GEOVISTORY_DIGI_2022_01_18
          ],
          sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
          p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
        }),
        GvSchemaObjectMock.project1, // add project and its default language
      ]
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [pkClass]="9901" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('has appellation -> Appellation in a language', {
    context: {
      initState: IAppStateMock.stateProject1,
      field: FieldMock.personHasAppeTeEn,
      schemaObjects: [...initialSchemaObects, volumeDimensionMock]
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
              <gv-form-create-entity [source]="{fkInfo:456}" [field]="field" [targetClass]="365" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })

  .add('P8 has volume -> Volume – C20', {
    context: {
      initState: IAppStateMock.stateProject1,
      field: FieldMock.componentHasVolume,
      schemaObjects: [...initialSchemaObects, volumeDimensionMock]
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
              <gv-form-create-entity [source]="{fkInfo:456}" [field]="field" [targetClass]="716" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })


  .add('Was present at -> place', {
    context: {
      initState: IAppStateMock.stateProject1,
      field: FieldMock.presenceWasAtPlace,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [source]="{fkInfo:456}" [field]="field" [targetClass]="51" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })



  .add('has spelling --> spelling', {
    context: {
      field: FieldMock.appeHasAppeString,
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [source]="{fkInfo:456}" [field]="field" [targetClass]="40" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Used in Language --> Language', {
    context: {
      initState: IAppStateMock.stateProject1,
      field: FieldMock.appeTeEnUsedInLanguage,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [source]="{fkInfo:456}" [field]="field" [targetClass]="54" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('Has definition --> Text', {
    context: {
      initState: IAppStateMock.stateProject1,
      field: FieldMock.manifestationSingletonHasDefinition,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [source]="{fkInfo:456}" [field]="field" [targetClass]="785" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('has partner -> Person', {
    context: {
      initState: IAppStateMock.stateProject1,
      field: FieldMock.unionHasPartner,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [source]="{fkInfo:456}" [field]="field" [targetClass]="21" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
  .add('stems from -> Union', {
    context: {
      initState: IAppStateMock.stateProject1,
      field: FieldMock.birthStemsFrom,
      schemaObjects: initialSchemaObects
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-form-create-entity [source]="{fkInfo:456}" [field]="field" [targetClass]="633" #c class="w-100" (searchString)="s=$event"></gv-form-create-entity>
            </div>
            <div>
                <p>searchString: {{s}}</p>
                <p>Form.valid: {{c?.formFactory?.formGroup.valid | json}}</p>
                <p>Form.touched: {{c?.formFactory?.formGroup.touched | json}}</p>
                <p>Form.dirty: {{c?.formFactory?.formGroup.dirty | json}}</p>
                <p>Form.value </p>
                <pre>{{c?.formFactory?.formGroupFactory?.valueChanges$ | async | json }}</pre>
            </div>
        </div>`
  })
