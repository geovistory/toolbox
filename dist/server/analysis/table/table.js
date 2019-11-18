"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const sql_builder_1 = require("../../query/sql-builder");
const analysis_1 = require("../analysis");
const validators_1 = require("../../../common/validators");
class AnalysisTable extends analysis_1.Analysis {
    constructor(connector, pkProject, analysisDef) {
        super();
        this.connector = connector;
        this.pkProject = pkProject;
        this.analysisDef = analysisDef;
    }
    validateInputs() {
        const v = validators_1.isValidTableInput(this.analysisDef);
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
                const v = validators_1.isValidTableQueryRes(resultObjects);
                if (typeof this.fullCount !== 'number') {
                    s$.next({
                        error: {
                            name: 'Something went wrong with counting the results.'
                        }
                    });
                }
                else if (v.validObj) {
                    this.result = {
                        full_count: this.fullCount,
                        rows: v.validObj
                    };
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
        const v = validators_1.isValidTableOutput(this.result);
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
exports.AnalysisTable = AnalysisTable;
//# sourceMappingURL=table.js.map