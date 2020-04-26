import { SqlBuilderLbModels } from '../utils/sql-builder-lb-models';

import { Lb3Models } from '../utils/interfaces';
import { logSql } from '../utils';

export class SqlEntityRemoveFromProject extends SqlBuilderLbModels {

  constructor(lb3models: Lb3Models) {
    super(lb3models)
  }


  /**
   * Removes an entity (persitent or temporal) from the project.
   * It sets info_proj_rel.is_in_project to false for the following records
   * - The entity itself
   * - The outgoing statements
   * - The text properties (TODO remove, once text properties are replaced by lang_string )
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
      WITH tw1 AS (

        UPDATE projects.info_proj_rel t1
        SET is_in_project = false,
        fk_last_modifier = ${this.addParam(accountId)}

        WHERE t1.fk_entity IN (
          -- the entity itself
          SELECT ${this.addParam(pkEntity)}
          UNION ALL
          -- the outgoing statements
          SELECT t1.pk_entity
          FROM information."role" t1
          WHERE t1.fk_temporal_entity = ${this.addParam(pkEntity)}
          UNION ALL
          -- the text properties
          SELECT t2.pk_entity
          FROM information.text_property t2
          WHERE t2.fk_concerned_entity = ${this.addParam(pkEntity)}
        )

        AND t1.fk_project = ${this.addParam(fkProject)}
        AND is_in_project = true
        RETURNING t1.*

      ),
      ------------------------------------
      --- group parts by model
      ------------------------------------

      info_proj_rel AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'ProInfoProjRel')} as objects
          FROM (
            SELECT * FROM tw1
          ) AS t1
        ) as t1
        GROUP BY true
      )
      SELECT
      json_build_object (
        'pro', json_strip_nulls(json_build_object(
          'info_proj_rel', info_proj_rel.json
        ))
      ) as data
      FROM
      (select 0 ) as one_row
      LEFT JOIN info_proj_rel ON true;
    `;
    logSql(sql, this.params)
    return { sql, params: this.params };
  }
}
