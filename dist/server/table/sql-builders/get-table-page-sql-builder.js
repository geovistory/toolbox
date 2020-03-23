"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const utils_1 = require("../../utils");
const sql_builder_base_1 = require("../../utils/sql-builder-base");
/**
 * Class to create select queries on data tables
 */
class GetTablePageSqlBuilder extends sql_builder_base_1.SqlBuilderBase {
    constructor() {
        super();
        // key is the column name / pkColumn, value is the alias of the table
        this.colTableAliasMap = new Map();
        this.colBatchWiths = [];
        this.colBatchWithI = 0;
    }
    buildQuery(fkProject, pkEntity, options, masterColumns, colMeta) {
        options.columns.forEach((pkCol, i) => {
            this.colTableAliasMap.set(pkCol, `tr${i}`);
        });
        const colsForBatches = ramda_1.without(masterColumns, options.columns);
        const sql = `
    -- master columns
    WITH tw1 AS (
      Select
      ROW_NUMBER() OVER (),
      t1.pk_row${masterColumns.length ? ',' : ''}
      ${this.addColumnSelects(masterColumns)}
      From  tables.row t1
      JOIN data.digital t2 ON t1.fk_digital = t2.pk_entity
      JOIN data.namespace t3 ON t2.fk_namespace = t3.pk_entity
      ${this.addColumnFroms(masterColumns, pkEntity)}
      Where
      t1.fk_digital = ${this.addParam(pkEntity)}
      AND
      t3.fk_project = ${this.addParam(fkProject)}

      ${this.addFilters(options.filters)}

      ${this.addOrderBy(options, colMeta)}

      LIMIT ${this.addParam(options.limit || 20)}
      OFFSET ${this.addParam(options.offset || 0)}
    )

    -- col withs (baches of 10 columns for performance)
    ${colsForBatches.length ? ',' : ''}
    ${this.addColBatchWiths(colsForBatches, pkEntity)},

    -- rows
    tw2 AS (
      ${this.joinColBatchWiths(masterColumns)}

    ),

    -- length (total count)
    tw3 AS (
      Select
        count(t1.pk_row) as length
      From  tables.row t1
        JOIN data.digital t2 ON t1.fk_digital = t2.pk_entity
        JOIN data.namespace t3 ON t2.fk_namespace = t3.pk_entity
        ${this.addColumnFroms(masterColumns, pkEntity)}
      Where
        t1.fk_digital = ${this.addParam(pkEntity)}
      AND
        t3.fk_project = ${this.addParam(fkProject)}
        ${this.addFilters(options.filters)}
    ),
    tw4 AS (
      SELECT json_agg(t1) as rows FROM tw2 t1
    )

    SELECT
    json_build_object (
        'rows', tw4.rows,
        'length', tw3.length
    ) as data
    FROM tw4
    LEFT JOIN tw3 ON true;
    `;
        utils_1.logSql(sql, this.params);
        return { sql, params: this.params };
    }
    addColumnSelects(columns) {
        return columns.map(pk => {
            const tableAlias = this.colTableAliasMap.get(pk);
            if (tableAlias)
                return this.addColumnSelect(pk, tableAlias);
            else {
                console.error('col table alias not found:', pk);
                return '';
            }
        }).join(',\n');
    }
    addColumnSelect(colName, tableAlias) {
        return `json_build_object(
              'string_value', ${tableAlias}.string_value,
              'numeric_value', ${tableAlias}.numeric_value,
              'pk_cell', ${tableAlias}.pk_cell
            ) As "${colName}"`;
    }
    addColumnFroms(columns, pkEntity) {
        return columns.map(pk => {
            const tableAlias = this.colTableAliasMap.get(pk);
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
          And  ${tableAlias}.fk_column = ${this.addParam(parseInt(pkCol, 10))}`;
    }
    addColBatchWiths(columns, pkEntity) {
        return this.recurseColBatchWiths(columns, pkEntity).join(',\n');
    }
    recurseColBatchWiths(columns, pkEntity) {
        let sqls = [];
        const colBatch = columns.splice(0, 10);
        if (colBatch.length > 0) {
            sqls.push(this.addColBatchWith(`col_tw_${this.colBatchWithI}`, colBatch, pkEntity));
            this.colBatchWithI++;
            sqls = [...sqls, ...this.recurseColBatchWiths(columns, pkEntity) || []];
        }
        return sqls;
    }
    addColBatchWith(colBatchWith, columns, pkEntity) {
        this.colBatchWiths.push({ name: colBatchWith, columns });
        const sql = `
    ${colBatchWith} As (
        Select
           t1.pk_row ${columns.length ? ',' : ''}
           ${this.addColumnSelects(columns)}
        From
            tw1 t1
        ${this.addColumnFroms(columns, pkEntity)}
    )
    `;
        return sql;
    }
    joinColBatchWiths(masterColumns) {
        return `
        Select
      ${[
            ...['pk_row', ...masterColumns].map(colName => `tw1."${colName}"`),
            ...this.colBatchWiths.map(w => w.columns.map(c => `${w.name}."${c}"`).join(',\n'))
        ].join(',\n')}
        From
          ${['tw1', ...this.colBatchWiths.map(w => w.name)].join(',\n')}
          ${this.colBatchWiths.length < 1 ? '' :
            `Where
            ${this.colBatchWiths
                .map((w) => `tw1.pk_row = ${w.name}.pk_row`)
                .join(' AND \n')}
        `}
      order by tw1.row_number
    `;
    }
    addFilters(filters) {
        let sql = '';
        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                const filter = filters[key];
                const tableAlias = key == 'pk_row' ? 't1' : this.colTableAliasMap.get(key);
                if (filter.numeric) {
                    const column = key == 'pk_row' ? 'pk_row' : 'numeric_value';
                    sql = `${sql} AND ${tableAlias}."${column}" ${filter.numeric.operator} ${filter.numeric.value}`;
                }
                else if (filter.text) {
                    const o = filter.text.operator;
                    sql = `${sql} AND ${tableAlias}.string_value::text ${o == '%iLike%' ?
                        `iLike '%${filter.text.value}%'` :
                        `iLike '%${filter.text.value}%'` // Default
                    }`;
                }
                else {
                    console.error('filter data type is not clear');
                }
            }
        }
        return sql;
    }
    addOrderBy(options, colMeta) {
        var _a;
        if (options.sortBy) {
            if (options.sortBy == 'pk_row') {
                return `ORDER BY t1.pk_row ${options.sortDirection}`;
            }
            else {
                const pkCol = options.sortBy;
                const datCol = colMeta.find((col) => col.pk_entity == parseInt(pkCol, 10));
                const cellCol = ((_a = datCol) === null || _a === void 0 ? void 0 : _a.fk_data_type) == 3292 ? 'string_value' : 'numeric_value';
                return `ORDER BY ${this.colTableAliasMap.get(pkCol)}.${cellCol} ${options.sortDirection}`;
            }
        }
        return '';
    }
}
exports.GetTablePageSqlBuilder = GetTablePageSqlBuilder;
//# sourceMappingURL=get-table-page-sql-builder.js.map