"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
/**
 * Abstract Class providing basic logic for building SQL
 *
 * To be extended by specific sql builder implementations
 */
class SqlBuilderBase {
    constructor() {
        // contains the parameters
        this.params = [];
        // contains the sql (potentially parametrized)
        this.sql = '';
    }
    /**
     * adds a parameter to this.params and returns
     * the corresponding string ($1, $2, etc.) for
     * parametrized postgres queries:
     *
     * Read https://node-postgres.com/features/queries
     *
     * @param val value of the parameter
     */
    addParam(val) {
        this.params.push(val);
        return '$' + this.params.length;
    }
    /**
     * adds multiple parameters.
     *
     * see this.addParams() for more information.
     *
     * @param vals
     */
    addParams(vals) {
        return vals.map(val => this.addParam(val)).join(',');
    }
    /**
     * Returns the built query
     */
    getBuiltQuery() {
        utils_1.logSql(this.sql, this.params);
        return { sql: this.sql, params: this.params };
    }
}
exports.SqlBuilderBase = SqlBuilderBase;
//# sourceMappingURL=sql-builder-base.js.map