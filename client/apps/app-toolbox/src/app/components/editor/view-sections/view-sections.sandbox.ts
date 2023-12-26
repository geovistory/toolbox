import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActiveProjectPipesService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, GvPositiveSchemaObject, InfLanguage, LanguagesService, SubfieldPageControllerService, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { DatNamespaceMock } from 'projects/__test__/data/auto-gen/gvDB/DatNamespaceMock';
import { InfLanguageMock } from 'projects/__test__/data/auto-gen/gvDB/InfLanguageMock';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { ProInfoProjRelMock } from 'projects/__test__/data/auto-gen/gvDB/ProInfoProjRelMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2022_02_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2022-02-09';
import { PROFILE_16_INTERACTIONS_S_2022_02_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-16-interactions-s-2022-02-09';
import { PROFILE_20_PHYSICAL_MAN_MA_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-20-physical-man-ma-2022-01-18';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import { PROFILE_8_MARITIME_HISTOR_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-8-maritime-histor-2022-01-18';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { MockPaginationControllerForSandboxes } from 'projects/__test__/mock-services/MockPaginationControllerForSandboxes';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { InitStateModule } from '../../../shared/components/init-state/init-state.module';
import { BaseModule } from '../../../modules/base/base.module';
import { ViewSectionsComponent } from './view-sections.component';

/*****************************************************************************
 * MOCK data
 *****************************************************************************/
// mock entity previews (used below in ActiveProjectPipesServiceMock)
const warEntityPreviews = [
  WarEntityPreviewMock.APPE_IN_LANG_TYPE_FIRST_NAME,
  WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME,
  WarEntityPreviewMock.PERSON_1,
  WarEntityPreviewMock.VOLUME_UNIT_CUBIC_METER
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

// mock schema objects to initialize sandboxes below
const initialSchemaObects = [
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18, // add basics profile
      PROFILE_16_INTERACTIONS_S_2022_02_09, // add social interactions profile
      PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, // add biographical profile
      PROFILE_8_MARITIME_HISTOR_2022_01_18, // add maritime profile
      PROFILE_20_PHYSICAL_MAN_MA_2022_01_18 // add phyical profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  }),
  GvSchemaObjectMock.project1, // add project and its default language
  volumeDimensionMock,
  appeTypeMock
]

// showOntoInfo
const showOntoInfo$ = new BehaviorSubject(false);
// readonly
const readmode$ = new BehaviorSubject(false);
// scope
const inProjectScope: GvFieldPageScope = { inProject: ProProjectMock.PROJECT_1.pk_entity }

// Sandbox 1
// person1 as source entity of the properties tree
const person1FieldSource: GvFieldSourceEntity = { fkInfo: InfResourceMock.PERSON_1.pk_entity }
// fkClass of person1
const person1FkClass$ = new BehaviorSubject(InfResourceMock.PERSON_1.fk_class);

// Sandbox 2
// unoin as source entity of the properties tree
const union1FieldSource: GvFieldSourceEntity = { fkInfo: InfResourceMock.UNION_1.pk_entity }
// fkClass of unoin
const union1FkClass$ = new BehaviorSubject(InfResourceMock.UNION_1.fk_class);

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
export default sandboxOf(ViewSectionsComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    FormsModule,
    InitStateModule
  ],
  providers: [
    { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes },
    { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
    { provide: LanguagesService, useClass: LanguagesServiceMock },
  ]
})
  .add('Person 1 in project variant', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
      pkClass$: person1FkClass$,
      source: person1FieldSource,
      showOntoInfo$,
      readmode$,
      scope: inProjectScope
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-view-sections style="width: 100%;"
                  [pkClass$]="pkClass$"
                  [source]="source"
                  [showOntoInfo$]="showOntoInfo$"

                  [scope]="scope"
                ></gv-view-sections>
                  </div>
            <div>
              <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
              <button (click)="readmode$.next(!readmode$.value)">toggle readonly</button>
            </div>
        </div>`
  })
  .add('Union 1 in project variant', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
      pkClass$: union1FkClass$,
      source: union1FieldSource,
      showOntoInfo$,
      readmode$,
      scope: inProjectScope,
      width: 300
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div>
          <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
          <button (click)="readmode$.next(!readmode$.value)">toggle readonly</button>
          <button (click)="width=(width===300?600
            :width===600?1100:300)">Change Witdh</button>
          Width: {{width}}
        </div>
        <div class="d-flex justify-content-center mt-5">
            <div style="width:{{width}}px;height:500px" class="d-flex mr-5">
                <gv-view-sections style="width: 100%;"
                  [pkClass$]="pkClass$"
                  [source]="source"
                  [showOntoInfo$]="showOntoInfo$"

                  [scope]="scope"
                ></gv-view-sections>
              </div>

        </div>`
  })
