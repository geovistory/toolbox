import { Injectable } from '@angular/core';
import { ActiveProjectPipesService } from '@kleiolab/lib-queries';
import { APP_INITIAL_STATE } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { DatNamespaceMock } from 'projects/__test__/data/auto-gen/gvDB/DatNamespaceMock';
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
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { InitStateModule } from '../init-state/init-state.module';
import { EntityPreviewComponent } from './entity-preview.component';
import { EntityPreviewModule } from './entity-preview.module';
const warEntityPreviews = [
  WarEntityPreviewMock.PERSON_1,
  WarEntityPreviewMock.BIRTH_ZWINGLI,
  WarEntityPreviewMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_1,
]
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
    return new BehaviorSubject(preview).pipe(delay(1300))
  }
}

export default sandboxOf(EntityPreviewComponent, {
  declareComponent: false,
  imports: [InitStateModule, EntityPreviewModule],
  providers: [
    { provide: APP_INITIAL_STATE, useValue: IAppStateMock.stateProject1 },
    { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
  ]
})
  .add('EntityPreview', {
    context: {
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
      pkEntity: WarEntityPreviewMock.PERSON_1.pk_entity,
      pkSection: WarEntityPreviewMock.EXPRESSION_PORTION_HABS_EMP_CHAPTER_1.pk_entity,
      pkBirth: WarEntityPreviewMock.BIRTH_ZWINGLI.pk_entity,
    },
    template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

    <div style="padding:40px">
      <p>Default</p>
      <gv-entity-preview [pkEntity]="pkEntity"></gv-entity-preview>
      <br><br><br>

      <p>Open Menu on click</p>
      <gv-entity-preview [pkEntity]="pkEntity" [openTabOnClick]="true"></gv-entity-preview>
      <br><br><br>

      <p>Hide Class</p>
      <gv-entity-preview [pkEntity]="pkEntity" [hideClass]="true"></gv-entity-preview>
      <br><br><br>

      <p>Section</p>
      <gv-entity-preview [pkEntity]="pkSection"></gv-entity-preview>
      <br><br><br>

      <p>Birth</p>
      <gv-entity-preview [pkEntity]="pkBirth"></gv-entity-preview>
      <br><br><br>
      <p>Gray</p>
      <gv-entity-preview [pkEntity]="pkBirth"></gv-entity-preview>
      <br><br><br>
    </div>

    `
  })
