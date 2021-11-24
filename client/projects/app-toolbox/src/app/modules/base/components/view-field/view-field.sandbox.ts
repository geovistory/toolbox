import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Field } from '@kleiolab/lib-queries';
import { APP_INITIAL_STATE } from '@kleiolab/lib-redux';
import { GvFieldPageScope, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { FieldMock } from 'projects/__test__/data/FieldMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { MockPaginationControllerForSandboxes } from 'projects/__test__/mock-services/MockPaginationControllerForSandboxes';
import { BehaviorSubject } from 'rxjs';
import { BaseModule } from '../../base.module';
import { ViewFieldComponent } from './view-field.component';

const inProjectScope: GvFieldPageScope = { inProject: IAppStateMock.stateProject1.activeProject.pk_project }
const dataSource = new MatTreeNestedDataSource<Field>()
dataSource.data = [FieldMock.manifestationSingletonHasDefinition];

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
      readonly$: new BehaviorSubject(false),
      selectedIndex: 0,
      dataSource: dataSource
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">
       <mat-tab-group [selectedIndex]="selectedIndex">
        <mat-tab label="First">
          <gv-view-field [field]="field" [scope]="scope" [showOntoInfo$]="showOntoInfo$"
          [readonly$]="readonly$" [source]="source"></gv-view-field>
        </mat-tab>
        <mat-tab label="Second"> Content 2 </mat-tab>
        <mat-tab label="Third"> Content 3 </mat-tab>
      </mat-tab-group>

      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
        <button (click)="readonly$.next(!readonly$.value)">toggle readonly</button>
        <button (click)="selectedIndex=1">tab 2</button>
        <button (click)="selectedIndex=0">tab 1</button>

      </div>
    </div>
    `
  })
