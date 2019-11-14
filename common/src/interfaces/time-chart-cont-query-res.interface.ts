import { ChartLinePoint } from '../output/time-chart-cont-output.interface';

export type TimeChartContQueryRes = [{
  full_count?: number,
  temporal_distribution: ChartLinePoint[]
}];
