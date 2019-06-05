import { InfTemporalEntity } from 'app/core/sdk';
import { Entity } from './entity';
import { TeEntAccentuation } from './types';



export class TeEntDetail extends Entity  {

    // record
    teEnt?: InfTemporalEntity;

    // accentuation tells if a TeEnt is clicked, mouseovered or similar
    accentuation?: TeEntAccentuation;

    // true if timefilter (cursor of timeline) is inside Timespan of TeEnt
    timespanActivated?: boolean;

    // if true, this show the interface to edit the details
    editing? = false;

    loading?: boolean

    constructor(data?: TeEntDetail) {
        super()
        Object.assign(this, data);
    }

}
