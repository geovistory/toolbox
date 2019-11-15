import { ChartLinePoint } from './time-chart-cont-output.interface';

export type TimeChartContQueryRes = [{
  full_count?: number,
  temporal_distribution: ChartLinePoint[]
}];
