import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Field } from '@kleiolab/lib-queries';
import { APP_INITIAL_STATE } from '@kleiolab/lib-redux';
import { GvFieldPageScope, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { InfResourceMock } from 'projects/__test__/data/auto-gen/gvDB/InfResourceMock';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { SubfieldMock } from 'projects/__test__/data/SubfieldMock';
import { MockPaginationControllerForSandboxes } from 'projects/__test__/mock-services/MockPaginationControllerForSandboxes';
import { BehaviorSubject } from 'rxjs';
import { BaseModule } from '../../base.module';
import { FieldComponent } from './field.component';

const inProjectScope: GvFieldPageScope = { inProject: IAppStateMock.stateProject1.activeProject.pk_project }
const dataSource = new MatTreeNestedDataSource<Field>()
dataSource.data = [SubfieldMock.manifestationSingletonHasDefinition];

export default sandboxOf(FieldComponent, {
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
      field: SubfieldMock.manifestationSingletonHasDefinition,
      source: { fkInfo: InfResourceMock.MANIF_SINGLETON_THE_MURDERER.pk_entity },
      showOntoInfo$: new BehaviorSubject(false),
      readonly$: new BehaviorSubject(false),
      treeControl: new NestedTreeControl<Field>(node => ([])),
      dataSource: dataSource
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
       <div style="width:300px;height:400px" class="d-flex mr-4">

          <mat-tree [dataSource]="dataSource" [treeControl]="treeControl" class="gv-properties-tree">
            <mat-nested-tree-node *matTreeNodeDef="let node">

              <gv-field #field [fieldDefinition]="node" [treeControl]="treeControl" [showOntoInfo$]="showOntoInfo$"
                [readonly$]="readonly$" [source]="source"></gv-field>

            </mat-nested-tree-node>
          </mat-tree>

      </div>
      <div>
        <button (click)="showOntoInfo$.next(!showOntoInfo$.value)">toggle onto info</button>
        <button (click)="readonly$.next(!readonly$.value)">toggle readonly</button>
      </div>
    </div>
    `
  })
