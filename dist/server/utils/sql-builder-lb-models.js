"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_builder_base_1 = require("./sql-builder-base");
/**
 * Abstract Class providing basic logic for building SQL
 * with select statements according to looback model definitions
 */
class SqlBuilderLbModels extends sql_builder_base_1.SqlBuilderBase {
    /**
     * @param lb3models The loopback 3 models object providing info about columns to select per model
     */
    constructor(lb3models) {
        super();
        this.lb3models = lb3models;
    }
    /**
     * Extracts an array of column names from loopback 3 model
     * object. Useful to create select statements with the columns needed
     * from that model.
     *
     * @param modelName
     */
    getColumns(modelName) {
        if (!this.lb3models)
            console.error('this.models has to be defined');
        const propDefs = this.lb3models[modelName].definition.properties;
        const columns = [];
        for (const colName in propDefs) {
            if (propDefs.hasOwnProperty(colName)) {
                if (!propDefs[colName].hidden)
                    columns.push(colName);
            }
        }
        return columns;
    }
    /**
     * Creates select statements with the columns needed for given model
     * according to loopback 3 model definition.
     *
     * @param alias the table alias
     * @param model the name of the loopback model
     */
    createSelect(alias, model) {
        const columns = this.getColumns(model);
        return columns.map(c => alias + '.' + c).join(`,
    `);
    }
    /**
     * Creates SQL for generating a json object where
     * keys are the column names. The column names are
     * the ones given by loopback 3 model definition.
     *
     * @param alias the table alias
     * @param model the name of the loopback model
     */
    createBuildObject(alias, model) {
        const columns = this.getColumns(model);
        return ` jsonb_build_object(
      ${columns.map(c => `'${c}',${alias}.${c}`).join(`,
      `)}
    ) `;
    }
}
exports.SqlBuilderLbModels = SqlBuilderLbModels;
//# sourceMappingURL=sql-builder-lb-models.js.map