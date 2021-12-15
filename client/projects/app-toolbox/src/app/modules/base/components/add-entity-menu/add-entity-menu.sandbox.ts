import { Injectable } from '@angular/core';
import { ActiveProjectPipesService } from '@kleiolab/lib-queries';
import { GvPositiveSchemaObject, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { ProInfoProjRelMock } from 'projects/__test__/data/auto-gen/gvDB/ProInfoProjRelMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2021_06_30 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2021-06-30';
import { PROFILE_16_INTERACTIONS_S_2021_07_10 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-16-interactions-s-2021-07-10';
import { PROFILE_20_PHYSICAL_MAN_MA_2021_07_11 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-20-physical-man-ma-2021-07-11';
import { PROFILE_5_GEOVISTORY_BASI_2021_06_30 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2021-06-30';
import { PROFILE_8_MARITIME_HISTOR_2021_07_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-8-maritime-histor-2021-07-09';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { BaseModule } from '../../base.module';
import { AddEntityMenuComponent } from './add-entity-menu.component';


const types: GvPositiveSchemaObject = {
  inf: {
    resource: [
      InfResourceMock.TYPE_OF_MANIF_PROD_TYPE_BOOK,
      InfResourceMock.TYPE_OF_MANIF_PROD_TYPE_JOURNAL,
    ]
  },
  war: {
    entity_preview: [
      WarEntityPreviewMock.TYPE_OF_MANIF_PROD_TYPE_BOOK,
      WarEntityPreviewMock.TYPE_OF_MANIF_PROD_TYPE_JOURNAL,
    ]
  },
  pro: {
    info_proj_rel: [
      ProInfoProjRelMock.PROJ_1_TYPE_OF_MANIF_PROD_TYPE_BOOK,
      ProInfoProjRelMock.PROJ_1_TYPE_OF_MANIF_PROD_TYPE_JOURNAL,
    ]
  }
}

// mock schema objects to initialize sandboxes below
const initialSchemaObects = [
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2021_06_30, // add basics profile
      PROFILE_16_INTERACTIONS_S_2021_07_10, // add social interactions profile
      PROFILE_12_BIOGRAPHICAL_BA_2021_06_30, // add biographical profile
      PROFILE_8_MARITIME_HISTOR_2021_07_09, // add maritime profile
      PROFILE_20_PHYSICAL_MAN_MA_2021_07_11 // add phyical profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  }),
  GvSchemaObjectMock.project1, // add project and its default language
  types
]

/**
 * This service mocks the streamEntityPreview method
 */
@Injectable()
export class ActiveProjectPipesServiceMock extends ActiveProjectPipesService {

  streamEntityPreview(pkEntity: number, forceReload?: boolean): Observable<WarEntityPreview> {
    // const previews = values(WarEntityPreviewMock) as WarEntityPreview[]
    const preview = types.war.entity_preview.find((x) => x?.pk_entity === pkEntity)
    return new BehaviorSubject(preview).pipe(delay(300))
  }
}

export default sandboxOf(AddEntityMenuComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    InitStateModule,
  ],
  providers: [
    { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
  ]
})
  .add('ClassesAndTypesSelectComponent | Sources ', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
      selected: {}
    },
    template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px;height:400px" class="d-flex">
        <gv-add-entity-menu enabledIn="sources" (select)="selected = $event"></gv-add-entity-menu>
      </div>
      <div>
          <p>Selected {{selected | json}}</p>
      </div>
    </div>
    `
  })
  .add('ClassesAndTypesSelectComponent | Entities ', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
    },
    template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px;height:400px" class="d-flex">
        <gv-add-entity-menu enabledIn="entities" (select)="selected = $event"></gv-add-entity-menu>
      </div>
      <div>
          <p>Selected {{selected | json}}</p>
      </div>
    </div>
    `
  })
