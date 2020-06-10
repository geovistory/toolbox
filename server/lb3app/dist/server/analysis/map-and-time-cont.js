"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const map_and_time_cont_input_validator_1 = require("../../common/validators/map-and-time-cont-input.validator");
const map_and_time_cont_output_validator_1 = require("../../common/validators/map-and-time-cont-output.validator");
const map_and_time_cont_query_res_validator_1 = require("../../common/validators/map-and-time-cont-query-res.validator");
const sql_builder_1 = require("./sql-builder");
const analysis_1 = require("./analysis");
const sql_builder_map_and_time_1 = require("./sql-builder-map-and-time");
class AnalysisMapAndTimeCont extends analysis_1.Analysis {
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
                if (this.fullCount < 100) {
                    s$.next();
                }
                else {
                    s$.next({
                        error: {
                            name: `Too many results: ${this.fullCount} (max: 100)`,
                            message: `Tipp: Restrict the filter to Geographical Places or Built Works that have the properties you are looking for in the 'Path' (you defined below the filter).`
                        }
                    });
                }
            }
        });
        return s$;
    }
    /**
     * Run the query and produce the result
     */
    produceResult() {
        const s$ = new rxjs_1.Subject();
        const q = new sql_builder_map_and_time_1.SqlBuilderMapAndTime().buildQuery(this.analysisDef.queryDefinition, this.pkProject);
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
                    this.result = v.validObj;
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
exports.AnalysisMapAndTimeCont = AnalysisMapAndTimeCont;
//# sourceMappingURL=map-and-time-cont.js.map