import { SqlBuilderLbModels } from '../utils/sql-builder-lb-models';

import { Lb3Models } from '../utils/interfaces';
import { logSql } from '../utils';

export class SqlEntityPreviewList extends SqlBuilderLbModels {

  constructor(lb3models: Lb3Models) {
    super(lb3models)
  }

  /**
   * Returns a SchemaObject with everything needed to create a paginated list of
   * EntityPreview, related to the given source entity
   *
   * @param fkProject project
   * @param fkSourceEntity the entity on which we are in the GUI
   * @param fkProperty the property that connects source entity with the target entities
   * @param fkTargetClass the class of the entity previews
   * @param isOutgoing if true, source = subject + target = object; if false, source = object + target = subject
   * @param limit page size for pagination
   * @param offset offset for pagination
   */
  create(
    fkProject: number,
    fkSourceEntity: number,
    fkProperty: number,
    fkTargetClass: number,
    isOutgoing: boolean,
    limit: number,
    offset: number
  ) {
    const mainWhere = `
      --if isOutgoing join with fk_subject_info , else fk_object_info
      t1.${isOutgoing ? 'fk_subject_info' : 'fk_object_info'} =
        ${this.addParam(fkSourceEntity)}
      --  add the pk_entity of the 'source' entity here
      AND t1.fk_property = ${this.addParam(fkProperty)} -- add the pk_property
      AND t2.fk_project = ${this.addParam(fkProject)} -- add the pk_project here
      AND t1.${isOutgoing ? 'fk_object_info' : 'fk_subject_info'} = t3.pk_entity
      AND t1.pk_entity = t2.fk_entity
      AND t2.is_in_project = true
      AND t3.fk_class = ${this.addParam(fkTargetClass)}
    `;

    const sql = `
      WITH
      -- count
      tw1 AS (
       SELECT count(*)
       FROM
          information.v_statement t1,
          projects.info_proj_rel t2,
          information.v_entity_class_map t3
       WHERE
         ${mainWhere}
       GROUP BY TRUE
      ),
      -- statements
      tw2 AS (
        SELECT
          ${this.createSelect('t1', 'InfStatement')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          information.v_statement t1,
          projects.info_proj_rel t2,
          information.v_entity_class_map t3
        WHERE
          ${mainWhere}
        LIMIT ${this.addParam(limit)} -- add limit
        OFFSET ${this.addParam(offset)} -- add offset
      ),
      ------------------------------------
      --- group parts by model
      ------------------------------------
      info_proj_rel AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.proj_rel ->> 'pk_entity') t1.proj_rel as objects
          FROM
          (
            SELECT
            proj_rel
            FROM
            tw2
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      statement AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfStatement')} as objects
          FROM
          (
            SELECT
            *
            FROM
            tw2
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      paginatedStatements AS (
        SELECT COALESCE(json_agg(t1.pk_entity), '[]'::json) as json
        FROM
          tw2 as t1
      )
      select
      json_build_object(
        'count', tw1.count,
        'schemas', json_build_object (
          'inf', json_strip_nulls(json_build_object(
            'statement', statement.json
          )),
          'pro', json_strip_nulls(json_build_object(
            'info_proj_rel', info_proj_rel.json
          ))
        ),
        'paginatedStatements', paginatedStatements.json
      ) as data

      FROM
      tw1
      LEFT JOIN paginatedStatements ON true
      LEFT JOIN statement ON true
      LEFT JOIN info_proj_rel ON true

    `;
    logSql(sql, this.params)
    return { sql, params: this.params };
  }
}
