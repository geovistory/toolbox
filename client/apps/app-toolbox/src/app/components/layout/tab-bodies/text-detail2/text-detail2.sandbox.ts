import { Injectable } from '@angular/core';
import { ActiveProjectPipesService, IAppState, PanelTab } from '@kleiolab/lib-redux';
import { GvFieldPageReq, GvPaginationObject, ProjectDataService, SubfieldPageControllerService, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { GvPaginationObjectMock } from 'projects/__test__/data/auto-gen/api-responses/GvPaginationObjectMock';
import { DatNamespaceMock } from 'projects/__test__/data/auto-gen/gvDB/DatNamespaceMock';
import { InfLanguageMock } from 'projects/__test__/data/auto-gen/gvDB/InfLanguageMock';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import { PROFILE_97_GEOVISTORY_DIGI_2022_02_05 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-97-geovistory-digi-2022-02-05';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { MockProjectDataService } from 'projects/__test__/mock-services/MockProjectDataService';
import { values } from 'ramda';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { InitStateModule } from '../../../misc/init-state/init-state.module';
import { DataModule } from '../../data.module';
import { TextDetail2Component, TextDetail2Config } from './text-detail2.component';

const warEntityPreviews = [
  WarEntityPreviewMock.DEFINITION_1,
]

const infResources = [
  InfResourceMock.DEFINITION_1,
]
const tabData: TextDetail2Config = {
  pkEntity: InfResourceMock.DEFINITION_1.pk_entity,
}
const tabId = 't1'
const tab: PanelTab<TextDetail2Config> = {
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
    ],
    tabLayouts: {
      [tabId]: {
        layoutMode: 'both'
      }
    }
  }
}
// mock schema objects to initialize sandboxes below
const initialSchemaObects = [
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18, // add basics profile
      PROFILE_97_GEOVISTORY_DIGI_2022_02_05
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
class MockPaginatedStatementsControllerService {
  first = true;
  subfieldPageControllerLoadSubfieldPages(gvLoadSubfieldPageReq?: GvFieldPageReq[]): Observable<GvPaginationObject> {
    if (values(gvLoadSubfieldPageReq[0].targets)[0].appellation) {
      return new BehaviorSubject(GvPaginationObjectMock.definitionHasValueVersion).pipe(
        delay(800),
        map(value => {
          if (this.first) {
            this.first = false;
            throw new Error('random error');
          }
          return value
        })
      );
    }
    // else if (values(gvLoadSubfieldPageReq[0].targets)[0].place) {
    //   return new BehaviorSubject(GvPaginationObjectMock.madridsPresenceWasAtPlace);
    // }
    // else if (values(gvLoadSubfieldPageReq[0].targets)[0].nestedResource) {
    //   return new BehaviorSubject(GvPaginationObjectMock.personHasAppeTeEn);
    // }

    // else if (values(gvLoadSubfieldPageReq[0].targets)[0].dimension) {
    //   return new BehaviorSubject(GvPaginationObjectMock.journeyHasDuration);
    // }
    // else if (values(gvLoadSubfieldPageReq[0].targets)[0].langString) {
    //   return new BehaviorSubject(GvPaginationObjectMock.manifSingletonHasShortTitleMurderer);
    // }

    // else if (values(gvLoadSubfieldPageReq[0].targets)[0].language) {
    //   return new BehaviorSubject(GvPaginationObjectMock.appeTeEnUsedInLanguage);
    // }
    // else if (values(gvLoadSubfieldPageReq[0].targets)[0].timePrimitive) {
    //   return new BehaviorSubject(GvPaginationObjectMock.shipVoyageAtSomeTimeWithin);
    // }
    // else if (values(gvLoadSubfieldPageReq[0].targets)[0].timeSpan) {
    //   return new BehaviorSubject(GvPaginationObjectMock.shipVoyageHasTimeSpan);
    // }

    throw new Error('mock not implemented for this request');

  }
}


export default sandboxOf(TextDetail2Component, {
  imports: [
    InitStateModule,
    DataModule
  ],
  declareComponent: false,
  providers: [
    { provide: SubfieldPageControllerService, useClass: MockPaginatedStatementsControllerService },
    { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
    { provide: ProjectDataService, useValue: new MockProjectDataService(infResources) },
  ]
})
  .add('View ', {
    context: {
      basePath: ['activeProject', 'peItDetails', '0'],
      pkProject: ProProjectMock.PROJECT_1.pk_entity,
      pkEntity: InfResourceMock.DEFINITION_1.pk_entity,
      initState,
      schemaObjects: initialSchemaObects,
      tabId
    },
    template: `

    <div class="d-flex justify-content-center mt-5">
      <div style="width:800px;height:600px" class="d-flex">

      <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

      <gv-text-detail2 [tabId]="tabId" [pkEntity]="pkEntity" class="gv-grow-1"></gv-text-detail2>

      </div>
    </div>
        `
  })

