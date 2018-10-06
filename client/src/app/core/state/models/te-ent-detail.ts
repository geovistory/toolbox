import { InfTemporalEntity } from 'app/core/sdk';
import { DataUnit, DataUnitI } from './data-unit';
import { TeEntAccentuation } from './types';

/*******************************
 * TeEnt Interface
 *******************************/

export interface TeEntDetailI extends DataUnitI {

    // record
    teEnt?: InfTemporalEntity;

    // accentuation tells if a TeEnt is clicked, mouseovered or similar
    accentuation?: TeEntAccentuation;

    // true if timefilter (cursor of timeline) is inside Timespan of TeEnt
    timespanActivated?: boolean;

    // if true, this show the interface to edit the details
    editing?: boolean;

}

export class TeEntDetail extends DataUnit implements TeEntDetailI {

    // record
    teEnt?: InfTemporalEntity;

    // accentuation tells if a TeEnt is clicked, mouseovered or similar
    accentuation?: TeEntAccentuation;

    // true if timefilter (cursor of timeline) is inside Timespan of TeEnt
    timespanActivated?: boolean;

    // if true, this show the interface to edit the details
    editing? = false;

    constructor(data?: TeEntDetailI) {
        super()
        Object.assign(this, data);
    }

}
