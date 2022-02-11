import { Injectable } from '@angular/core';
import { ActiveProjectPipesService } from '@kleiolab/lib-queries';
import { IAppState, PanelTab } from '@kleiolab/lib-redux';
import { ProProject } from '@kleiolab/lib-sdk-lb3';
import { ProjectDataService, SubfieldPageControllerService, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { DatNamespaceMock } from 'projects/__test__/data/auto-gen/gvDB/DatNamespaceMock';
import { InfLanguageMock } from 'projects/__test__/data/auto-gen/gvDB/InfLanguageMock';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2022_02_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2022-02-09';
import { PROFILE_16_INTERACTIONS_S_2022_02_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-16-interactions-s-2022-02-09';
import { PROFILE_20_PHYSICAL_MAN_MA_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-20-physical-man-ma-2022-01-18';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import { PROFILE_8_MARITIME_HISTOR_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-8-maritime-histor-2022-01-18';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { MockPaginationControllerForSandboxes } from 'projects/__test__/mock-services/MockPaginationControllerForSandboxes';
import { MockProjectDataService } from 'projects/__test__/mock-services/MockProjectDataService';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { InformationModule } from '../../information.module';
import { EntityDetailComponent, EntityDetailConfig } from './entity-detail.component';
const warEntityPreviews = [
  WarEntityPreviewMock.APPE_IN_LANG_TYPE_FIRST_NAME,
  WarEntityPreviewMock.APPE_IN_LANG_TYPE_LAST_NAME,
  WarEntityPreviewMock.PERSON_1,
  WarEntityPreviewMock.VOLUME_UNIT_CUBIC_METER
]

const infResources = [
  InfResourceMock.PERSON_1,
]
const tabData: EntityDetailConfig = {
  pkEntity: InfResourceMock.PERSON_1.pk_entity,
  showContentTree: false,
  showFactoids: true,
  showLinkedEntities: true
}
const tab: PanelTab<EntityDetailConfig> = {
  active: true,
  component: 'entity',
  icon: 'persistent-item',
  path: ['X'],
  data: tabData
}
const initState: IAppState = {
  activeProject: {
    pk_project: ProProjectMock.PROJECT_1.pk_entity,
    default_language: InfLanguageMock.GERMAN,
    panels: [
      {
        id: 0,
        tabs: [tab]
      }
    ]
  }
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

]

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

export default sandboxOf(EntityDetailComponent, {
  imports: [
    InitStateModule,
    InformationModule
  ],
  declareComponent: false,
  providers: [
    { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes },
    { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
    { provide: ProjectDataService, useValue: new MockProjectDataService(infResources) },
  ]
})
  .add('View ', {
    context: {
      basePath: ['activeProject', 'peItDetails', '0'],
      pkProject: ProProjectMock.PROJECT_1.pk_entity,
      pkEntity: InfResourceMock.PERSON_1.pk_entity,
      initState,
      schemaObjects: initialSchemaObects,
      tab
    },
    template: `

    <div class="d-flex justify-content-center mt-5">
      <div style="width:800px;height:600px" class="d-flex">

      <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

      <gv-entity-detail [tab]="tab" [pkEntity]="pkEntity" class="gv-grow-1" [basePath]="basePath"></gv-entity-detail>

      </div>
    </div>
        `
  })

  .add('Generate PeIt Edit State ', {
    context: {
      basePath: ['_peIt_editable'],
      pkProject: 57,
      pkEntity: 162152,
      state: {
        activeProject: {
          pk_entity: 57
        } as ProProject,
        _peIt_editable: undefined
      }
    },
    template: `
    <gv-init-pe-it-editable-state [pkProject]="pkProject" [pkEntity]="pkEntity" (stateCreated)="state._peIt_editable = $event"
    ></gv-init-pe-it-editable-state>

    <pre>
      {{state|json}}
    </pre>
    `
  })
