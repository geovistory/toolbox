export interface TimeChartContOutput extends ChartLineData {
}
export interface ChartLineData {
    activeLine: number;
    chartLines: ChartLine[];
    mouseX?: number;
}
export interface ChartLinePoint {
    x: number;
    y: number;
    data?: any;
}
export interface ChartLine {
    label: string;
    linePoints: ChartLinePoint[];
}
//# sourceMappingURL=time-chart-cont-output.interface.d.ts.map