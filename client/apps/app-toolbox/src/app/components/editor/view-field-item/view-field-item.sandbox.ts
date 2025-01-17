import { Injectable } from '@angular/core';
import { ActiveProjectPipesService, APP_INITIAL_STATE } from '@kleiolab/lib-redux';
import { GvFieldPageScope, SubfieldPageControllerService, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { GvPaginationObjectMock } from 'projects/__test__/data/auto-gen/api-responses/GvPaginationObjectMock';
import { DatNamespaceMock } from 'projects/__test__/data/auto-gen/gvDB/DatNamespaceMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { SysConfigValueMock } from 'projects/__test__/data/auto-gen/gvDB/SysConfigValueMock';
import { WarEntityPreviewMock } from 'projects/__test__/data/auto-gen/gvDB/WarEntityPreviewMock';
import { PROFILE_12_BIOGRAPHICAL_BA_2022_02_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-12-biographical-ba-2022-02-09';
import { PROFILE_16_INTERACTIONS_S_2022_02_09 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-16-interactions-s-2022-02-09';
import { PROFILE_20_PHYSICAL_MAN_MA_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-20-physical-man-ma-2022-01-18';
import { PROFILE_5_GEOVISTORY_BASI_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import { PROFILE_8_MARITIME_HISTOR_2022_01_18 } from 'projects/__test__/data/auto-gen/ontome-profiles/profile-8-maritime-histor-2022-01-18';
import { FieldMock } from 'projects/__test__/data/FieldMock';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { StatementWithTargetMock } from 'projects/__test__/data/StatementWithTargetMock';
import { createCrmAsGvPositiveSchema } from 'projects/__test__/helpers/transformers';
import { MockPaginationControllerForSandboxes } from 'projects/__test__/mock-services/MockPaginationControllerForSandboxes';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { BaseModule } from '../../../modules/base/base.module';
import { InitStateModule } from '../../misc/init-state/init-state.module';
import { ViewFieldItemComponent } from './view-field-item.component';

const inProjectScope: GvFieldPageScope = { inProject: IAppStateMock.stateProject1.activeProject.pk_project }
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

const warEntityPreviews = [
  WarEntityPreviewMock.PERSON_1,
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
    return new BehaviorSubject(preview).pipe(filter(x => !!x), delay(1300))
  }
}
const common = {
  scope: inProjectScope,
  showOntoInfo$: new BehaviorSubject(false),
  addMode$: new BehaviorSubject(false),
  allowMultiSelect: false,
  checked: false
}
const fields = [
  {
    ...common,
    item: StatementWithTargetMock.appeTeEnHasAppeVtWithTarget,
    field: FieldMock.appeHasAppeString,
  },
  {
    ...common,
    item: StatementWithTargetMock.shipVoyageAtSomeTimeWithin,
    field: FieldMock.shipVoyageAtSomeTimeWithin,
  },
  {
    ...common,
    item: StatementWithTargetMock.unionHasPartner,
    field: FieldMock.unionHasPartner,
  },
  {
    ...common,
    item: StatementWithTargetMock.person1HasAppeTeEnWithTarget,
    field: FieldMock.personHasAppeTeEn,
  },
  {
    ...common,
    item: StatementWithTargetMock.madridsPresenceWasAtPlace,
    field: FieldMock.presenceWasAtPlace,
  }
]


export default sandboxOf(ViewFieldItemComponent, {
  declareComponent: false,
  imports: [
    InitStateModule,
    BaseModule,
  ],
  providers: [
    { provide: APP_INITIAL_STATE, useValue: IAppStateMock.stateProject1 },
    { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes },
    { provide: ActiveProjectPipesService, useClass: ActiveProjectPipesServiceMock },

  ]
})
  .add('All Types', {
    context: {
      fields,
      widths: [300, 600, 900],
      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
    },
    template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
    <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
    <div style="padding-left:20px">
      <div *ngFor="let w of widths" >
        <p>Witdh {{w}}px</p>
        <div *ngFor="let f of fields" style="display:block; width: {{w}}px;">
          <gv-view-field-item [item]="f.item"
          [field]="f.field"
          [scope]="f.scope"
          [showOntoInfo$]="f.showOntoInfo$"
          [addMode$]="f.addMode$"
          [allowMultiSelect]="f.allowMultiSelect"
          [checked]="f.checked"
          ></gv-view-field-item>
          <mat-divider></mat-divider>
        </div>
     </div>
    </div>
  `
  })
  .add('Value', {
    context: {
      item: StatementWithTargetMock.appeTeEnHasAppeVtWithTarget,
      field: FieldMock.appeHasAppeString,
      scope: inProjectScope,
      readmode$: new BehaviorSubject(false),
      showOntoInfo$: new BehaviorSubject(false),
      addMode$: new BehaviorSubject(false),
      allowMultiSelect: false,
      checked: false,

      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
    },
    template: `
      <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
      <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      <div style="padding-left:20px">
        <br><br>
        <p>Witdh 300px</p>
        <gv-view-field-item  style="display:block; width: 300px;"
        [item]="item"
        [field]="field"
        [scope]="scope"

        [showOntoInfo$]="showOntoInfo$"
        [addMode$]="addMode$"
        [allowMultiSelect]="allowMultiSelect"
        [checked]="checked"
        ></gv-view-field-item>
        <br><br>
        <p>Witdh 600px</p>
        <gv-view-field-item  style="display:block; width: 600px;"
        [item]="item"
        [field]="field"
        [scope]="scope"

        [showOntoInfo$]="showOntoInfo$"
        [addMode$]="addMode$"
        [allowMultiSelect]="allowMultiSelect"
        [checked]="checked"
        ></gv-view-field-item>
        <br><br>
        <p>Witdh 1200px</p>
        <gv-view-field-item  style="display:block; width: 1200px;"
        [item]="item"
        [field]="field"
        [scope]="scope"

        [showOntoInfo$]="showOntoInfo$"
        [addMode$]="addMode$"
        [allowMultiSelect]="allowMultiSelect"
        [checked]="checked"
        ></gv-view-field-item>
      </div>
    `
  })
  .add('Time Primitive', {
    context: {
      item: StatementWithTargetMock.shipVoyageAtSomeTimeWithin,
      field: FieldMock.shipVoyageAtSomeTimeWithin,
      scope: inProjectScope,
      readmode$: new BehaviorSubject(false),
      showOntoInfo$: new BehaviorSubject(false),
      addMode$: new BehaviorSubject(false),
      allowMultiSelect: false,
      checked: false,

      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
    },
    template: `
      <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
      <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      <div style="padding-left:20px">
        <br><br>
        <p>Witdh 300px</p>
        <gv-view-field-item  style="display:block; width: 300px;"
        [item]="item"
        [field]="field"
        [scope]="scope"

        [showOntoInfo$]="showOntoInfo$"
        [addMode$]="addMode$"
        [allowMultiSelect]="allowMultiSelect"
        [checked]="checked"
        ></gv-view-field-item>
        <br><br>
        <p>Witdh 600px</p>
        <gv-view-field-item  style="display:block; width: 600px;"
        [item]="item"
        [field]="field"
        [scope]="scope"

        [showOntoInfo$]="showOntoInfo$"
        [addMode$]="addMode$"
        [allowMultiSelect]="allowMultiSelect"
        [checked]="checked"
        ></gv-view-field-item>
        <br><br>
        <p>Witdh 1200px</p>
        <gv-view-field-item  style="display:block; width: 1200px;"
        [item]="item"
        [field]="field"
        [scope]="scope"

        [showOntoInfo$]="showOntoInfo$"
        [addMode$]="addMode$"
        [allowMultiSelect]="allowMultiSelect"
        [checked]="checked"
        ></gv-view-field-item>
      </div>
    `
  })
  .add('Entity Preview', {
    context: {
      item: StatementWithTargetMock.unionHasPartner,
      field: FieldMock.unionHasPartner,
      scope: inProjectScope,
      readmode$: new BehaviorSubject(false),
      showOntoInfo$: new BehaviorSubject(false),
      addMode$: new BehaviorSubject(false),
      allowMultiSelect: false,
      checked: false,

      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
    },
    template: `
      <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
      <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      <div style="padding-left:20px">
        <br><br>
        <p>Witdh 300px</p>
        <gv-view-field-item  style="display:block; width: 300px;"
        [item]="item"
        [field]="field"
        [scope]="scope"

        [showOntoInfo$]="showOntoInfo$"
        [addMode$]="addMode$"
        [allowMultiSelect]="allowMultiSelect"
        [checked]="checked"
        ></gv-view-field-item>
        <br><br>
        <p>Witdh 600px</p>
        <gv-view-field-item  style="display:block; width: 600px;"
        [item]="item"
        [field]="field"
        [scope]="scope"

        [showOntoInfo$]="showOntoInfo$"
        [addMode$]="addMode$"
        [allowMultiSelect]="allowMultiSelect"
        [checked]="checked"
        ></gv-view-field-item>
        <br><br>
        <p>Witdh 1200px</p>
        <gv-view-field-item  style="display:block; width: 1200px;"
        [item]="item"
        [field]="field"
        [scope]="scope"

        [showOntoInfo$]="showOntoInfo$"
        [addMode$]="addMode$"
        [allowMultiSelect]="allowMultiSelect"
        [checked]="checked"
        ></gv-view-field-item>
      </div>
    `
  })
  .add('Entity Nested', {
    context: {
      item: StatementWithTargetMock.person1HasAppeTeEnWithTarget,
      field: FieldMock.personHasAppeTeEn,
      scope: inProjectScope,
      readmode$: new BehaviorSubject(false),
      showOntoInfo$: new BehaviorSubject(false),
      addMode$: new BehaviorSubject(false),
      allowMultiSelect: false,
      checked: false,

      initState: IAppStateMock.stateProject1,
      schemaObjects: initialSchemaObects,
      paginationObjects: [
        GvPaginationObjectMock.appeTeEnHasAppeVt,
        GvPaginationObjectMock.appeTeEnUsedInLanguage,
        GvPaginationObjectMock.appeTeEnIsAppeOfPerson
      ],
    },
    template: `
      <gv-init-state [initState]="initState" [paginationObjects]="paginationObjects" [schemaObjects]="schemaObjects"></gv-init-state>
      <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      <div style="padding-left:20px">
        <br><br>
        <p>Witdh 300px</p>
        <gv-view-field-item  style="display:block; width: 300px;"
        [item]="item"
        [field]="field"
        [scope]="scope"

        [showOntoInfo$]="showOntoInfo$"
        [addMode$]="addMode$"
        [allowMultiSelect]="allowMultiSelect"
        [checked]="checked"
        ></gv-view-field-item>
        <br><br>
        <p>Witdh 600px</p>
        <gv-view-field-item  style="display:block; width: 600px;"
        [item]="item"
        [field]="field"
        [scope]="scope"

        [showOntoInfo$]="showOntoInfo$"
        [addMode$]="addMode$"
        [allowMultiSelect]="allowMultiSelect"
        [checked]="checked"
        ></gv-view-field-item>
        <br><br>
        <p>Witdh 1200px</p>
        <gv-view-field-item  style="display:block; width: 1200px;"
        [item]="item"
        [field]="field"
        [scope]="scope"

        [showOntoInfo$]="showOntoInfo$"
        [addMode$]="addMode$"
        [allowMultiSelect]="allowMultiSelect"
        [checked]="checked"
        ></gv-view-field-item>
      </div>
    `
  })

