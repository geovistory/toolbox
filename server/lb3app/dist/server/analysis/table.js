"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const sql_builder_1 = require("./sql-builder");
const analysis_1 = require("./analysis");
const validators_1 = require("../../common/validators");
const operators_1 = require("rxjs/operators");
const json2csv = __importStar(require("json2csv"));
class AnalysisTable extends analysis_1.Analysis {
    constructor(connector, pkProject, analysisDef) {
        super();
        this.connector = connector;
        this.pkProject = pkProject;
        this.analysisDef = analysisDef;
    }
    /**
   * execute the request, apply all hooks, convert to exportable object,
   * @return a promise useful for loopback
   */
    runAndExport(fileType) {
        this.validateInputs()
            .pipe(this.applyHook(() => this.checkFeasibility()), this.applyHook(() => this.produceResult()), this.applyHook(() => this.convertForExport(fileType)), operators_1.takeUntil(this.destroy$)).subscribe(hookRes => {
            if (hookRes && hookRes.error) {
                this.reject(hookRes.error);
            }
            else if (hookRes.res !== undefined) {
                this.resolve(hookRes.res);
            }
            else {
                this.reject({
                    name: 'Oops, something went wrong'
                });
            }
        });
        return this.promise;
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
    /**
    * Converts QueryRes to downloadable format;
    */
    convertForExport(filetype) {
        const allowedFileTypes = ['json', 'csv', 'xls'];
        if (allowedFileTypes.indexOf(filetype) === -1) {
            return rxjs_1.of({
                error: {
                    name: `Filetype "${filetype}" is not supported.`
                }
            });
        }
        if (this.result) {
            if (filetype === 'json') {
                return rxjs_1.of({
                    res: JSON.stringify({
                        columns: this.getColumnLabelMap(),
                        rows: this.result.rows
                    }, null, 2)
                });
            }
            else if (filetype === 'csv') {
                const { fields, data } = this.flattenResults(this.result.rows);
                try {
                    const parser = new json2csv.Parser({ fields });
                    const csv = parser.parse(data);
                    return rxjs_1.of({ res: csv });
                }
                catch (err) {
                    return rxjs_1.of({
                        error: {
                            name: 'Error when creating csv.',
                            message: err
                        }
                    });
                }
            }
            else if (filetype === 'xls') {
                const { fields, data } = this.flattenResults(this.result.rows);
                try {
                    const parser = new json2csv.Parser({ fields, excelStrings: true });
                    const xls = parser.parse(data);
                    return rxjs_1.of({ res: xls });
                }
                catch (err) {
                    return rxjs_1.of({
                        error: {
                            name: 'Error when creating csv.',
                            message: err
                        }
                    });
                }
            }
        }
        return rxjs_1.of({
            error: {
                name: `Something went wrong when exporting data.`
            }
        });
    }
    getColumnLabelMap() {
        const columnLabelMap = {};
        // map col.id to colLabel
        this.analysisDef.queryDefinition.columns.forEach(col => {
            columnLabelMap[col.id] = col && col.label ? col.label : col.id;
        });
        return columnLabelMap;
    }
    flattenResults(resultObjects) {
        const fieldObj = {};
        const columnLabelMap = this.getColumnLabelMap();
        const flatResults = resultObjects.map(obj => {
            const flat = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const element = obj[key];
                    const colLabel = columnLabelMap[key];
                    if (typeof element === 'object') {
                        if (Array.isArray(element)) {
                            flat[colLabel] = element.length;
                            fieldObj[colLabel] = true;
                        }
                        else if (element.hasOwnProperty('entity_label')) {
                            flat[colLabel] = [element.class_label, element.entity_label].filter(x => !!x).join(' ');
                            fieldObj[colLabel] = true;
                            // ignore {} objects
                        }
                    }
                    else {
                        flat[colLabel] = element;
                        fieldObj[colLabel] = true;
                    }
                }
            }
            return flat;
        });
        return {
            fields: Object.keys(fieldObj),
            data: flatResults,
        };
    }
    ;
}
exports.AnalysisTable = AnalysisTable;
//# sourceMappingURL=table.js.map