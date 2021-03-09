import { APP_INITIAL_STATE } from '@kleiolab/lib-redux';
import { GvSubfieldPageScope, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { InfPersistentItemMock } from 'projects/__test__/data/auto-gen/gvDB/InfPersistentItemMock';
import { InfTemporalEntityMock } from 'projects/__test__/data/auto-gen/gvDB/InfTemporalEntityMock';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { SubfieldMock } from 'projects/__test__/data/SubfieldMock';
import { MockPaginationControllerForSandboxes } from 'projects/__test__/mock-services/MockPaginationControllerForSandboxes';
import { BehaviorSubject } from 'rxjs';
import { BaseModule } from '../../base.module';
import { SubfieldComponent } from './subfield.component';

const inProjectScope: GvSubfieldPageScope = { inProject: IAppStateMock.stateProject1.activeProject.pk_project }

export default sandboxOf(SubfieldComponent, {
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
  .add('Subfield | type: AppellationVT ', {
    context: {
      subfield: SubfieldMock.appeHasAppeString,
      pkEntity: InfTemporalEntityMock.NAMING_1.pk_entity,
      showOntoInfo$: new BehaviorSubject(false),
      scope: inProjectScope
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-subfield
          [pkEntity]="pkEntity"
          [subfield]="subfield"
          [scope]="scope"
          [showOntoInfo$]="showOntoInfo$"
          ></gv-subfield>
      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      </div>
    </div>
    `
  })
  .add('Subfield | type: PlaceVT ', {
    context: {
      subfield: SubfieldMock.presenceWasAtPlace,
      pkEntity: InfTemporalEntityMock.MADRIDS_PRESENCE.pk_entity,
      showOntoInfo$: new BehaviorSubject(false),
      scope: inProjectScope
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-subfield
          [pkEntity]="pkEntity"
          [subfield]="subfield"
          [scope]="scope"
          [showOntoInfo$]="showOntoInfo$"
          ></gv-subfield>
      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      </div>
    </div>
    `
  })

  .add('Subfield | type: DimensionVT ', {
    context: {
      subfield: SubfieldMock.accountOfJourneyHasDuration,
      pkEntity: InfPersistentItemMock.ACCOUNT_OF_JOURNEY.pk_entity,
      showOntoInfo$: new BehaviorSubject(false),
      scope: inProjectScope
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-subfield
          [pkEntity]="pkEntity"
          [subfield]="subfield"
          [scope]="scope"
          [showOntoInfo$]="showOntoInfo$"
          ></gv-subfield>
      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      </div>
    </div>
    `
  })

  .add('Subfield | type: LangStringVT ', {
    context: {
      subfield: SubfieldMock.manifestationSingletonHasShortTitle,
      pkEntity: InfPersistentItemMock.MANIF_SINGLETON_THE_MURDERER.pk_entity,
      showOntoInfo$: new BehaviorSubject(false),
      addMode$: new BehaviorSubject(false),
      scope: inProjectScope
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-subfield #s
          [pkEntity]="pkEntity"
          [subfield]="subfield"
          [scope]="scope"
          [showOntoInfo$]="showOntoInfo$"
          [addMode$]="addMode$"
          ></gv-subfield>
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
  .add('Subfield | type: LanguageVT ', {
    context: {
      subfield: SubfieldMock.appeTeEnUsedInLanguage,
      pkEntity: InfTemporalEntityMock.NAMING_1.pk_entity,
      showOntoInfo$: new BehaviorSubject(false),
      scope: inProjectScope
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-subfield
          [pkEntity]="pkEntity"
          [subfield]="subfield"
          [scope]="scope"
          [showOntoInfo$]="showOntoInfo$"
          ></gv-subfield>
      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      </div>
    </div>
    `
  })
  .add('Subfield | type: EntityPreview ', {
    context: {
      subfield: SubfieldMock.appeTeEnIsAppeOfPerson,
      pkEntity: InfTemporalEntityMock.NAMING_1.pk_entity,
      showOntoInfo$: new BehaviorSubject(false),
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
          <gv-subfield
          [pkEntity]="pkEntity"
          [subfield]="subfield"
          [scope]="scope"
          [showOntoInfo$]="showOntoInfo$"
          ></gv-subfield>
      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      </div>
    </div>
    `
  })
  .add('Subfield | type: TemporalEntity ', {
    context: {
      subfield: SubfieldMock.personHasAppeTeEn,
      pkEntity: InfPersistentItemMock.PERSON_1.pk_entity,
      showOntoInfo$: new BehaviorSubject(false),
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
          <gv-subfield
          [pkEntity]="pkEntity"
          [subfield]="subfield"
          [scope]="scope"
          [showOntoInfo$]="showOntoInfo$"
          [addMode$]="addMode$"
          ></gv-subfield>
      </div>
    </div>
    `
  })

  .add('Subfield | type: TimeSpan', {
    context: {
      subfield: SubfieldMock.appeHasTimeSpan,
      pkEntity: InfTemporalEntityMock.NAMING_1.pk_entity,
      showOntoInfo$: new BehaviorSubject(false),
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
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-subfield
          [pkEntity]="pkEntity"
          [subfield]="subfield"
          [scope]="scope"
          [showOntoInfo$]="showOntoInfo$"
          ></gv-subfield>
      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      </div>
    </div>
    `
  })
  .add('Subfield | type: TimeSpan empty', {
    context: {
      subfield: SubfieldMock.appeHasTimeSpan,
      pkEntity: InfTemporalEntityMock.NAMING_2_STADT.pk_entity,
      showOntoInfo$: new BehaviorSubject(false),
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
       <div style="width:300px;height:400px" class="d-flex mr-4">
          <gv-subfield
          [pkEntity]="pkEntity"
          [subfield]="subfield"
          [scope]="scope"
          [showOntoInfo$]="showOntoInfo$"
          ></gv-subfield>
      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      </div>
    </div>
    `
  })
