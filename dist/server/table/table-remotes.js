"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_columns_sql_builder_1 = require("./sql-builders/get-columns-sql-builder");
const get_table_page_sql_builder_1 = require("./sql-builders/get-table-page-sql-builder");
const get_dat_columns_array_1 = require("./sql-builders/get-dat-columns-array");
const ramda_1 = require("ramda");
/**
 * This class handles remote methods for loopback.
 */
class TableRemotes {
    constructor(lb3App) {
        this.lb3App = lb3App;
        this.promise = new Promise((res, rej) => {
            this.resolver = res;
            this.rejector = rej;
        });
        this.connector = lb3App.dataSources.postgres1.connector;
    }
    /**
     * Queries a page of table
     * @param fkProject
     * @param pkEntity
     * @param options
     */
    getPage(fkProject, pkEntity, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // this array contains DatColumns needed to build the query
            let datColumns = [];
            // ensurepkEntity is number, to avoid SQL injection
            if (typeof pkEntity !== 'number') {
                return Promise.reject({
                    name: `Error when querying table`,
                    message: 'pkEntity is not a number'
                });
            }
            // ensure at least one column is given, if no col specified, query all cols.
            if (!(((_b = (_a = options) === null || _a === void 0 ? void 0 : _a.columns) === null || _b === void 0 ? void 0 : _b.length) >= 1)) {
                yield this.getColumns(fkProject, pkEntity).then(cols => {
                    options.columns = cols.dat.column.map(col => col.pk_entity.toString());
                });
            }
            // ensure columns are strings
            options.columns = options.columns.map(col => col.toString());
            options.sortBy = options.sortBy.toString();
            // filter and orderby columns
            let masterColumns = [];
            // add sort-by column
            if (options.sortBy && options.sortBy !== 'pk_row') {
                masterColumns = [options.sortBy];
            }
            // add filter columns
            const filterCols = ramda_1.keys(options.filters);
            if (options.filters && filterCols.length > 0) {
                masterColumns = [
                    ...masterColumns,
                    ...filterCols.filter(col => col !== 'pk_row').map(col => col.toString())
                ];
            }
            // ensure masterColums are unique
            masterColumns = ramda_1.uniq(masterColumns);
            // get meta info about master columns
            if (masterColumns.length > 0) {
                yield this.getDatColumnArray(fkProject, masterColumns.map(c => parseInt(c, 10))).then(res => {
                    datColumns = res;
                });
            }
            options.limit = options.limit <= 100 ? options.limit : 100;
            // options.columns = [24626664, 24626666]; // {24626628,24626630,24626632,24626634,24626636,24626638,24626640,24626642,24626644,24626646,24626648,24626650,24626652,24626654,24626656,24626658,24626660,24626662,24626664,24626666,24626668,24626670,24626672,24626674,24626676,24626678,24626680,24626682,24626684,24626686,24626688,24626690,24626692,24626694,24626696,24626698,24626700,24626702,24626704,24626706,24626708,24626710,24626712,24626714,24626716,24626718,24626720,24626722,24626724,24626726,24626728,24626730,24626732,24626734,24626736,24626738,24626740,24626742,24626744,24626746,24626748,24626750,24626752,24626754,24626756,24626758,24626760,24626762,24626764,24626766,24626768,24626770,24626772,24626774,24626776,24626778,24626780,24626788}
            const q = new get_table_page_sql_builder_1.GetTablePageSqlBuilder().buildQuery(fkProject, pkEntity, options, masterColumns, datColumns);
            this.connector.execute(q.sql, q.params, (err, res) => {
                if (err) {
                    this.rejector({
                        name: `Error when querying table`,
                        message: err
                    });
                }
                else {
                    this.resolver({
                        columns: options.columns,
                        rows: res[0].data.rows,
                        length: res[0].data.length,
                    });
                }
            });
            return this.promise;
        });
    }
    /**
     * queries the columns of a table returing a schema object
     */
    getColumns(fkProject, pkEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = new get_columns_sql_builder_1.GetColumnsSqlBuilder(this.lb3App.models).buildQuery(fkProject, pkEntity);
            return new Promise((res, rej) => {
                this.connector.execute(q.sql, q.params, (err, resultObjects) => {
                    if (err) {
                        rej({
                            name: `Error when querying columns`,
                            message: err
                        });
                    }
                    else {
                        res(resultObjects[0].data);
                    }
                });
            });
        });
    }
    /**
     * queries array of datColumn for given array of columns
     */
    getDatColumnArray(fkProject, pkColumns) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = new get_dat_columns_array_1.GetDatColumnsArray(this.lb3App.models).buildQuery(fkProject, pkColumns);
            return new Promise((res, rej) => {
                this.connector.execute(q.sql, q.params, (err, resultObjects) => {
                    if (err) {
                        rej({
                            name: `Error when querying dat column array`,
                            message: err
                        });
                    }
                    else {
                        res(resultObjects);
                    }
                });
            });
        });
    }
}
exports.TableRemotes = TableRemotes;
//# sourceMappingURL=table-remotes.js.map