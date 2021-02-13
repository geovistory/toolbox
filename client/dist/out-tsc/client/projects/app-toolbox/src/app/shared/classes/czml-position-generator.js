/// <reference path="../../../../../../node_modules/@types/cesium/index.d.ts" />
export class CzmlPositionGenerator {
    /**
    * Generator settings
    */
    constructor(settings) {
        // set defaults
        this.d = {};
        // override and extend with given czmlPosition
        Object.assign(this, settings);
    }
    fromQueryPoint(p) {
        this.setCartographicDegrees(p);
        return this;
    }
    // TODO make this time dynamic
    setCartographicDegrees(p) {
        if (p.presences) {
            const latLon = p.presences[0].was_at;
            this.d.cartographicDegrees = [latLon.long, latLon.lat, 0];
        }
    }
    toCzml() {
        return this.d;
    }
}
//# sourceMappingURL=czml-position-generator.js.map