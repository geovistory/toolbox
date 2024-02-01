import {Postgres1DataSource} from '../../datasources';
import {ProInfoProjRel} from '../../models';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


export class QEntityRemoveFromProject extends SqlBuilderLb4Models {

  constructor(
    dataSource: Postgres1DataSource
  ) {
    super(dataSource)
  }

  /**
   * Removes an entity (persitent or temporal) from the project.
   * It updates the info_proj_rel.is_in_project for the following records
   * - The entity itself
   * - The outgoing statements
   * - the namings and their outgoing statements
   *
   * @param fkProject project
   * @param pkEntity the temporal entity to add to the project
   * @param accountId the account of the user performing the action
   */
  query(fkProject: number, pkEntity: number, accountId: number): Promise<GvPositiveSchemaObject> {


    this.sql = `
    -- select items to remove from project
    WITH RECURSIVE tw1 (pk, pk_related) AS (

      -- the entity itself
      SELECT ${this.addParam(pkEntity)}, null::int

      UNION ALL
      -- the outgoing statements
      SELECT t1.pk_entity, null::int
      FROM information.v_statement t1,
        projects.info_proj_rel t2
      WHERE t1.fk_subject_info = ${this.addParam(pkEntity)}
      AND t1.pk_entity = t2.fk_entity
      AND t2.fk_project = ${this.addParam(fkProject)}
      AND t2.is_in_project = true

      UNION ALL
      -- the ingoing statements of property 'has appellation'
      SELECT t1.pk_entity, t1.fk_subject_info
      FROM information."statement" t1,
        projects.info_proj_rel t2
      WHERE t1.fk_object_info = ${this.addParam(pkEntity)}
      AND t1.fk_property = 1111
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
          LEFT JOIN information.resource t2
            ON tw1.pk_related = t2.pk_entity
          WHERE tw1.pk_related IS NOT NULL
          AND (t2.pk_entity IS NOT NULL)
        )

        -- the entity itself
        SELECT pk_related, null::int
        FROM tw

        UNION ALL

        -- the outgoing statements (not in already selected statements)
        SELECT t1.pk_entity, null::int
        FROM information.v_statement t1, tw,
          projects.info_proj_rel t2
        WHERE tw.pk_related = t1.fk_subject_info
        AND t1.pk_entity NOT IN (tw.pk)
        AND t1.pk_entity = t2.fk_entity
        AND t2.fk_project = ${this.addParam(fkProject)}
        AND t2.is_in_project = true

        UNION ALL

        -- the ingoing statements of property 'has appellation'
        SELECT t1.pk_entity, t1.fk_subject_info
        FROM information."statement" t1,	tw,
          projects.info_proj_rel t2
        WHERE tw.pk_related = t1.fk_object_info
        AND t1.fk_property = 1111
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
          ${this.createBuildObject('t1', ProInfoProjRel.definition)} as objects
          FROM (
            SELECT * FROM tw2
          ) AS t1
        ) as t1
        GROUP BY 1=1
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
    return this.executeAndReturnFirstData<GvPositiveSchemaObject>();
  }
}
