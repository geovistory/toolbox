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
    -- outgoing_roles of temporal_entity
    tw4 AS (
      SELECT
        ${this.createSelect('t1', 'InfStatement')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw3
        CROSS JOIN information.v_role t1,
        projects.info_proj_rel t2
      WHERE
        tw3.pk_entity = t1.fk_temporal_entity
        AND t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fkProject)}
    ),
    --appellation
    tw5 AS (
      SELECT
        ${this.createSelect('t1', 'InfAppellation')}
      FROM
        tw4
        CROSS JOIN information.v_appellation t1
      WHERE
        tw4.fk_entity = t1.pk_entity
    ),
    -- language
    tw6 AS (
      SELECT
        ${this.createSelect('t1', 'InfLanguage')}
      FROM
        tw4
        CROSS JOIN information.v_language t1
      WHERE
        tw4.fk_entity = t1.pk_entity
    ),
    -- time_primitive
    tw7 AS (
      SELECT
        ${this.createSelect('t1', 'InfTimePrimitive')}
      FROM
        tw4
        CROSS JOIN information.v_time_primitive t1
      WHERE
        tw4.fk_entity = t1.pk_entity
    ),
    -- place
    tw8 AS (
      SELECT
        ${this.createSelect('t1', 'InfPlace')}
      FROM
        tw4
        CROSS JOIN information.v_place t1
      WHERE
        tw4.fk_entity = t1.pk_entity
    ),
    -- ingoing_roles of temporal_entity
    tw9 AS (
      SELECT
        ${this.createSelect('t1', 'InfStatement')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw3
        CROSS JOIN information.v_role t1,
        projects.info_proj_rel t2
      WHERE
        tw3.pk_entity = t1.fk_entity
        AND t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fkProject)}
    ),
    -- text_properties
    tw10 AS (
      SELECT
        ${this.createSelect('t1', 'InfTextProperty')},
        ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
      FROM
        tw3
      CROSS JOIN
        information.v_text_property t1,
        projects.info_proj_rel t2
      WHERE t1.fk_concerned_entity = tw3.pk_entity
      AND t1.pk_entity = t2.fk_entity
      AND t2.is_in_project = true
      AND t2.fk_project = ${this.addParam(fkProject)}
    ),
    -- has type role
    tw11 AS (
      SELECT
        ${this.createSelect('t1', 'InfStatement')},
        ${this.createBuildObject('t3', 'ProInfoProjRel')} proj_rel
      FROM
        tw3
      CROSS JOIN
        information.v_role t1,
        data_for_history.v_property t2,
        projects.info_proj_rel t3
      WHERE t1.fk_temporal_entity = tw3.pk_entity
      AND t1.fk_property = t2.pk_property
      AND t2.is_has_type_subproperty = true
      AND t1.pk_entity = t3.fk_entity
      AND t3.is_in_project = true
      AND t3.fk_project = ${this.addParam(fkProject)}
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
          UNION ALL
          SELECT
          proj_rel
          FROM
          tw4
          UNION ALL
          SELECT
          proj_rel
          FROM
          tw9
          UNION ALL
          SELECT
          proj_rel
          FROM
          tw10
          UNION ALL
          SELECT
          proj_rel
          FROM
          tw11
        ) AS t1
      ) as t1
      GROUP BY true
    ),
    role AS (
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
          tw4
          UNION ALL
          SELECT
          *
          FROM
          tw9
          UNION ALL
          SELECT
          *
          FROM
          tw11
        ) AS t1
      ) as t1
      GROUP BY true
    ),
    appellation AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select
        distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', 'InfAppellation')} as objects
        FROM
        (
          SELECT
          *
          FROM
          tw5
        ) AS t1
      ) as t1
      GROUP BY true
    ),
    language AS (
      SELECT json_agg(t2.objects) as json
      FROM (
        select
        distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', 'InfLanguage')} as objects
        FROM
        (
          SELECT
          *
          FROM
          tw6
        ) AS t1
      ) as t2
      GROUP BY true
    ),
    time_primitive AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select
        distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', 'InfTimePrimitive')} as objects
        FROM
        (
          SELECT
          *
          FROM
          tw7
        ) AS t1
      ) as t1
      GROUP BY true
    ),
    place AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select
        distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', 'InfPlace')} as objects
        FROM
        (
          SELECT
          *
          FROM
          tw8
        ) AS t1
      ) as t1
      GROUP BY true
    ),
    text_property AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', 'InfTextProperty')} as objects
        FROM (
          SELECT * FROM tw10
        ) AS t1
      ) as t1
      GROUP BY true
    )
    select
    json_build_object(
      'inf', json_strip_nulls(json_build_object(
        'role', role.json,
        'temporal_entity', temporal_entity.json,
        'appellation', appellation.json,
        'language', language.json,
        'time_primitive', time_primitive.json,
        'place', place.json,
        'text_property', text_property.json
      )),
      'pro', json_strip_nulls(json_build_object(
        'info_proj_rel', info_proj_rel.json
      ))
    ) as data
    FROM
    temporal_entity
    LEFT JOIN role ON true
    LEFT JOIN appellation ON true
    LEFT JOIN language ON true
    LEFT JOIN time_primitive ON true
    LEFT JOIN place ON true
    LEFT JOIN text_property ON true
    LEFT JOIN info_proj_rel ON true

  `;
    logSql(sql, this.params)
    return { sql, params: this.params };
  }
}
