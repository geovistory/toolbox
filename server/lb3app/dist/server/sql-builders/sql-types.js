"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_builder_lb_models_1 = require("../utils/sql-builder-lb-models");
class SqlContentTree extends sql_builder_lb_models_1.SqlBuilderLbModels {
    constructor(lb3models) {
        super(lb3models);
    }
    /**
     *
     * @param {*} fkProject
     * @param {*} pkEntity primary key of the Expression entity, for which we need the tree.
     */
    create(fkProject, pkEntity) {
        console.log({ fkProject, pkEntity });
    }
}
exports.SqlContentTree = SqlContentTree;
//# sourceMappingURL=sql-types.js.map