import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StateModule } from '@kleiolab/lib-redux';
import { INITIAL_STATE } from '@ngrx/store';
import {
  applicationConfig,
  argsToTemplate,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { VisualizationTableComponent } from './visualization-table.component';

import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { AnalysisService, AnalysisTableCell, AnalysisTableRequest, AnalysisTableResponse } from '@kleiolab/lib-sdk-lb4';
import { delay, Observable, of } from 'rxjs';
import { MockStateFactory } from './../../../../../../.storybook/MockStateFactory';
import { ActiveProjectService } from './../../../../services/active-project.service';

const meta: Meta<VisualizationTableComponent> = {
  component: VisualizationTableComponent,
  title: 'Analysis/Visualizations/TableComponent',
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        importProvidersFrom(StateModule, MatDialogModule),
        ActiveProjectService,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<VisualizationTableComponent>;

// Setup the initial state of the story Basic
const stateBasic = new MockStateFactory();
stateBasic.setActiveProject(1);
class MockAnalysisService {
  analysisControllerTableRun(analysisTableRequest?: AnalysisTableRequest): Observable<AnalysisTableResponse> {
    const def = analysisTableRequest.analysisDefinition.queryDefinition

    const rows: { [key: string]: AnalysisTableCell; }[] = []

    const full_count = 5
    const max = def.offset + def.limit > full_count ? full_count : def.limit + def.offset;

    for (let i = def.offset ?? 0; i < max; i++) {
      const row: { [key: string]: AnalysisTableCell; } = {}
      def.columns.forEach(col => {
        row[col.id] = { entityLabel: 'col ' + col.label + ' - line ' + i }
      })
      rows.push(row)
    }

    const res: AnalysisTableResponse = {
      rows,
      full_count
    }
    console.log(this.constructor.name, {
      offset: def.offset, limit: def.limit,
      reslength: res.rows.length,
      result: res
    })
    return of(res).pipe(delay(200))
  }

}

export const Basic: Story = {
  args: {
    definition$: of({
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
    })
  },
  render: (args) => ({
    props: args,
    template: `<gv-visualization-table style="height:400px;" ${argsToTemplate(args)}></gv-visualization-table>`
  }),
  decorators: [
    applicationConfig({
      providers: [
        { provide: INITIAL_STATE, useValue: stateBasic.state },
        { provide: AnalysisService, useClass: MockAnalysisService }
      ],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.findByText(/line 0/i)).toBeTruthy();
  },
};



export const TwoColumns: Story = {
  args: {
    definition$: of({
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
      },{
        id: 'col_1',
        label: 'Place of birth'
      }]
    })
  },
  render: (args) => ({
    props: args,
    template: `<gv-visualization-table style="height:600px" ${argsToTemplate(args)}></gv-visualization-table>`
  }),
  decorators: [
    applicationConfig({
      providers: [
        { provide: INITIAL_STATE, useValue: stateBasic.state },
        { provide: AnalysisService, useClass: MockAnalysisService }
      ],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.findByText(/line 0/i)).toBeTruthy();
  },
};
