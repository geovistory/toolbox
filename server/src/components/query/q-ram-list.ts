import {Postgres1DataSource} from '../../datasources';
import {GvSchemaObject} from '../../models/gv-schema-object.model';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';
import {WarEntityPreview, ProInfoProjRel, InfStatement, InfLangString, DatChunk, DatDigital} from '../../models';
import {Streams} from '../../realtime/streams/streams';
import {TabCell} from '../../models/tab-cell.model';


export class QRamList extends SqlBuilderLb4Models {

  constructor(
    dataSource: Postgres1DataSource,
    private streams: Streams
  ) {
    super(dataSource)
  }

  /**
 * Joins the spot (chunk or cell, later maybe also spot in image) and the
 * digital.
 * @param refersTo
 */
  joinSpotAndDigital(refersTo?: 'Chunk' | 'Cell') {
    if (refersTo === 'Chunk') {
      return `,
      data.chunk t3,
      data.digital t4
      `
    }
    else if (refersTo === 'Cell') {
      return `,
      tables.cell t3,
      data.digital t4
      `
    }
    return ``
  }

  selectDigital(refersTo?: 'Chunk' | 'Cell') {
    if (refersTo === 'Chunk') {
      return `
      t3.pk_entity pk_spot,
      t4.pk_entity pk_digital
      `
    }
    else if (refersTo === 'Cell') {
      return `
      t3.pk_cell pk_spot,
      t4.pk_entity pk_digital
      `
    }
    return `
      NULL::integer pk_spot,
      NULL::integer pk_digital
    `
  }

  whereRefersTo(refersTo?: 'Chunk' | 'Cell') {
    if (refersTo === 'Chunk') {
      return `
      WHERE t3.pk_entity = t1.fk_subject_data
      AND t3.fk_text = t4.pk_text
      `
    }
    else if (refersTo === 'Cell') {
      return `
      WHERE  t3.pk_cell = t1.fk_subject_tables_cell
      AND t3.fk_digital = t4.pk_entity
      `
    }
    return ''
  }

  twSpotModel(refersTo?: 'Chunk' | 'Cell') {
    if (refersTo === 'Chunk') {
      return `
      -- chunks
      twd3 AS (
        SELECT
          ${this.createSelect('t1', DatChunk.definition)}
        FROM
          tw0
        CROSS JOIN
          data.v_chunk t1
        WHERE t1.pk_entity = tw0.pk_spot
      ),
      `
    }
    else if (refersTo === 'Cell') {
      return `
      -- cells
      twd3 AS (
        SELECT
          ${this.createSelect('t1', TabCell.definition)}
        FROM
          tw0
        CROSS JOIN
          tables.cell t1
        WHERE t1.pk_cell = tw0.pk_spot
      ),
      `
    }
    return ''
  }

  groupSpotModel(refersTo?: 'Chunk' | 'Cell') {
    if (refersTo === 'Chunk') {
      return `
      chunk AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', DatChunk.definition)} as objects
          FROM (
            SELECT * FROM twd3
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      `
    }
    else if (refersTo === 'Cell') {
      return `
      cell AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_cell)
          ${this.createBuildObject('t1', TabCell.definition)} as objects
          FROM (
            SELECT * FROM twd3
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      `
    }
    return ''
  }

  buildObjectForSpotModel(refersTo?: 'Chunk' | 'Cell') {
    if (refersTo === 'Chunk') {
      return `,
      'dat', json_strip_nulls(json_build_object(
        'chunk', chunk.json,
        'digital', digital.json
      ))
      `
    }
    else if (refersTo === 'Cell') {
      return `,
      'dat', json_strip_nulls(json_build_object(
        'digital', digital.json
      )),
      'tab', json_strip_nulls(json_build_object(
        'cell', cell.json
      ))
      `
    }
    return ''
  }


  leftJoinGroupedSpotModel(refersTo?: 'Chunk' | 'Cell') {
  if (refersTo === 'Chunk') {
      return `
      LEFT JOIN chunk ON true
      `
    }
    else if (refersTo === 'Cell') {
      return `
      LEFT JOIN cell ON true
      `
    }
    return ''
  }



