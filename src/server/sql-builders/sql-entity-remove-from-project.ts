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
   * - the namings and their outgoing statements and text properties
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
    -- select items to remove from project
    WITH RECURSIVE tw1 (pk, pk_related) AS (

      -- the entity itself
      SELECT ${this.addParam(pkEntity)}, null::int

      UNION ALL
      -- the outgoing statements
      SELECT t1.pk_entity, null::int
      FROM information.v_statement t1,
        projects.info_proj_rel t2
      WHERE t1.fk_temporal_entity = ${this.addParam(pkEntity)}
      AND t1.pk_entity = t2.fk_entity
      AND t2.fk_project = ${this.addParam(fkProject)}
      AND t2.is_in_project = true

      UNION ALL
      -- the ingoing statements of property 'has appellation'
      SELECT t1.pk_entity, t1.fk_temporal_entity
      FROM information."statement" t1,
        projects.info_proj_rel t2
      WHERE t1.fk_entity = ${this.addParam(pkEntity)}
      AND t1.fk_property = 1111
      AND t1.pk_entity = t2.fk_entity
      AND t2.fk_project = ${this.addParam(fkProject)}
      AND t2.is_in_project = true

      UNION ALL
      -- the text properties
      SELECT t1.pk_entity, null::int
      FROM information.text_property t1,
        projects.info_proj_rel t2
      WHERE t1.fk_concerned_entity = ${this.addParam(pkEntity)}
      AND t1.pk_entity = t2.fk_entity
      AND t2.fk_project = ${this.addParam(fkProject)}
      AND t2.is_in_project = true

      UNION ALL
      SELECT * FROM (
        WITH tw AS (
          -- Workaround of error: recursive reference to query "tw1" must not appear more than once
          -- Filter the pk_related pointing to a PeIt or TeEn
            SELECT *
          FROM tw1
          LEFT JOIN information.persistent_item t2
            ON tw1.pk_related = t2.pk_entity
          LEFT JOIN information.temporal_entity t3
            ON tw1.pk_related = t3.pk_entity
          WHERE tw1.pk_related IS NOT NULL
          AND (t2.pk_entity IS NOT NULL OR t3.pk_entity IS NOT NULL)
        )

        -- the entity itself
        SELECT pk_related, null::int
        FROM tw

        UNION ALL

        -- the outgoing statements (not in already selected statements)
        SELECT t1.pk_entity, null::int
        FROM information.v_statement t1, tw,
          projects.info_proj_rel t2
        WHERE tw.pk_related = t1.fk_temporal_entity
        AND t1.pk_entity NOT IN (tw.pk)
        AND t1.pk_entity = t2.fk_entity
        AND t2.fk_project = ${this.addParam(fkProject)}
        AND t2.is_in_project = true

        UNION ALL

        -- the ingoing statements of property 'has appellation'
        SELECT t1.pk_entity, t1.fk_temporal_entity
        FROM information."statement" t1,	tw,
          projects.info_proj_rel t2
        WHERE tw.pk_related = t1.fk_entity
        AND t1.fk_property = 1111
        AND t1.pk_entity = t2.fk_entity
        AND t2.fk_project = ${this.addParam(fkProject)}
        AND t2.is_in_project = true

        UNION ALL

        -- the text properties
        SELECT t1.pk_entity, null::int
        FROM information.text_property t1, tw,
          projects.info_proj_rel t2
        WHERE tw.pk_related = t1.fk_concerned_entity
        AND t1.pk_entity = t2.fk_entity
        AND t2.fk_project = ${this.addParam(fkProject)}
        AND t2.is_in_project = true


      )t

    ),
    -- update the info_proj_rels
    tw2 AS (

        UPDATE projects.info_proj_rel t1
        SET is_in_project = false,
        fk_last_modifier = ${this.addParam(accountId)}
        WHERE t1.fk_entity IN (
          SELECT pk
          FROM tw1
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
            SELECT * FROM tw2
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
