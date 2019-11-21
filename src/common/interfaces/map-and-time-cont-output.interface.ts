import { TimeChartContOutput } from './time-chart-cont-output.interface';
import { CzmlPacket } from './czml-types';

export interface MapAndTimeContLayer {
  data_lookups: { [key: string]: number[] }[]
  map: MapLayer
  time: TimeChartContOutput
}
export interface MapAndTimeContOutput {
  layers: MapAndTimeContLayer[]
}
export interface MapLayer {
  czml: CzmlPacket[],
}
