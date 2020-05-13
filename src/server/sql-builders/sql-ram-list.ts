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
   *                       1218 = mentions, 117 = is about, 1334 = refers to
   */
  create(fkProject: number, pkEntity: number, fkProperty: number) {

    const sql = this.getSqlForLinkedEntities(pkEntity, fkProject, fkProperty);

    logSql(sql, this.params);

    return { sql, params: this.params };
  }

  private getSqlForLinkedEntities(pkEntity: number, fkProject: number, fkProperty: number) {
    return `
    WITH RECURSIVE tw0 (fk_temporal_entity, fk_subject_data, fk_property, fk_entity, fk_object_data, level, pk_entity, path, pk_chunk, pk_digital) AS (

      SELECT    t1.fk_temporal_entity,
                t1.fk_subject_data,
                t1.fk_property,
                t1.fk_entity,
                t1.fk_object_data,
                0,
                t1.pk_entity,
                ARRAY[t1.pk_entity],
                t3.pk_entity pk_chunk,
                t4.pk_entity pk_digital
      FROM      information.role t1
      JOIN      projects.info_proj_rel t2
                ON   t1.pk_entity = t2.fk_entity
                AND  t2.fk_project = ${this.addParam(fkProject)}
                AND  t2.is_in_project = true
      LEFT JOIN data.chunk t3
                ON t3.pk_entity = t1.fk_subject_data
      LEFT JOIN	data.digital t4
                ON t3.fk_text = t4.pk_text
      WHERE     t1.fk_entity = ${this.addParam(pkEntity)}
      AND       t1.fk_property IN ( ${this.addParam(fkProperty)} )

      UNION ALL

      SELECT    p.fk_temporal_entity,
                p.fk_subject_data,
                p.fk_property,
                p.fk_entity,
                p.fk_object_data,
                t0.level + 1,
                p.pk_entity,
                ARRAY_APPEND(t0.path, p.pk_entity),
                NULL::integer as pk_chunk,
                NULL::integer as pk_digital
      FROM      information.role p,
                tw0 t0,
                projects.info_proj_rel t2
      WHERE
                (
                      -- statements where subject_info equals subject_info of parent statement (-> going out of parent subject)
                      (
                        p.fk_temporal_entity = t0.fk_temporal_entity
                        AND   p.fk_property IN (
                                  1317, -- is part of,
                                  1316, -- geovP5 – carrier provided by
                                  979, -- R4 – carriers provided by
                                  1305 -- geovP4 – is server response to request
                              )
                      )
              OR
                      -- statements where subject_info equals object_info of parent statement (-> going out of parent object)
                      (
                        p.fk_temporal_entity = t0.fk_entity
                        AND   p.fk_property IN (
                                  1317, -- is part of,
                                  1316, -- geovP5 – carrier provided by
                                  979, -- R4 – carriers provided by
                                  1305 -- geovP4 – is server response to request
                              )
                      )
                      OR
                      -- statements where object_info equals object_info of parent statement (-> going in to parent object)
                      (
                        p.fk_entity = t0.fk_entity
                        AND   p.fk_property IN (
                                  1016 -- R42 – is representative manifestation singleton for
                              )
                      )
                      OR
                       -- statements where subject_data equals digital of parent (-> going out of parent digital)
                      (
                        p.fk_subject_data = t0.pk_digital
                        AND   p.fk_property IN (
                                  1216 -- geovP1 – is reproduction of
                              )
                      )
            )
      AND	  p.pk_entity != t0.pk_entity
      AND   p.pk_entity = t2.fk_entity
      AND   t2.fk_project = ${this.addParam(fkProject)}
      AND   t2.is_in_project = true
    ),
      -- entity_previews (Expression Portions or Expressions)
      tw1 AS (
        SELECT DISTINCT ON (t1.pk_entity)
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
        ORDER BY
          t1.pk_entity,
          CASE WHEN(t1.fk_project = ${this.addParam(fkProject)}) THEN 0
          ELSE 1
          END
      ),

      -- entity_previews (Expression Portions or Expressions)
      tw2 AS (
        SELECT DISTINCT ON (t1.pk_entity)
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
        ORDER BY
          t1.pk_entity,
          CASE WHEN(t1.fk_project = ${this.addParam(fkProject)}) THEN 0
          ELSE 1
          END
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
      -- chunks
      twd3 AS (
        SELECT
          ${this.createSelect('t1', 'DatChunk')}
        FROM
          tw0
        CROSS JOIN
          data.v_chunk t1
        WHERE t1.pk_entity = tw0.pk_chunk
      ),
      -- digitals
      twd4 AS (
        SELECT
          ${this.createSelect('t1', 'DatDigital')}
        FROM
          tw0
        CROSS JOIN
          data.digital t1
        WHERE t1.pk_entity = tw0.pk_digital
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
      ),
      chunk AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'DatChunk')} as objects
          FROM (
            SELECT * FROM twd3
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      digital AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', 'DatDigital')} as objects
          FROM (
            SELECT * FROM twd4
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
        )),
        'dat', json_strip_nulls(json_build_object(
          'chunk', chunk.json,
          'digital', digital.json
        ))
      ) as data
      FROM
      (select 0 ) as one_row
      LEFT JOIN entity_preview ON true
      LEFT JOIN role ON true
      LEFT JOIN lang_string ON true
      LEFT JOIN info_proj_rel ON true
      LEFT JOIN chunk ON true
      LEFT JOIN digital ON true
    `;
  }
}
