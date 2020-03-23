"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_builder_lb_models_1 = require("../../utils/sql-builder-lb-models");
class GetDatColumnsArray extends sql_builder_lb_models_1.SqlBuilderLbModels {
    constructor(lb3models) {
        super(lb3models);
    }
    /**
     * @param fkProject project
     * @param pkColumns pkEntity of the columns to query
     */
    buildQuery(fkProject, pkColumns) {
        this.sql = `
    SELECT
    ${this.createSelect('t1', 'DatColumn')}
    FROM
    data."column" t1,
    data.namespace t2
    WHERE t1.fk_namespace = t2.pk_entity
    AND t2.fk_project = ${this.addParam(fkProject)}
    AND t1.pk_entity IN (${this.addParams(pkColumns)})
  `;
        return this.getBuiltQuery();
    }
}
exports.GetDatColumnsArray = GetDatColumnsArray;
//# sourceMappingURL=get-dat-columns-array.js.map