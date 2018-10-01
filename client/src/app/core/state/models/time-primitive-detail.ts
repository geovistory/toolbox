import { InfTimePrimitive } from 'app/core/sdk';

export class TimePrimitveDetail {

    timePrimitive?: InfTimePrimitive
    constructor(data?: TimePrimitveDetail) {
        Object.assign(this, data);
    }

}
