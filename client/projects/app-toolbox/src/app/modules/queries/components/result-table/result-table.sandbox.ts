import { AnalysisService, QueryDefinition } from '@kleiolab/lib-sdk-lb4';
import { sandboxOf } from 'angular-playground';
import { GvAnalysisService } from 'projects/app-toolbox/src/app/modules/analysis/services/analysis.service';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { MockAnalysisService } from 'projects/__test__/mock-services/MockAnalysisService';
import { BehaviorSubject } from 'rxjs';
import { QueriesModule } from '../../queries.module';
import { ResultTableComponent } from './result-table.component';


const def: QueryDefinition = {
  filter: {
    'data': {
      'classes': [
        21
      ],
      'types': []
    },
    'children': [
      {
        'data': {
          'operator': 'AND',
          'subgroup': 'property'
        },
        'children': [
          {
            'data': {
              'operator': 'IS',
              'outgoingProperties': [],
              'ingoingProperties': [
                1192
              ]
            },
            children: []
          }
        ]
      }
    ]
  },
  columns: [{
    defaultType: 'entity_preview',
    ofRootTable: true,
    id: 'col_0',
    label: 'Entity Preview'
  }]
}

export default sandboxOf(ResultTableComponent, {
  declareComponent: false,
  imports: [
    QueriesModule,
    InitStateModule
  ],
  providers: [
    { provide: AnalysisService, useClass: MockAnalysisService }
  ]
})
  .add('ResultTableComponent | VirtualInfinitScroll ', {
    providers: [
      GvAnalysisService
    ],
    context: {
      queryDefinition$: new BehaviorSubject(def),
      initState: IAppStateMock.stateProject1,
    },
    styles: [],
    template: `
        <gv-init-state [initState]="initState" >
        </gv-init-state>
        <gv-result-table style="
        width: 600px;
        height: 600px;
        display: block;
        margin: 30px;
        border:1px dashed red;" [definition$]="queryDefinition$"></gv-result-table>
        `
  })
  .add('ResultTableComponent | VirtualInfinitScroll flex height', {
    providers: [
      GvAnalysisService
    ],
    context: {
      initState: IAppStateMock.stateProject1,
      queryDefinition$: new BehaviorSubject(def),
    },
    styles: [],
    template: `
        <gv-init-state [initState]="initState" ></gv-init-state>
        <div class="gv-full">
          <gv-result-table class="gv-flex-fh" [definition$]="queryDefinition$"></gv-result-table>
        </div>
        `
  })
