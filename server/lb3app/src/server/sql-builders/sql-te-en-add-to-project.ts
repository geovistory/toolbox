import { SqlBuilderLbModels } from '../utils/sql-builder-lb-models';

import { Lb3Models } from '../utils/interfaces';
import { logSql } from '../utils';

export class SqlTeEnAddToProject extends SqlBuilderLbModels {

  constructor(lb3models: Lb3Models) {
    super(lb3models)
  }


  /**
   * Returns a SchemaObject with everything needed to create a paginated list of
   * temporal entities, related to the given source entity
   *
   * @param fkProject project
   * @param pkEntity the temporal entity to add to the project
   * @param accountId the account of the user performing the action
   */
  create(
    fkProject: number,
    pkEntity: number,
    accountId: number,
  ) {
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
      -- the statements
      SELECT
        pk_entity,
        calendar,
        ${this.addParam(fkProject)}::int,
        ${this.addParam(accountId)}::int,
        true
      FROM  information.get_outgoing_statements_to_add (${this.addParam(pkEntity)}::int,${this.addParam(fkProject)}::int)
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
    logSql(sql, this.params)
    return { sql, params: this.params };
  }
}