  /**
   *
   * @param {*} fkProject
   * @param {*} pkEntity primary key of the Expression entity, for which we need the tree.
   * @param {*} fkProperty key of the property connecting the entity with Expression / Expr. Portion / Chunk:
   *                       1218 = mentions, 117 = is about, 1334 = refers to
   * @param {*} refersTo Chunk | Cell
   */
  async query(pkEntity: number, fkProject: number, fkProperty: number, refersTo?: 'Chunk' | 'Cell'): Promise<GvSchemaObject> {


    this.sql = `
    WITH RECURSIVE tw0 (fk_subject_info, fk_subject_data, fk_property, fk_object_info, fk_object_data, level, pk_entity, path, pk_spot, pk_digital) AS (
      WITH tw_statements AS (
        SELECT t1.*
        FROM
              information.statement t1,
              projects.info_proj_rel t2
        WHERE t1.pk_entity = t2.fk_entity
        AND 	t2.fk_project = ${this.addParam(fkProject)}
        AND 	t2.is_in_project = TRUE
        AND 	t1.fk_object_info = ${this.addParam(pkEntity)}
        AND 	t1.fk_property = ${this.addParam(fkProperty)}
      )
      SELECT    t1.fk_subject_info,
                t1.fk_subject_data,
                t1.fk_property,
                t1.fk_object_info,
                t1.fk_object_data,
                0,
                t1.pk_entity,
                ARRAY[t1.pk_entity],
                ${this.selectDigital(refersTo)}
      FROM      tw_statements t1
      ${this.joinSpotAndDigital(refersTo)}
      ${this.whereRefersTo(refersTo)}

      UNION ALL

      SELECT    p.fk_subject_info,
                p.fk_subject_data,
                p.fk_property,
                p.fk_object_info,
                p.fk_object_data,
                t0.level + 1,
                p.pk_entity,
                ARRAY_APPEND(t0.path, p.pk_entity),
                NULL::integer as pk_spot,
                NULL::integer as pk_digital
      FROM      information.statement p,
                tw0 t0,
                projects.info_proj_rel t2
      WHERE
                (
                      -- statements where subject_info equals subject_info of parent statement (-> going out of parent subject)
                      (
                        p.fk_subject_info = t0.fk_subject_info
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
                        p.fk_subject_info = t0.fk_object_info
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
                        p.fk_object_info = t0.fk_object_info
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
          ${this.createSelect('t1', WarEntityPreview.definition)},
          ${this.createBuildObject('t2', ProInfoProjRel.definition)} proj_rel
        FROM
          war.entity_preview t1
        JOIN tw0 t3
          ON t1.pk_entity = t3.fk_subject_info
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
          ${this.createSelect('t1', WarEntityPreview.definition)},
          ${this.createBuildObject('t2', ProInfoProjRel.definition)} proj_rel
        FROM
          war.entity_preview t1
        JOIN tw0 t3
          ON t1.pk_entity = t3.fk_object_info
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
          ${this.createSelect('t1', InfStatement.definition)},
          ${this.createBuildObject('t2', ProInfoProjRel.definition)} proj_rel
        FROM
          tw0
        CROSS JOIN
          information.v_statement t1,
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
          ${this.createSelect('t1', InfStatement.definition)},
          ${this.createBuildObject('t2', ProInfoProjRel.definition)} proj_rel
        FROM
          tw0
        CROSS JOIN
          information.v_statement t1,
          projects.info_proj_rel t2
        WHERE t1.fk_subject_info = tw0.pk_entity
        AND t1.fk_property_of_property = 1
        AND t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fkProject)}
      ),
      -- lang_string (Reference)
      tw5 AS (
        SELECT
          ${this.createSelect('t1', InfLangString.definition)}
        FROM
          tw4
        CROSS JOIN
          information.v_lang_string t1
        WHERE t1.pk_entity = tw4.fk_object_info
      ),
      ${this.twSpotModel(refersTo)}
      -- digitals
      twd4 AS (
        SELECT
          ${this.createSelect('t1', DatDigital.definition)}
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
            UNION ALL
            SELECT proj_rel FROM tw4
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      entity_preview AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', WarEntityPreview.definition)} as objects
          FROM (
            SELECT * FROM tw1
            UNION ALL
            SELECT * FROM tw2
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      statement AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', InfStatement.definition)} as objects
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
          ${this.createBuildObject('t1', InfLangString.definition)} as objects
          FROM (
            SELECT * FROM tw5
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      ${this.groupSpotModel(refersTo)}
      digital AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', DatDigital.definition)} as objects
          FROM (
            SELECT * FROM twd4
          ) AS t1
        ) as t1
        GROUP BY true
      )
      SELECT
      json_build_object (
        'inf', json_strip_nulls(json_build_object(
          'statement', statement.json,
          'lang_string', lang_string.json
        )),
        'pro', json_strip_nulls(json_build_object(
          'info_proj_rel', info_proj_rel.json
        )),
        'war', json_strip_nulls(json_build_object(
          'entity_preview', entity_preview.json
        ))
        ${this.buildObjectForSpotModel(refersTo)}
      ) as data
      FROM
      (select 0 ) as one_row
      LEFT JOIN entity_preview ON true
      LEFT JOIN statement ON true
      LEFT JOIN lang_string ON true
      LEFT JOIN info_proj_rel ON true
      ${this.leftJoinGroupedSpotModel(refersTo)}
      LEFT JOIN digital ON true
    `;

    this.getBuiltQuery()

    return this.executeAndReturnFirstData<GvSchemaObject>();
  }
}