/// <reference path="../../../../node_modules/@types/cesium/index.d.ts" />

import { QueryPoint } from 'app/modules/visuals/components/map-query-layer/map-query-layer.component';
import { CzmlPosition } from '../../../../../src/common/interfaces/czml-types';

export interface CzmlPositionGeneratorSettings {

}


export class CzmlPositionGenerator {

    /**
     * CzmlPosition data object
     */
    d: CzmlPosition;


    /**
    * Generator settings
    */


    constructor(settings?: CzmlPositionGeneratorSettings) {

        // set defaults
        this.d = {};

        // override and extend with given czmlPosition
        Object.assign(this, settings);
    }

    public fromQueryPoint?(p: QueryPoint): CzmlPositionGenerator {

        this.setCartographicDegrees(p)

        return this;

    }


    // TODO make this time dynamic
    private setCartographicDegrees?(p: QueryPoint) {
        if (p.presences) {
            const latLon = p.presences[0].was_at;

            this.d.cartographicDegrees = [latLon.long, latLon.lat, 0]

        }
    }



    toCzml?(): CzmlPosition {
        return this.d;
    }

}
