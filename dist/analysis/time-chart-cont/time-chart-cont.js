"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const sql_builder_1 = require("../../query/sql-builder");
const analysis_1 = require("../analysis");
const time_chart_cont_input_validator_1 = require("./input/time-chart-cont-input.validator");
const time_chart_cont_query_res_validator_1 = require("./query-result/time-chart-cont-query-res.validator");
const time_chart_cont_output_validator_1 = require("./output/time-chart-cont-output.validator");
const operators_1 = require("rxjs/operators");
class AnalysisTimeChartCont extends analysis_1.Analysis {
    constructor(connector, pkProject, analysisDef) {
        super();
        this.connector = connector;
        this.pkProject = pkProject;
        this.analysisDef = analysisDef;
    }
    validateInputs() {
        const v = time_chart_cont_input_validator_1.isValidTimeChartContInput(this.analysisDef);
        if (v.validObj) {
            return rxjs_1.of(null);
        }
        else {
            return rxjs_1.of({
                error: {
                    title: 'Invalid analysis definition',
                    message: v.error
                }
            });
        }
    }
    checkFeasibility() {
        const s$ = new rxjs_1.Subject();
        rxjs_1.combineLatest(this.analysisDef.lines.map((timeChartContLine, i) => {
            const q = new sql_builder_1.SqlBuilder().buildCountQuery(timeChartContLine.queryDefinition, this.pkProject);
            const q$ = new rxjs_1.Subject();
            this.connector.execute(q.sql, q.params, (err, resultObjects) => {
                if (err) {
                    s$.next({
                        error: {
                            title: `Error when counting the number of resulting rows for line nr. ${i + 1}`
                        }
                    });
                }
                else {
                    if (resultObjects[0].count < 100000) {
                        q$.next();
                    }
                    else {
                        s$.next({
                            error: {
                                title: `Your query gives too large result. Please narrow down the filter for line nr. ${i + 1}`
                            }
                        });
                    }
                }
            });
            return q$;
        })).pipe(operators_1.first(), operators_1.takeUntil(s$)).subscribe(() => s$.next());
        return s$;
    }
    /**
     * Run the query and produce the result
     */
    produceResult() {
        const s$ = new rxjs_1.Subject();
        rxjs_1.combineLatest(this.analysisDef.lines.map((timeChartContLine, i) => {
            const q = new sql_builder_1.SqlBuilder().buildQuery(timeChartContLine.queryDefinition, this.pkProject);
            const q$ = new rxjs_1.Subject();
            this.connector.execute(q.sql, q.params, (err, resultObjects) => {
                if (err) {
                    s$.next({
                        error: {
                            title: `Error on query for line nr. ${i + 1}`,
                            message: err
                        }
                    });
                }
                else {
                    const v = time_chart_cont_query_res_validator_1.isValidTimeChartContQueryRes(resultObjects);
                    if (v.validObj) {
                        const chartLine = {
                            label: timeChartContLine.visualizationDefinition.label,
                            linePoints: v.validObj[0].temporal_distribution
                        };
                        q$.next(chartLine);
                    }
                    else {
                        s$.next({
                            error: {
                                title: 'Invalid query results.',
                                message: v.error
                            }
                        });
                    }
                }
            });
            return q$;
        })).pipe(operators_1.first(), operators_1.takeUntil(s$)).subscribe((chartLines) => {
            this.result = {
                activeLine: 0,
                chartLines
            };
            s$.next();
        });
        return s$;
    }
    validateOutput() {
        const v = time_chart_cont_output_validator_1.isValidTimeChartContOutput(this.result);
        if (v.validObj) {
            return rxjs_1.of({ res: v.validObj });
        }
        else {
            return rxjs_1.of({
                error: {
                    title: 'Invalid output.',
                    message: v.error
                }
            });
        }
    }
}
exports.AnalysisTimeChartCont = AnalysisTimeChartCont;
//# sourceMappingURL=time-chart-cont.js.map