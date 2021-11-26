import { APP_INITIAL_STATE } from '@kleiolab/lib-redux';
import { GvFieldPageScope, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { FieldMock } from 'projects/__test__/data/FieldMock';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { MockPaginationControllerForSandboxes } from 'projects/__test__/mock-services/MockPaginationControllerForSandboxes';
import { BehaviorSubject } from 'rxjs';
import { BaseModule } from '../../base.module';
import { ViewFieldBodyComponent } from './view-field-body.component';

const inProjectScope: GvFieldPageScope = { inProject: IAppStateMock.stateProject1.activeProject.pk_project }

export default sandboxOf(ViewFieldBodyComponent, {
  declareComponent: false,
  imports: [
    InitStateModule,
    BaseModule,
  ],
  providers: [
    { provide: APP_INITIAL_STATE, useValue: IAppStateMock.stateProject1 },
    { provide: SubfieldPageControllerService, useClass: MockPaginationControllerForSandboxes }
  ]
})
  .add('ViewFieldBody | type: AppellationVT ', {
    context: {
      field: FieldMock.appeHasAppeString,
      source: { fkInfo: InfResourceMock.NAMING_1.pk_entity },
      showOntoInfo$: new BehaviorSubject(false),
      readonly$: new BehaviorSubject(false),
      scope: inProjectScope
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-view-field-body
          [source]="source"
          [field]="field"
          [scope]="scope"
          [readonly$]="readonly$"
          [showOntoInfo$]="showOntoInfo$"
          ></gv-view-field-body>
      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      </div>
    </div>
    `
  })
  .add('ViewFieldBody | type: PlaceVT ', {
    context: {
      field: FieldMock.presenceWasAtPlace,
      source: { fkInfo: InfResourceMock.MADRIDS_PRESENCE.pk_entity },
      showOntoInfo$: new BehaviorSubject(false),
      readonly$: new BehaviorSubject(false),
      scope: inProjectScope
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-view-field-body
          [source]="source"
          [field]="field"
          [scope]="scope"
          [readonly$]="readonly$"
          [showOntoInfo$]="showOntoInfo$"
          ></gv-view-field-body>
      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      </div>
    </div>
    `
  })

  .add('ViewFieldBody | type: DimensionVT ', {
    context: {
      field: FieldMock.accountOfJourneyHasDuration,
      source: { fkInfo: InfResourceMock.ACCOUNT_OF_JOURNEY.pk_entity },
      showOntoInfo$: new BehaviorSubject(false),
      readonly$: new BehaviorSubject(false),
      scope: inProjectScope
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-view-field-body
          [source]="source"
          [field]="field"
          [scope]="scope"
          [readonly$]="readonly$"
          [showOntoInfo$]="showOntoInfo$"
          ></gv-view-field-body>
      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      </div>
    </div>
    `
  })

  .add('ViewFieldBody | type: LangStringVT ', {
    context: {
      field: FieldMock.manifestationSingletonHasShortTitle,
      source: { fkInfo: InfResourceMock.MANIF_SINGLETON_THE_MURDERER.pk_entity },
      showOntoInfo$: new BehaviorSubject(false),
      readonly$: new BehaviorSubject(false),
      addMode$: new BehaviorSubject(false),
      scope: inProjectScope
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-view-field-body #s
          [source]="source"
          [field]="field"
          [scope]="scope"
          [readonly$]="readonly$"
          [showOntoInfo$]="showOntoInfo$"
          [addMode$]="addMode$"
          ></gv-view-field-body>
      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
        <button (click)="addMode$.next(!addMode$.value)">toggle add mode</button>
        <pre>
          {{s.selected|json:2}}
        </pre>
      </div>
    </div>
    `
  })
  .add('ViewFieldBody | type: LanguageVT ', {
    context: {
      field: FieldMock.appeTeEnUsedInLanguage,
      source: { fkInfo: InfResourceMock.NAMING_1.pk_entity },
      showOntoInfo$: new BehaviorSubject(false),
      readonly$: new BehaviorSubject(false),
      scope: inProjectScope
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-view-field-body
          [source]="source"
          [field]="field"
          [scope]="scope"
          [readonly$]="readonly$"
          [showOntoInfo$]="showOntoInfo$"
          ></gv-view-field-body>
      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      </div>
    </div>
    `
  })
  .add('ViewFieldBody | type: EntityPreview ', {
    context: {
      field: FieldMock.appeTeEnIsAppeOfPerson,
      source: { fkInfo: InfResourceMock.NAMING_1.pk_entity },
      showOntoInfo$: new BehaviorSubject(false),
      readonly$: new BehaviorSubject(false),
      scope: inProjectScope,
      // schemaObjects: [
      //   GvSchemaObjectMock.basicClassesAndProperties,
      //   GvSchemaObjectMock.project1,
      //   GvSchemaObjectMock.sysConfig,
      // ]
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-view-field-body
          [source]="source"
          [field]="field"
          [scope]="scope"
          [readonly$]="readonly$"
          [showOntoInfo$]="showOntoInfo$"
          ></gv-view-field-body>
      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      </div>
    </div>
    `
  })
  .add('ViewFieldBody | type: TemporalEntity ', {
    context: {
      field: FieldMock.personHasAppeTeEn,
      source: { fkInfo: InfResourceMock.PERSON_1.pk_entity },
      showOntoInfo$: new BehaviorSubject(false),
      readonly$: new BehaviorSubject(false),
      addMode$: new BehaviorSubject(false),
      scope: inProjectScope,
      schemaObjects: [
        GvSchemaObjectMock.basicClassesAndProperties,
        GvSchemaObjectMock.project1,
        GvSchemaObjectMock.sysConfig,
      ]
    },
    template: `
    <gv-init-state [schemaObjects]="schemaObjects"></gv-init-state>
    <div class="d-flex justify-content-center mt-5">
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
        <button (click)="addMode$.next(!addMode$.value)">toggle add mode</button>
      </div>
       <div style="width:1200px;height:400px; border: 1px dashed pink;" class="d-flex mr-4 p-1">
          <gv-view-field-body
          [source]="source"
          [field]="field"
          [scope]="scope"
          [readonly$]="readonly$"
          [showOntoInfo$]="showOntoInfo$"
          [addMode$]="addMode$"
          ></gv-view-field-body>
      </div>
    </div>
    `
  })

  // .add('ViewFieldBody | type: TimeSpan', {
  //   context: {
  //     field: FieldMock.appeHasTimeSpan,
  //     source: { fkInfo: InfResourceMock.NAMING_1.pk_entity },
  //     showOntoInfo$: new BehaviorSubject(false),
  //     scope: inProjectScope,
  //     schemaObjects: [
  //       GvSchemaObjectMock.basicClassesAndProperties,
  //       GvSchemaObjectMock.project1,
  //       GvSchemaObjectMock.sysConfig,
  //     ]
  //   },
  //   template: `
  //   <gv-init-state [schemaObjects]="schemaObjects"></gv-init-state>
  //   <div class="d-flex justify-content-center mt-5">
  //      <div style="width:300px;height:400px" class="d-flex mr-4">
  //         <gv-view-field-body
  //         [source]="source"
  //         [field]="field"
  //         [scope]="scope"
  //         [readonly$]="readonly$"
  //         [showOntoInfo$]="showOntoInfo$"
  //         ></gv-view-field-body>
  //     </div>
  //     <div>
  //       <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
  //     </div>
  //   </div>
  //   `
  // })
  // .add('ViewFieldBody | type: TimeSpan empty', {
  //   context: {
  //     field: FieldMock.appeHasTimeSpan,
  //     source: { fkInfo: InfResourceMock.NAMING_2_STADT.pk_entity },
  //     showOntoInfo$: new BehaviorSubject(false),
  //     scope: inProjectScope,
  //     schemaObjects: [
  //       GvSchemaObjectMock.basicClassesAndProperties,
  //       GvSchemaObjectMock.project1,
  //       GvSchemaObjectMock.sysConfig,
  //     ]
  //   },
  //   template: `
  //   <gv-init-state [schemaObjects]="schemaObjects"></gv-init-state>
  //   <div class="d-flex justify-content-center mt-5">
  //      <div style="width:300px;height:400px" class="d-flex mr-4">
  //         <gv-view-field-body
  //         [source]="source"
  //         [field]="field"
  //         [scope]="scope"
  //         [readonly$]="readonly$"
  //         [showOntoInfo$]="showOntoInfo$"
  //         ></gv-view-field-body>
  //     </div>
  //     <div>
  //       <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
  //     </div>
  //   </div>
  //   `
  // })
