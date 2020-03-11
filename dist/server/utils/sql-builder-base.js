"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Abstract Class to be extended by sql builder
 * providing basic logic for building SQL
 */
class SqlBuilderBase {
    constructor() {
        this.params = [];
        this.sql = '';
    }
    addParam(val) {
        this.params.push(val);
        return '$' + this.params.length;
    }
    addParams(vals) {
        return vals.map(val => this.addParam(val)).join(',');
    }
}
exports.SqlBuilderBase = SqlBuilderBase;
//# sourceMappingURL=sql-builder-base.js.map