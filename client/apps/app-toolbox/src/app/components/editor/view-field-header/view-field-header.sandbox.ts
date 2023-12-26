import { APP_INITIAL_STATE } from '@kleiolab/lib-redux';
import { GvFieldPageScope, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from '../../../shared/components/init-state/init-state.module';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { MockPaginationControllerForSandboxes } from 'projects/__test__/mock-services/MockPaginationControllerForSandboxes';
import { BehaviorSubject, of } from 'rxjs';
import { BaseModule } from '../../../modules/base/base.module';
import { ViewFieldHeaderComponent } from './view-field-header.component';

const inProjectScope: GvFieldPageScope = { inProject: IAppStateMock.stateProject1.activeProject.pk_project }

const context = {
  body: { showBody$: new BehaviorSubject(true) },
  itemsCount$: new BehaviorSubject(3),
  readmode$: new BehaviorSubject(false),
  showOntoInfo$: new BehaviorSubject(false),
  ontoInfoUrl: 'https://ontome.org/property/1',
  ontoInfoLabel: 'crm:P12',
  fieldLabel: 'has a very nice long property label',
  required: true,
  disableToggle: false,
  hideItemsCount: false,
  removedFromProfiles: false,
  itemsMax: -1,
  targetClassLabels: ['Person', 'Group', 'Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1', 'Class 1'],
  showAddButton$: new BehaviorSubject(true),
  addClick: () => alert('add button clicked'),
  widths: [300, 500, 700, 900, 1200],
  of: of
}

const context2 = { ...context, displayMode: 'tree' }

export default sandboxOf(ViewFieldHeaderComponent, {
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
  .add('ViewFieldHeader', {
    context,
    template: `
    <div style="padding:40px; display:flex; flex-direction:column; justify-content:flex-start" class="mat-bg-grey-500">
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
      </div>
      <ng-container *ngFor="let width of widths">

        <div style="width:{{width}}px;height:80px" class="d-flex mr-4">
          <gv-view-field-header class="mat-bg-grey-50" [body]=body [itemsCount$]=itemsCount$ [showAddButton$]=showAddButton$
           [showOntoInfo$]=showOntoInfo$ [ontoInfoUrl]=ontoInfoUrl
          [ontoInfoLabel]=ontoInfoLabel [fieldLabel]=fieldLabel
          [required]=required [disableToggle]=disableToggle
          [hideItemsCount]=hideItemsCount [removedFromProfiles]=removedFromProfiles
          [itemsMax]=itemsMax [targetClassLabels]=targetClassLabels (add)="addClick()">
          </gv-view-field-header>
        </div>
      </ng-container>


    </div>
    `
  })
  .add('ViewFieldHeader Tree', {
    context: context2,
    template: `
    <div style="padding:40px; display:flex; flex-direction:column; justify-content:flex-start" class="mat-bg-grey-500">
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
        <button (click)="readmode$.next(!readmode$.value)">toggle readonly</button>
      </div>
      <h2>Indentation 0</h2>
      <div style="width:500px;height:80px" class="d-flex mr-4">
        <gv-view-field-header class="mat-bg-grey-50" [body]=body [itemsCount$]=of(0) [showAddButton$]=showAddButton$
         [showOntoInfo$]=showOntoInfo$ [ontoInfoUrl]=ontoInfoUrl
        [ontoInfoLabel]=ontoInfoLabel [fieldLabel]=fieldLabel
        [required]=required [disableToggle]=disableToggle
        [hideItemsCount]=hideItemsCount [removedFromProfiles]=removedFromProfiles
        [itemsMax]=itemsMax [targetClassLabels]=targetClassLabels [displayMode]=displayMode (add)="addClick()">
        </gv-view-field-header>
      </div>
      <h2>Indentation 1</h2>
      <div style="width:500px;height:80px" class="d-flex mr-4">
        <gv-view-field-header class="mat-bg-grey-50" [body]=body [itemsCount$]=itemsCount$ [showAddButton$]=showAddButton$
         [showOntoInfo$]=showOntoInfo$ [ontoInfoUrl]=ontoInfoUrl
        [ontoInfoLabel]=ontoInfoLabel [fieldLabel]=fieldLabel
        [required]=required [disableToggle]=disableToggle
        [hideItemsCount]=hideItemsCount [removedFromProfiles]=removedFromProfiles
        [itemsMax]=itemsMax [targetClassLabels]=targetClassLabels [displayMode]=displayMode [indentation]=1 (add)="addClick()">
        </gv-view-field-header>
      </div>
      <h2>Indentation 2</h2>
      <div style="width:500px;height:80px" class="d-flex mr-4">
        <gv-view-field-header class="mat-bg-grey-50" [body]=body [itemsCount$]=itemsCount$ [showAddButton$]=showAddButton$
         [showOntoInfo$]=showOntoInfo$ [ontoInfoUrl]=ontoInfoUrl
        [ontoInfoLabel]=ontoInfoLabel [fieldLabel]=fieldLabel
        [required]=required [disableToggle]=disableToggle
        [hideItemsCount]=hideItemsCount [removedFromProfiles]=removedFromProfiles
        [itemsMax]=itemsMax [targetClassLabels]=targetClassLabels [displayMode]=displayMode [indentation]=2 (add)="addClick()">
        </gv-view-field-header>
      </div>

    </div>
    `
  })
