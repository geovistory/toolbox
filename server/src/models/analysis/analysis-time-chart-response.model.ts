import {model, property} from '@loopback/repository';



@model()
export class ChartLinePoint {

  @property({required: true})
  x: number;

  @property({required: true})
  y: number;

  @property.array(Number)
  data?: number[];

  @property()
  data_ref?: string
}

@model()
export class ChartLine {

  @property({required: true})
  label: string

  @property.array(ChartLinePoint, {required: true})
  linePoints: ChartLinePoint[]

  @property.array(Number)
  pkEntities?: number[]
}

@model()
export class AnalysisTimeChartResponse {

  @property({required: true})
  activeLine: number

  @property.array(ChartLine, {required: true})
  chartLines: ChartLine[]

  @property()
  mouseX?: number // the mouse x position
}
