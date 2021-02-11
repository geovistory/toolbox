import { sandboxOf } from 'angular-playground';
import { BehaviorSubject } from 'rxjs';
import { TimelineModule } from '../../timeline.module';
import { TimelineChartComponent } from './timeline-chart.component';
import { ship_voyages, ship_voyages_by_place, births_40k } from './timeline-chart.mock';
import { few_births } from './timeline-chart.few-births.mock';
import { ChartLinePoint } from "@kleiolab/lib-sdk-lb4";
import { ChartLine } from "@kleiolab/lib-sdk-lb4";
import { AnalysisTimeChartResponse } from 'projects/app-toolbox/src/app/core/sdk-lb4';

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

const shipVoyagesByPlace: ChartLine[] = JSON.parse(ship_voyages_by_place);
const data3$ = new BehaviorSubject<AnalysisTimeChartResponse>({
  activeLine: null,
  chartLines: shipVoyagesByPlace
})

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

const data5$ = new BehaviorSubject<AnalysisTimeChartResponse>({
  activeLine: 0,
  chartLines: [
    {
      label: 'Births',
      linePoints: few_births
    }
  ]
})

export default sandboxOf(TimelineChartComponent, {
  declareComponent: false,
  imports: [
    TimelineModule,
  ]
})
  .add('TimeLineChart | Few Data ', {
    context: {
      data1$,
      showCursor$: new BehaviorSubject<boolean>(true)
    },
    template: `
    <p style="width: 800px; height: 400px; margin: 20px; padding: 5px; border: 1px dashed red;">
        <gv-timeline-chart [data$]="data1$" [showCursor$]="showCursor$" (cursorChange)="cursorPos=$event"></gv-timeline-chart>
    </p>
    <p style="margin: 20px;">

    </p>
    <p style="margin: 20px;">
      {{cursorPos | json}}
    </p>
    <p style="margin: 20px;">
      <input type="checkbox" [checked]="showCursor$ | async" (change)="showCursor$.next(!showCursor$?.value)"> show cursor
    </p>

    `
  })
  .add('TimeLineChart | 8900 ship voyages ', {
    context: {
      data2$
    },
    template: `
      <p style="width: 800px; height: 400px; margin: 20px; padding: 5px; border: 1px dashed red;">
          <gv-timeline-chart [data$]="data2$"></gv-timeline-chart>
      </p>
      <p style="margin: 20px;">

      </p>
      <p style="margin: 20px;">
        {{cursorPos | json}}
      </p>

      `
  })
  .add('TimeLineChart | 40k Births', {
    context: {
      data4$
    },
    template: `
      <p style="width: 800px; height: 600px; margin: 20px; padding: 5px; border: 1px dashed red;">
          <gv-timeline-chart [data$]="data4$"></gv-timeline-chart>
      </p>
      <p style="margin: 20px;">

      </p>
      <p style="margin: 20px;">
        {{cursorPos | json}}
      </p>

      `
  })
  .add('TimeLineChart | Few Births', {
    context: {
      data5$
    },
    template: `
      <p style="width: 800px; height: 600px; margin: 20px; padding: 5px; border: 1px dashed red;">
          <gv-timeline-chart [data$]="data5$"></gv-timeline-chart>
      </p>
      <p style="margin: 20px;">

      </p>
      <p style="margin: 20px;">
        {{cursorPos | json}}
      </p>

      `
  })
  .add('TimeLineChart | Ship voyages by Place', {
    context: {
      data3$
    },
    template: `
      <p style="width: 800px; height: 400px; margin: 20px; padding: 5px; border: 1px dashed red;">
          <gv-timeline-chart [data$]="data3$"></gv-timeline-chart>
      </p>
      <p style="margin: 20px;">

      </p>
      <p style="margin: 20px;">
        {{cursorPos | json}}
      </p>

      `
  })
  .add('TimeLineChart | Small', {
    context: {
      data3$
    },
    template: `
      <p style="width: 400px; height: 200px; margin: 20px; padding: 5px; border: 1px dashed red;">
          <gv-timeline-chart [data$]="data3$" [showInfoBtn]="true" [showInfoBox]="false" ></gv-timeline-chart>
      </p>
      <p style="margin: 20px;">

      </p>
      <p style="margin: 20px;">
        {{cursorPos | json}}
      </p>

      `
  })
