import { Timeline } from './timeline';

export class Cursor {
    constructor(
        public timeline: Timeline,
        public julianSecond: number,
        public bodyHeight: number,
        public headerHeight: number
    ) { }
}
