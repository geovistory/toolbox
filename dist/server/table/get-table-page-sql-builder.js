"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const sql_builder_lb_models_1 = require("../utils/sql-builder-lb-models");
class GetTablePageSqlBuilder extends sql_builder_lb_models_1.SqlBuilderLbModels {
    constructor(models) {
        super(models);
        this.colAliasMap = new Map();
    }
    buildQuery(fkProject, pkEntity, options) {
        options.columns.forEach((pkCol, i) => {
            this.colAliasMap.set(pkCol, `tr${i}`);
        });
        const sql = `
    Select
    t1.pk_row,
    ${this.addColumnSelects(options.columns)}
    From  tables.row t1
    JOIN data.digital t2 ON t1.fk_digital = t2.pk_entity
    JOIN data.namespace t3 ON t2.fk_namespace = t3.pk_entity
    ${this.addColumnFroms(options.columns, pkEntity)}
    Where
    t1.fk_digital = ${this.addParam(pkEntity)}
    AND
    t3.fk_project = ${this.addParam(fkProject)}

    LIMIT ${this.addParam(options.limit)}
    `;
        utils_1.logSql(sql, this.params);
        return { sql, params: this.params };
    }
    addColumnSelects(pks) {
        return pks.map(pk => {
            const tableAlias = this.colAliasMap.get(pk);
            if (tableAlias)
                return this.addColumnSelect(pk, tableAlias);
            else
                return '';
        }).join(',\n');
    }
    addColumnSelect(pkCol, tableAlias) {
        return `json_build_object(
              'string_value', ${tableAlias}.string_value,
              'numeric_value', ${tableAlias}.numeric_value,
              'pk_cell', ${tableAlias}.pk_cell
            ) As "${pkCol}"`;
    }
    addColumnFroms(pks, pkEntity) {
        return pks.map(pk => {
            const tableAlias = this.colAliasMap.get(pk);
            if (tableAlias)
                return this.addColumnFrom(pk, tableAlias, pkEntity);
            else
                return '';
        }).join('\n');
    }
    addColumnFrom(pkCol, tableAlias, pkEntity) {
        return `
          Left Join tables.cell_${pkEntity}  ${tableAlias}
          On t1.pk_row =  ${tableAlias}.fk_row
          And  ${tableAlias}.fk_column = ${this.addParam(pkCol)}`;
    }
}
exports.GetTablePageSqlBuilder = GetTablePageSqlBuilder;
//# sourceMappingURL=get-table-page-sql-builder.js.map