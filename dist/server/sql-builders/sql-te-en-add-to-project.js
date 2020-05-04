"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_builder_lb_models_1 = require("../utils/sql-builder-lb-models");
const utils_1 = require("../utils");
class SqlTeEnAddToProject extends sql_builder_lb_models_1.SqlBuilderLbModels {
    constructor(lb3models) {
        super(lb3models);
    }
    /**
     * Returns a SchemaObject with everything needed to create a paginated list of
     * temporal entities, related to the given source entity
     *
     * @param fkProject project
     * @param pkEntity the temporal entity to add to the project
     * @param accountId the account of the user performing the action
     */
    create(fkProject, pkEntity, accountId) {
        const sql = `
      INSERT INTO projects.v_info_proj_rel(fk_entity, calendar, fk_project, fk_last_modifier, is_in_project)
      -- the temporal entity
      SELECT
        ${this.addParam(pkEntity)},
        NULL::calendar_type,
        ${this.addParam(fkProject)}::int,
        ${this.addParam(accountId)}::int,
        true
      UNION
      -- the roles
      SELECT
        pk_entity,
        calendar,
        ${this.addParam(fkProject)}::int,
        ${this.addParam(accountId)}::int,
        true
      FROM  information.get_outgoing_roles_to_add (${this.addParam(pkEntity)}::int,${this.addParam(fkProject)}::int)
      UNION
      -- the text properties
      SELECT
        pk_entity,
        NULL::calendar_type,
        ${this.addParam(fkProject)}::int,
        ${this.addParam(accountId)}::int,
        true
      FROM information.v_text_property
      WHERE v_text_property.fk_concerned_entity= ${this.addParam(pkEntity)}::int
    `;
        utils_1.logSql(sql, this.params);
        return { sql, params: this.params };
    }
}
exports.SqlTeEnAddToProject = SqlTeEnAddToProject;
//# sourceMappingURL=sql-te-en-add-to-project.js.map