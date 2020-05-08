import { SqlBuilderLbModels } from '../utils/sql-builder-lb-models';

import { Lb3Models } from '../utils/interfaces';
import { logSql } from '../utils';

export class SqlTypeItem extends SqlBuilderLbModels {

  constructor(lb3models: Lb3Models) {
    super(lb3models)
  }

  /**
  * Queries one instance of E55 Type of given project with the minimal related information
  * returning a SchemaObject
  * - all appellations
  * - all text properties
  *
  * @param {*} fkProject
  * @param {*} pkType
  */
  create(fkProject: number, pkType: number) {
    const sql = `
      WITH
      -- persistent item (type)
      tw1 AS (
        SELECT
          ${this.createSelect('t1', 'InfPersistentItem')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          information.v_persistent_item t1
        CROSS JOIN
          projects.info_proj_rel t2
        WHERE t1.pk_entity = ${this.addParam(pkType)}
        AND t2.fk_project = ${this.addParam(fkProject)}
        AND t2.is_in_project = true

      ),
      -- roles 'has appellation'
      tw2 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw1 t0,
          information.v_role t1,
          projects.info_proj_rel t2
        WHERE t1.fk_property = 1111
        AND t1.fk_entity = t0.pk_entity
        AND t1.pk_entity = t2.fk_entity
        AND t2.fk_project = ${this.addParam(fkProject)}
        AND t2.is_in_project = true
        LIMIT 10
      ),
      -- temporal_entity 'Name use for language'
      tw3 AS (
        SELECT
          ${this.createSelect('t1', 'InfTemporalEntity')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw2 t0
        CROSS JOIN
          information.v_temporal_entity t1,
          projects.info_proj_rel t2
        WHERE
          t0.fk_temporal_entity = t1.pk_entity
          AND t1.pk_entity = t2.fk_entity
          AND t2.is_in_project = true
          AND t2.fk_project = ${this.addParam(fkProject)}
      ),
      -- roles outgoing of temporal_entity 'Name use for language'
      tw4 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')},
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
      -- text_properties
      tw7 AS (
        SELECT
          ${this.createSelect('t1', 'InfTextProperty')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw1 t0
        CROSS JOIN
          information.v_text_property t1,
          projects.info_proj_rel t2
        WHERE t1.fk_concerned_entity = t0.pk_entity
        AND t1.fk_class_field = 219
        AND t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fkProject)}
      ),
      ------------------------------------
      --- group parts by model
      ------------------------------------

      info_proj_rel AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.proj_rel->>'pk_entity') t1.proj_rel as objects
          FROM (
            SELECT proj_rel FROM tw1
            UNION ALL
            SELECT proj_rel FROM tw2
            UNION ALL
            SELECT proj_rel FROM tw3
            UNION ALL
            SELECT proj_rel FROM tw4
            UNION ALL
            SELECT proj_rel FROM tw7
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      persistent_item AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfPersistentItem')} as objects
          FROM (
            SELECT * FROM tw1
          ) AS t1
        ) as t1
        GROUP BY true
      ),
       role AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfRole')} as objects
          FROM
          (
            SELECT * FROM tw2
            UNION ALL
            SELECT * FROM tw4
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      temporal_entity AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfTemporalEntity')} as objects
          FROM
          (
            SELECT * FROM tw3
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
            SELECT * FROM tw5
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
            SELECT * FROM tw6
          ) AS t1
        ) as t2
        GROUP BY true
      ),
      text_property AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfTextProperty')} as objects
          FROM (
            SELECT * FROM tw7
          ) AS t1
        ) as t1
        GROUP BY true
      )
      SELECT
      json_build_object (
        'inf', json_strip_nulls(json_build_object(
          'persistent_item', persistent_item.json,
          'role', role.json,
          'temporal_entity', temporal_entity.json,
          'appellation', appellation.json,
          'language', language.json,
          'text_property', text_property.json
        )),
        'pro', json_strip_nulls(json_build_object(
          'info_proj_rel', info_proj_rel.json
        ))
      ) as data
      FROM
      persistent_item
      LEFT JOIN info_proj_rel ON true
      LEFT JOIN role ON true
      LEFT JOIN temporal_entity ON true
      LEFT JOIN appellation ON true
      LEFT JOIN language ON true
      LEFT JOIN text_property ON true;
    `;

    logSql(sql, this.params);

    return { sql, params: this.params };
  }

}
