import { SqlBuilderLbModels } from '../utils/sql-builder-lb-models';

import { Lb3Models } from '../utils/interfaces';
import { logSql } from '../utils';

export class SqlTemporalEntityOwnProperties extends SqlBuilderLbModels {

  constructor(lb3models: Lb3Models) {
    super(lb3models)
  }

  /**
   *
   * @param {*} fkProject
   * @param {*} pkEntity primary key of the temporal entity
   */
  create(fkProject: number, pkEntity: number) {
    const sql = `
    WITH
    -- temporal_entity
    tw3 AS (
      SELECT
        ${this.createSelect('t1', 'InfTemporalEntity')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        information.v_temporal_entity t1,
        projects.info_proj_rel t2
      WHERE  t1.pk_entity = ${this.addParam(pkEntity)}
        AND t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fkProject)}
    ),
    ------------------------------------
    --- group parts by model
    ------------------------------------
    temporal_entity AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select
        distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', 'InfTemporalEntity')} as objects
        FROM
        (
          SELECT
          *
          FROM
          tw3
        ) AS t1
      ) as t1
      GROUP BY true
    ),
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
          tw3
        ) AS t1
      ) as t1
      GROUP BY true
    )
    select
    json_build_object(
      'inf', json_strip_nulls(json_build_object(
        'temporal_entity', temporal_entity.json
      )),
      'pro', json_strip_nulls(json_build_object(
        'info_proj_rel', info_proj_rel.json
      ))
    ) as data
    FROM
    temporal_entity
    LEFT JOIN info_proj_rel ON true

  `;
    logSql(sql, this.params)
    return { sql, params: this.params };
  }
}
