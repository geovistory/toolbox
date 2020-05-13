import { Timeline } from './timeline';

export class Cursor {
  constructor(
    public scaleX: d3.ScaleLinear<number, number>,
    public julianSecond: number,
    public bodyHeight: number,
    public headerHeight: number
  ) { }
}
