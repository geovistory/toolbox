import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActiveProjectPipesService } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { DatNamespaceMock } from 'projects/__test__/data/auto-gen/gvDB/DatNamespaceMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2022_02_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2022-02-09';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { BaseModule } from '../../base.module';
import { READ_ONLY } from '../../tokens/READ_ONLY';
import { EntityCardHeaderComponent } from './entity-card-header.component';

/*****************************************************************************
 * MOCK data
 *****************************************************************************/
WarEntityPreviewMock.GEO_PLACE_ZURICH.entity_label = 'Zürich has a veeeeeery loooooooooooooooooong name'
const warEntityPreviews = [
  WarEntityPreviewMock.GEO_PLACE_ZURICH,
]

// mock schema objects to initialize sandboxes below
const initialSchemaObects = [
  createCrmAsGvPositiveSchema({
    ontoMocks: [
      PROFILE_5_GEOVISTORY_BASI_2022_01_18, // add basics profile
      PROFILE_12_BIOGRAPHICAL_BA_2022_02_09, // add biographical profile
    ],
    sysConf: SysConfigValueMock.SYS_CONFIC_VALID, // add SYS_CONFIG json
    p: ProProjectMock.PROJECT_1.pk_entity // pk project used to enable above profiles
  }),
  GvSchemaObjectMock.project1, // add project and its default language
]

/*****************************************************************************
 * MOCK services
 *****************************************************************************/


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


export const eCHcontext = {
  initState: IAppStateMock.stateProject1,
  schemaObjects: initialSchemaObects,
  pkClass$: of(WarEntityPreviewMock.GEO_PLACE_ZURICH.fk_class),
  pkEntity: WarEntityPreviewMock.GEO_PLACE_ZURICH.pk_entity,
  pkProject: ProProjectMock.PROJECT_1.pk_entity
};
export const eCHtemplate = `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div>
          <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
          <button (click)="readmode$.next(!readmode$.value)">toggle readonly</button>
        </div>

        <div class="d-flex justify-content-center flex-column mt-5">
            <div style="width:375px;height:48px; border: 1px solid pink;" class="d-flex mt-5">
                <gv-entity-card-header
                  [showOntoInfo$]="showOntoInfo$"
                  [fkClass$]="pkClass$"
                  [pkEntity]="pkEntity"
                  [pkProject]="pkProject"
                  ></gv-entity-card-header>
            </div>
            <div style="width:480px;height:48px; border: 1px solid pink;" class="d-flex mt-5">
              <gv-entity-card-header
                  [showOntoInfo$]="showOntoInfo$"
                  [fkClass$]="pkClass$"
                  [pkEntity]="pkEntity"
                  [pkProject]="pkProject"
                ></gv-entity-card-header>
            </div>
            <div style="width:800px;height:48px; border: 1px solid pink;" class="d-flex mt-5">
              <gv-entity-card-header
                [showOntoInfo$]="showOntoInfo$"
                [fkClass$]="pkClass$"
                [pkEntity]="pkEntity"
                [pkProject]="pkProject"
                ></gv-entity-card-header>
            </div>
            <div style="width:1200px;height:48px; border: 1px solid pink;" class="d-flex mt-5">
            <gv-entity-card-header
              [showOntoInfo$]="showOntoInfo$"
              [fkClass$]="pkClass$"
              [pkEntity]="pkEntity"
              [pkProject]="pkProject"
              ></gv-entity-card-header>
          </div>
        </div>`;
/*****************************************************************************
 * Sandboxes
 *****************************************************************************/
export default sandboxOf(EntityCardHeaderComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    FormsModule,
    InitStateModule
  ],
  providers: [
    { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },
    { provide: READ_ONLY, useValue: false },
  ]
})
  .add('Editable', {
    context: eCHcontext,
    template: eCHtemplate
  })
