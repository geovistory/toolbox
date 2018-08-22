import { TimePrimitive } from "app/core/date-time/time-primitive";

export interface ExTimeLabelI {
    earliest?: TimePrimitive;
    latest?: TimePrimitive;
}

export class ExTimeLabel implements ExTimeLabelI {
    earliest: TimePrimitive;
    latest: TimePrimitive;

    constructor(data?: ExTimeLabelI) {
        Object.assign(this, data);
    }
}