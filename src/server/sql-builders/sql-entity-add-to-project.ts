import { SqlBuilderLbModels } from '../utils/sql-builder-lb-models';

import { Lb3Models } from '../utils/interfaces';
import { logSql } from '../utils';

export class SqlEntityAddToProject extends SqlBuilderLbModels {

  constructor(lb3models: Lb3Models) {
    super(lb3models)
  }


  /**
   * Adds an entity (persitent or temporal) to the project.
   * It inserts or updates the info_proj_rel.is_in_project for the following records
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
    -- select items to add to project
    WITH RECURSIVE tw1 (pk, pk_related, calendar) AS (

      -- the entity itself
      SELECT ${this.addParam(pkEntity)}, null::int, null::calendar_type

      UNION ALL
      -- the outgoing statements
      SELECT t1.pk_entity, null::int, t1.calendar
      FROM information.get_outgoing_statements_to_add(${this.addParam(pkEntity)},  ${this.addParam(fkProject)}) t1

      UNION ALL
      -- the ingoing statements of property 'has appellation'
      SELECT t1.pk_entity, t1.fk_subject_info, null::calendar_type
      FROM information.v_statement t1
      WHERE t1.fk_object_info = ${this.addParam(pkEntity)}
      AND t1.fk_property = 1111
      AND t1.is_in_project_count > 0

      UNION ALL
      -- the text properties
      SELECT t2.pk_entity, null::int, null::calendar_type
      FROM information.text_property t2
      WHERE t2.fk_concerned_entity = ${this.addParam(pkEntity)}

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
        SELECT pk_related, null::int, null::calendar_type
        FROM tw

        UNION ALL

        -- the outgoing statements (not in already selected statements)
        SELECT t1.pk_entity, null::int, t1.calendar
        FROM tw
        CROSS JOIN LATERAL
          (
            SELECT *
            FROM information.get_outgoing_statements_to_add(tw.pk_related,  ${this.addParam(fkProject)})
          ) t1
        WHERE t1.pk_entity NOT IN (tw.pk)

        UNION ALL

        -- the ingoing statements of property 'has appellation'
        SELECT t1.pk_entity, t1.fk_subject_info, null::calendar_type
        FROM information.v_statement t1,	tw
        WHERE tw.pk_related = t1.fk_object_info
        AND t1.fk_property = 1111
        AND t1.is_in_project_count > 0

        UNION ALL

        -- the text properties
        SELECT t2.pk_entity, null::int, null::calendar_type
        FROM information.text_property t2, tw
        WHERE tw.pk_related = t2.fk_concerned_entity
      )t

    ),
    -- insert the info_proj_rels
    tw2 AS (

        INSERT INTO projects.v_info_proj_rel (fk_last_modifier, fk_entity, fk_project, calendar, is_in_project)
        SELECT
          ${this.addParam(accountId)},
          pk,
          ${this.addParam(fkProject)},
          calendar,
          true
        FROM tw1
        RETURNING *
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
