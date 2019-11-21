"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const map_and_time_cont_input_validator_1 = require("../../common/validators/map-and-time-cont-input.validator");
const map_and_time_cont_output_validator_1 = require("../../common/validators/map-and-time-cont-output.validator");
const map_and_time_cont_query_res_validator_1 = require("../../common/validators/map-and-time-cont-query-res.validator");
const sql_builder_1 = require("../query/sql-builder");
const analysis_1 = require("./analysis");
class MapAndTimeCont extends analysis_1.Analysis {
    constructor(connector, pkProject, analysisDef) {
        super();
        this.connector = connector;
        this.pkProject = pkProject;
        this.analysisDef = analysisDef;
    }
    validateInputs() {
        const v = map_and_time_cont_input_validator_1.isValidMapAndTimeContInput(this.analysisDef);
        if (v.validObj) {
            return rxjs_1.of({});
        }
        else {
            return rxjs_1.of({
                error: {
                    name: 'Invalid analysis definition',
                    message: v.error
                }
            });
        }
    }
    checkFeasibility() {
        const s$ = new rxjs_1.Subject();
        const q = new sql_builder_1.SqlBuilder().buildCountQuery(this.analysisDef.queryDefinition, this.pkProject);
        this.connector.execute(q.sql, q.params, (err, resultObjects) => {
            if (err) {
                s$.next({
                    error: {
                        name: `Error when counting the number of resulting rows`
                    }
                });
            }
            else {
                this.fullCount = parseInt(resultObjects[0].count, 10);
                s$.next();
            }
        });
        return s$;
    }
    /**
     * Run the query and produce the result
     */
    produceResult() {
        const s$ = new rxjs_1.Subject();
        const q = new sql_builder_1.SqlBuilder().buildQuery(this.analysisDef.queryDefinition, this.pkProject);
        this.connector.execute(q.sql, q.params, (err, resultObjects) => {
            if (err) {
                s$.next({
                    error: {
                        name: `Error on query`,
                        message: err
                    }
                });
            }
            else {
                const v = map_and_time_cont_query_res_validator_1.isValidMapAndTimeContQueryRes(resultObjects);
                if (typeof this.fullCount !== 'number') {
                    s$.next({
                        error: {
                            name: 'Something went wrong with counting the results.'
                        }
                    });
                }
                else if (v.validObj) {
                    this.result = mapAndTimeContQueryResToOutput(v.validObj);
                    s$.next();
                }
                else {
                    s$.next({
                        error: {
                            name: 'Invalid query results.',
                            message: v.error
                        }
                    });
                }
            }
        });
        return s$;
    }
    validateOutput() {
        const v = map_and_time_cont_output_validator_1.isValidMapAndTimeContOutput(this.result);
        if (v.validObj) {
            return rxjs_1.of({ res: v.validObj });
        }
        else {
            return rxjs_1.of({
                error: {
                    name: 'Invalid output.',
                    message: v.error
                }
            });
        }
    }
}
exports.MapAndTimeCont = MapAndTimeCont;
const tempValsToCesiumDouble = (temporalVals) => {
    const v = [];
    temporalVals.forEach(t => {
        v.push(t.iso_x);
        v.push(t.y);
    });
    return v;
};
const createPoint = (id, pointColorRgba, spatialVal, temporalVals) => {
    return {
        id,
        point: {
            color: {
                rgba: [255, 255, 255, 128],
                forwardExtrapolationType: 'HOLD',
                backwardExtrapolationType: 'HOLD'
            },
            outlineColor: {
                rgba: pointColorRgba
            },
            outlineWidth: 3,
            pixelSize: {
                backwardExtrapolationType: 'HOLD',
                forwardExtrapolationType: 'HOLD',
                number: tempValsToCesiumDouble(temporalVals)
            }
        },
        // label: {
        //   horizontalOrigin: { horizontalOrigin: 'LEFT' },
        //   fillColor: {
        //     rgba: [20, 20, 20, 255]
        //   },
        //   outlineColor: {
        //     rgba: [255, 255, 255, 230]
        //   },
        //   outlineWidth: 2,
        //   pixelOffset: {
        //     cartesian2: [12, -16]
        //   },
        //   scaleByDistance: {
        //     nearFarScalar: [150, 1, 15000000, 0.5]
        //   },
        //   text: 'A'
        // },
        position: {
            cartographicDegrees: [
                spatialVal.lat, spatialVal.long, 0
            ]
        },
        availability: '0000-00-00T00:00:00Z/9999-12-31T24:00:00Z'
    };
};
/**
 * Converts a MapAndTimeContQueryRes to a MapAndTimeContOutput
 * TODO
 */
function mapAndTimeContQueryResToOutput(queryRes) {
    const czml = [{
            'id': 'document',
            'name': 'CZML Point - Time Dynamic',
            'version': '1.0'
        }];
    const chartLines = [];
    const data_lookups = [];
    let id = 1;
    queryRes.forEach(item => {
        item.geo_positions.forEach(position => {
            const color = [255, 255, 255, 128];
            const temporalVals = item.temporal_data.timeCzmlValues;
            const c = createPoint(('_' + id++), color, position, temporalVals);
            czml.push(c);
        });
        const chartLine = {
            label: item.geo_entity_preview.entity_label,
            linePoints: item.temporal_data.timeLinePoints
        };
        chartLines.push(chartLine);
        data_lookups.push(item.temporal_data.data_lookup);
    });
    const map = { czml };
    const time = {
        activeLine: 0,
        chartLines
    };
    const out = {
        layers: [
            {
                map,
                time,
                data_lookups
            }
        ]
    };
    return out;
}
exports.mapAndTimeContQueryResToOutput = mapAndTimeContQueryResToOutput;
//# sourceMappingURL=map-and-time-cont.js.map