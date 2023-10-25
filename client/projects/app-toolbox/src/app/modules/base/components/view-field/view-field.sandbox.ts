import { APP_INITIAL_STATE } from '@kleiolab/lib-redux/public-api';
import { GvFieldPageScope, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { FieldMock } from 'projects/__test__/data/FieldMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { MockPaginationControllerForSandboxes } from 'projects/__test__/mock-services/MockPaginationControllerForSandboxes';
import { BehaviorSubject } from 'rxjs';
import { BaseModule } from '../../base.module';
import { VIEW_FIELD_ITEM_TYPE } from '../view-field-item/VIEW_FIELD_ITEM_TYPE';
import { ViewFieldComponent } from './view-field.component';

const inProjectScope: GvFieldPageScope = { inProject: IAppStateMock.stateProject1.activeProject.pk_project }



export default sandboxOf(ViewFieldComponent, {
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
  .add('Field | type: LangStringVT ', {
    context: {
      field: FieldMock.manifestationSingletonHasDefinition,
      source: { fkInfo: InfResourceMock.MANIF_SINGLETON_THE_MURDERER.pk_entity },
      scope: inProjectScope,
      showOntoInfo$: new BehaviorSubject(false),
      readmode$: new BehaviorSubject(false),
      selectedIndex: 0,
    },
    template: `
    <div class="mat-bg-grey-500" style="padding: 40px">
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
        <button (click)="readmode$.next(!readmode$.value)">toggle readonly</button>
        <button (click)="selectedIndex=1">tab 2</button>
        <button (click)="selectedIndex=0">tab 1</button>

      </div>
      <div class="d-flex d-flex-direction-row justify-content-center mt-5">
        <div style="width:300px;height:400px" class="d-flex mr-4">
          <mat-tab-group [selectedIndex]="selectedIndex">
            <mat-tab label="First">
              <gv-view-field [field]="field" [scope]="scope" [showOntoInfo$]="showOntoInfo$"
               [source]="source"></gv-view-field>
            </mat-tab>
            <mat-tab label="Second"> Content 2 </mat-tab>
            <mat-tab label="Third"> Content 3 </mat-tab>
          </mat-tab-group>

        </div>

        <hr>

        <div style="width:600px;height:400px" class="d-flex mr-4">
            <gv-view-field [field]="field" [scope]="scope" [showOntoInfo$]="showOntoInfo$"
             [source]="source"></gv-view-field>
        </div>


      </div>
    </div>
    `
  })

  .add('Field | type: typeItem ', {
    context: {
      field: FieldMock.placeHasType,
      source: { fkInfo: InfResourceMock.GEO_PLACE_MADRID.pk_entity },
      scope: inProjectScope,
      showOntoInfo$: new BehaviorSubject(false),
      readmode$: new BehaviorSubject(false),
      selectedIndex: 0,
    },
    template: `
   <div class="mat-bg-grey-500" style="padding: 40px">
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
        <button (click)="readmode$.next(!readmode$.value)">toggle readonly</button>
        <button (click)="selectedIndex=1">tab 2</button>
        <button (click)="selectedIndex=0">tab 1</button>
      </div>
      <br>

      <div style="width:600px;height:400px" class="d-flex mr-4">
          <gv-view-field [field]="field" [scope]="scope" [showOntoInfo$]="showOntoInfo$"
           [source]="source"></gv-view-field>
      </div>
   </div>
    `
  })
  .add('Field | type: ValueVersion ', {
    context: {
      field: FieldMock.manifestationSingletonHasDefinition,
      source: { fkInfo: InfResourceMock.MANIF_SINGLETON_THE_MURDERER.pk_entity },
      scope: inProjectScope,
      showOntoInfo$: new BehaviorSubject(false),
      readmode$: new BehaviorSubject(false),
      selectedIndex: 0,
    },
    providers: [
      { provide: VIEW_FIELD_ITEM_TYPE, useValue: 'valueVersion' },
    ],
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
       <mat-tab-group [selectedIndex]="selectedIndex">
        <mat-tab label="First">
          <gv-view-field [field]="field" [scope]="scope" [showOntoInfo$]="showOntoInfo$"
           [source]="source"></gv-view-field>
        </mat-tab>
        <mat-tab label="Second"> Content 2 </mat-tab>
        <mat-tab label="Third"> Content 3 </mat-tab>
      </mat-tab-group>

      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
        <button (click)="readmode$.next(!readmode$.value)">toggle readonly</button>
        <button (click)="selectedIndex=1">tab 2</button>
        <button (click)="selectedIndex=0">tab 1</button>

      </div>
    </div>
    `
  })
