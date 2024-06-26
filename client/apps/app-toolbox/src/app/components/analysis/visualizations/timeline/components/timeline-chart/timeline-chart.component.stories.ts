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
import { TimelineChartComponent } from './timeline-chart.component';
import { births_40k, ship_voyages } from './timeline-chart.mock';

import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { AnalysisTimeChartResponse, ChartLinePoint } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject } from 'rxjs';
import { MockStateFactory } from './../../../../../../../../.storybook/MockStateFactory';
import { ActiveProjectService } from './../../../../../../services/active-project.service';

const meta: Meta<TimelineChartComponent> = {
  component: TimelineChartComponent,
  title: 'Analysis/Visualizations/TimelineChartComponent',
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
type Story = StoryObj<TimelineChartComponent>;

// Setup the initial state of the story Basic
const stateBasic = new MockStateFactory();

const data1$ = new BehaviorSubject<AnalysisTimeChartResponse>({
  activeLine: null,
  chartLines: [
    {
      label: 'Sample 1',
      linePoints: [{ 'x': 202762310400, 'y': 0, 'data': [] }, { 'x': 202762310400, 'y': 1, 'data': [150488] }, { 'x': 202782268799, 'y': 1, 'data': [150488] }, { 'x': 202782268799, 'y': 0, 'data': [] }, { 'x': 203178499200, 'y': 0, 'data': [] }, { 'x': 203178499200, 'y': 1, 'data': [150493] }, { 'x': 203202777599, 'y': 1, 'data': [150493] }, { 'x': 203202777599, 'y': 0, 'data': [] }]
    },
    {
      label: 'Sample 2',
      linePoints: [{ 'x': 199892620800, 'y': 0, 'data': [] }, { 'x': 199892620800, 'y': 1, 'data': [154860] }, { 'x': 199892707199, 'y': 1, 'data': [154860] }, { 'x': 199892707199, 'y': 0, 'data': [] }, { 'x': 203063846400, 'y': 0, 'data': [] }, { 'x': 203063846400, 'y': 1, 'data': [155827] }, { 'x': 203063932799, 'y': 1, 'data': [155827] }, { 'x': 203063932799, 'y': 0, 'data': [] }, { 'x': 205222464000, 'y': 0, 'data': [] }, { 'x': 205222464000, 'y': 1, 'data': [157700] }, { 'x': 205222550399, 'y': 1, 'data': [157700] }, { 'x': 205222550399, 'y': 0, 'data': [] }]
    }
  ]
})


export const LittleDataset: Story = {
  args: {
    data$: data1$,
    showInfoBtn: false,
    showInfoBox: true,
  },
  render: (args) => ({
    props: args,
    template: `
    <p style="width: 800px; height: 400px;">
      <gv-timeline-chart ${argsToTemplate(args)}></gv-timeline-chart>
    </p>
    `
  }),
  decorators: [
    applicationConfig({
      providers: [{ provide: INITIAL_STATE, useValue: stateBasic.state }],
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByText(/Mar 30, 1622/i);
    expect(el).toBeTruthy();
  },
};



const hugeLine: ChartLinePoint[] = JSON.parse(ship_voyages);
const data2$ = new BehaviorSubject<AnalysisTimeChartResponse>({
  activeLine: 0,
  chartLines: [
    {
      label: 'Ship Voyages',
      linePoints: hugeLine
    }
  ]
})
export const ShipVoyages9k: Story = {
  ...LittleDataset,
  args: {
    ...LittleDataset.args,
    data$: data2$
  },
  play: undefined
};


const births: ChartLinePoint[] = JSON.parse(births_40k);
const data4$ = new BehaviorSubject<AnalysisTimeChartResponse>({
  activeLine: 0,
  chartLines: [
    {
      label: 'Births',
      linePoints: births
    }
  ]
})
export const Births40k: Story = {
  ...LittleDataset,
  args: {
    ...LittleDataset.args,
    data$: data4$
  },
  play: undefined
};

