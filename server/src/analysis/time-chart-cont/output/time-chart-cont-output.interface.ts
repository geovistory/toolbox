export interface TimeChartContOutput extends ChartLineData { };

export interface ChartLineData {
  activeLine: number
  chartLines: ChartLine[]
  mouseX?: number // the mouse x position
}
export interface ChartLinePoint { x: number, y: number, data?: any }
export interface ChartLine {
  label: string
  linePoints: ChartLinePoint[]
}
