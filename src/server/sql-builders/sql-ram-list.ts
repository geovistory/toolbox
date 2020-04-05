import { SqlBuilderLbModels } from '../utils/sql-builder-lb-models';
import { Lb3Models } from '../utils/interfaces';
import { logSql } from '../utils';

export class SqlRamList extends SqlBuilderLbModels {

  constructor(lb3models: Lb3Models) {
    super(lb3models)
  }

  /**
   *
   * @param {*} fkProject
   * @param {*} pkEntity primary key of the Expression entity, for which we need the tree.
   * @param {*} fkProperty key of the property connecting the entity with Expression / Expr. Portion / Chunk:
   *                       1218 = mentions, 1334 = is about, 117 = refers to
   */
  create(fkProject: number, pkEntity: number, fkProperty: number) {
    const sql = `
    WITH RECURSIVE tw0 (fk_temporal_entity, fk_subject_data, fk_property, fk_entity, fk_object_data, level, pk_entity, path) AS (
        -- is mentioned in
        SELECT  t1.fk_temporal_entity, t1.fk_subject_data, t1.fk_property, t1.fk_entity, t1.fk_object_data, 0, t1.pk_entity, ARRAY[t1.pk_entity]
        FROM    information.role t1,
                projects.info_proj_rel t2
        WHERE   t1.fk_entity = ${this.addParam(pkEntity)}
        AND     t1.pk_entity = t2.fk_entity
        AND 	  t2.fk_project = ${this.addParam(fkProject)}
        AND     t2.is_in_project = true
        AND		  t1.fk_property IN (
          ${this.addParam(fkProperty)}
        )

        UNION ALL

        -- is part of
        SELECT  p.fk_temporal_entity, p.fk_subject_data, p.fk_property, p.fk_entity, p.fk_object_data, t0.level + 1, p.pk_entity, ARRAY_APPEND(t0.path, p.pk_entity)
        FROM    information.role p,
                tw0 t0,
                projects.info_proj_rel t2
        WHERE   (
                  (
                    t0.fk_temporal_entity = p.fk_temporal_entity
                    AND   p.fk_property IN (
                        1317, -- is part of,
                        1316, -- geovP5 – carrier provided by
                        979, -- R4 – carriers provided by
                        1305 -- geovP4 – is server response to request
                      )
                  )
                  OR
                  (
                    t0.fk_temporal_entity = p.fk_entity
                    AND   p.fk_property IN (
                        1016 -- R42 – is representative manifestation singleton for
                      )
                )
        )
        AND	  p.pk_entity != t0.pk_entity
        AND     p.pk_entity = t2.fk_entity
        AND     t2.fk_project = ${this.addParam(fkProject)}
        AND     t2.is_in_project = true


        ),
      -- entity_previews (Expression Portions or Expressions)
      tw1 AS (
        SELECT
          ${this.createSelect('t1', 'WarEntityPreview')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          war.entity_preview t1
        JOIN tw0 t3
          ON t1.pk_entity = t3.fk_temporal_entity
        CROSS JOIN
          projects.info_proj_rel t2
        WHERE t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fkProject)}
      ),

      -- entity_previews (Expression Portions or Expressions)
      tw2 AS (
        SELECT
          ${this.createSelect('t1', 'WarEntityPreview')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          war.entity_preview t1
        JOIN tw0 t3
          ON t1.pk_entity = t3.fk_entity
        CROSS JOIN
          projects.info_proj_rel t2
        WHERE t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fkProject)}
      ),
      -- statements
      -- 1218 = mentions, 1334 = is about, 117 = refers to
      -- 1317 = is part of, 1316 = carrier provided by, 979 = carriers provided by, 1305 = is server res. to req., 1016 = is rep. manif. sing. for
      tw3 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw0
        CROSS JOIN
          information.v_role t1,
          projects.info_proj_rel t2
        WHERE t1.pk_entity = tw0.pk_entity
        AND t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fkProject)}
      ),
      -- statements of statements
      -- 1 = has reference
      tw4 AS (
        SELECT
          ${this.createSelect('t1', 'InfRole')},
          ${this.createBuildObject('t2', 'ProInfoProjRel')} proj_rel
        FROM
          tw0
        CROSS JOIN
          information.v_role t1,
          projects.info_proj_rel t2
        WHERE t1.fk_temporal_entity = tw0.pk_entity
        AND t1.fk_property_of_property = 1
        AND t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fkProject)}
      ),
      -- lang_string (Reference)
      tw5 AS (
        SELECT
          ${this.createSelect('t1', 'InfLangString')}
        FROM
          tw4
        CROSS JOIN
          information.v_lang_string t1
        WHERE t1.pk_entity = tw4.fk_entity
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
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      entity_preview AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'WarEntityPreview')} as objects
          FROM (
            SELECT * FROM tw1
            UNION ALL
            SELECT * FROM tw2
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      role AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfRole')} as objects
          FROM (
            SELECT * FROM tw3
            UNION ALL
            SELECT * FROM tw4
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      lang_string AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'InfLangString')} as objects
          FROM (
            SELECT * FROM tw5
          ) AS t1
        ) as t1
        GROUP BY true
      )
      SELECT
      json_build_object (
        'inf', json_strip_nulls(json_build_object(
          'role', role.json,
          'lang_string', lang_string.json
        )),
        'pro', json_strip_nulls(json_build_object(
          'info_proj_rel', info_proj_rel.json
        )),
        'war', json_strip_nulls(json_build_object(
          'entity_preview', entity_preview.json
        ))
      ) as data
      FROM
      (select 0 ) as one_row
      LEFT JOIN entity_preview ON true
      LEFT JOIN role ON true
      LEFT JOIN lang_string ON true
      LEFT JOIN info_proj_rel ON true
    `;

    logSql(sql, this.params);

    return { sql, params: this.params };
  }
}
