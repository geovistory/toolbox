import { FormsModule } from '@angular/forms';
import { IAppState } from '@kleiolab/lib-redux/public-api';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { AuthModule } from 'projects/app-toolbox/src/app/core/auth/auth.module';
import { InfLanguageMock } from 'projects/__test__/data/auto-gen/gvDB/InfLanguageMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2021_06_30 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2021-06-30';
import { PROFILE_16_INTERACTIONS_S_2021_07_10 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-16-interactions-s-2021-07-10';
import { PROFILE_20_PHYSICAL_MAN_MA_2021_07_11 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-20-physical-man-ma-2021-07-11';
import { PROFILE_5_GEOVISTORY_BASI_2021_06_30 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2021-06-30';
import { PROFILE_8_MARITIME_HISTOR_2021_07_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-8-maritime-histor-2021-07-09';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { BehaviorSubject } from 'rxjs';
import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { BaseModule } from '../../base.module';
import { EntityCardComponent } from './entity-card.component';


/**
 * This sandbox requires backend running with a gv db containing a
 * - project 591
 * - entity
 * Login is also required (use login sandbox to login)
 */

const pkProject = 591
const pkEntity = 779360
const pkClass = 21
/*****************************************************************************
 * MOCK data
 *****************************************************************************/


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
    p: pkProject // pk project used to enable above profiles
  }),
  {
    inf: {
      language: [
        InfLanguageMock.GERMAN
      ]
    },
    pro: {
      project: [
        { ...ProProjectMock.PROJECT_1, pk_entity: pkProject }
      ]
    }
  }
  // add project and its default language

]

const initState: IAppState = {
  activeProject: {
    pk_project: pkProject,
    default_language: InfLanguageMock.GERMAN
  },
}

// person1 as source entity of the properties tree
const person1FieldSource: GvFieldSourceEntity = { fkInfo: pkEntity }
// fkClass of person1
const person1FkClass$ = new BehaviorSubject(pkClass);
// showOntoInfo
const showOntoInfo$ = new BehaviorSubject(false);
// readonly
const readonly$ = new BehaviorSubject(false);
// scope
const inProjectScope: GvFieldPageScope = { inProject: pkProject }



/*****************************************************************************
 * Sandboxes
 *****************************************************************************/
export default sandboxOf(EntityCardComponent, {
  declareComponent: false,
  imports: [
    BaseModule,
    FormsModule,
    InitStateModule,
    AuthModule,
  ],
  providers: []
})
  .add('Entity ' + pkEntity + ' in project ' + pkProject + ' (requires Webserver)', {
    context: {
      initState: initState,
      schemaObjects: initialSchemaObects,
      pkClass$: person1FkClass$,
      source: person1FieldSource,
      showOntoInfo$,
      readonly$,
      scope: inProjectScope
    },
    template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>

        <div class="d-flex justify-content-center mt-5">
            <div style="width:480px;height:500px" class="d-flex mr-5">
                <gv-entity-card
                  [pkClass$]="pkClass$"
                  [source]="source"
                  [showOntoInfo$]="showOntoInfo$"
                  [readonly$]="readonly$"
                  [scope]="scope"
                ></gv-entity-card>
                  </div>
            <div>
              <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
            </div>
        </div>`
  })
