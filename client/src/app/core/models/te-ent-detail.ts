import { DataUnitI, DataUnit } from "./data-unit";
import { InfTemporalEntity } from "app/core";
import { TeEntAccentuation } from "./types";

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

}


export class TeEntDetail extends DataUnit implements TeEntDetailI {
    // record
    teEnt?: InfTemporalEntity;

    // accentuation tells if a TeEnt is clicked, mouseovered or similar
    accentuation?: TeEntAccentuation;

    // true if timefilter (cursor of timeline) is inside Timespan of TeEnt
    timespanActivated?: boolean;

    
    constructor(data?: TeEntDetailI) {
        super()
        Object.assign(this, data);
    }
}