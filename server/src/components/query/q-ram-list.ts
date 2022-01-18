import {ModelDefinition} from '@loopback/repository';
import {Postgres1DataSource} from '../../datasources';
import {InfAppellation, InfLangString, InfStatement, ProInfoProjRel, WarEntityPreviewWithFulltext} from '../../models';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';
import {TabCell} from '../../models/tab-cell.model';
import {Streams} from '../../realtime/streams/streams';
import {SqlBuilderLb4Models, With} from '../../utils/sql-builders/sql-builder-lb4-models';


export class QRamList extends SqlBuilderLb4Models {

  infStatementWiths: string[] = ['tw3', 'tw4']
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
    // if (refersTo === 'Chunk') {
    //   return `,
    //   data.chunk t3,
    //   data.digital t4
    //   `
    // }
    // else
    if (refersTo === 'Cell') {
      return `,
      tables.cell t3,
      data.digital t4
      `
    }
    return ``
  }

  selectDigital(refersTo?: 'Chunk' | 'Cell') {
    // if (refersTo === 'Chunk') {
    //   return `
    //   t3.pk_entity pk_spot,
    //   t4.pk_entity pk_digital
    //   `
    // }
    // else
    if (refersTo === 'Cell') {
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
    // if (refersTo === 'Chunk') {
    //   return `
    //   WHERE t3.pk_entity = t1.fk_subject_data
    //   AND t3.fk_text = t4.pk_text
    //   `
    // }
    // else
    if (refersTo === 'Cell') {
      return `
      WHERE  t3.pk_cell = t1.fk_subject_tables_cell
      AND t3.fk_digital = t4.pk_entity
      `
    }
    return ''
  }

  twSpotModel(refersTo?: 'Chunk' | 'Cell') {
    if (refersTo === 'Chunk') {
      this.infStatementWiths.push('twd4')

      return `
      -- chunks from information.appellation
      twd3 AS (
        SELECT
          ${this.createBuildAndAddObject(this.objectWiths.inf.appellation, {twName: 'twd3', colName: 'o'}, 't1', InfAppellation.definition)} o
        FROM
          tw0
        CROSS JOIN
          information.appellation t1
        WHERE t1.pk_entity = tw0.fk_object_info
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

  // groupSpotModel(refersTo?: 'Chunk' | 'Cell') {
  //   if (refersTo === 'Chunk') {
  //     return `
  //     chunk AS (
  //       SELECT json_agg(t1.objects) as json
  //       FROM (
  //         select distinct on (t1.pk_entity)
  //         ${this.createBuildObject('t1', DatChunk.definition)} as objects
  //         FROM (
  //           SELECT * FROM twd3
  //         ) AS t1
  //       ) as t1
  //       GROUP BY true
  //     ),
  //     `
  //   }
  //   else if (refersTo === 'Cell') {
  //     return `
  //     cell AS (
  //       SELECT json_agg(t1.objects) as json
  //       FROM (
  //         select distinct on (t1.pk_cell)
  //         ${this.createBuildObject('t1', TabCell.definition)} as objects
  //         FROM (
  //           SELECT * FROM twd3
  //         ) AS t1
  //       ) as t1
  //       GROUP BY true
  //     ),
  //     `
  //   }
  //   return ''
  // }

  // buildObjectForSpotModel(refersTo?: 'Chunk' | 'Cell') {
  //   if (refersTo === 'Chunk') {
  //     return `,
  //     'dat', json_strip_nulls(json_build_object(
  //       'chunk', chunk.json,
  //       'digital', digital.json
  //     ))
  //     `
  //   }
  //   else if (refersTo === 'Cell') {
  //     return `,
  //     'dat', json_strip_nulls(json_build_object(
  //       'digital', digital.json
  //     )),
  //     'tab', json_strip_nulls(json_build_object(
  //       'cell', cell.json
  //     ))
  //     `
  //   }
  //   return ''
  // }


  // leftJoinGroupedSpotModel(refersTo?: 'Chunk' | 'Cell') {
  //   if (refersTo === 'Chunk') {
  //     return `
  //     LEFT JOIN chunk ON true
  //     `
  //   }
  //   else if (refersTo === 'Cell') {
  //     return `
  //     LEFT JOIN cell ON true
  //     `
  //   }
  //   return ''
  // }

  createBuildAndAddObject(wa: With[], w: With, alias: string, model: ModelDefinition) {
    wa.push(w)
    return this.createBuildObject(alias, model)
  }

  /**
   *
   * @param {*} fkProject
   * @param {*} pkEntity primary key of the Expression entity, for which we need the tree.
   * @param {*} fkProperty key of the property connecting the entity with Expression / Expr. Portion / Chunk:
   *                       1218 = mentions, 117 = is about, 1334 = refers to
   * @param {*} refersTo Chunk | Cell
   */
  async query(pkEntity: number, fkProject: number, fkProperty: number, refersTo?: 'Chunk' | 'Cell'): Promise<GvPositiveSchemaObject> {


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
      (
        WITH innerTw AS ( SELECT * FROM tw0)
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
                  innerTw t0,
                  projects.info_proj_rel t2
        WHERE
                  (
                        -- statements where subject_info equals subject_info of parent statement (-> going out of parent subject)
                        (
                          p.fk_subject_info = t0.fk_subject_info
                          AND   p.fk_property IN (
                                    99004, -- is annnotation in [Text subclass like Definition, Transcription, etc.]
                                    99005, -- has annotated text [Chunk (stored as information.appellation)]
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
                                    99003, -- is definition of (new)
                                    1317, -- is part of,
                                    1316, -- geovP5 – carrier provided by
                                    979, -- R4 – carriers provided by
                                    1305, -- geovP4 – is server response to request
                                    1216 -- geovP1 – is reproduction of
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
              )
        AND	  p.pk_entity NOT IN(SELECT pk_entity FROM innerTw)
        AND   p.pk_entity = t2.fk_entity
        AND   t2.fk_project = ${this.addParam(fkProject)}
        AND   t2.is_in_project = true
      )
    ),
      -- entity_previews (Expression Portions, Expressions, Defintions, Annotations, ect.)
      tw1 AS (
        SELECT DISTINCT ON (t1.pk_entity)
          ${this.createBuildAndAddObject(this.objectWiths.war.entity_preview, {colName: 'o', twName: 'tw1'}, 't1', WarEntityPreviewWithFulltext.definition)} o,
          ${this.createBuildAndAddObject(this.objectWiths.pro.info_proj_rel, {colName: 'pr', twName: 'tw1'}, 't2', ProInfoProjRel.definition)} pr
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
          ${this.createBuildAndAddObject(this.objectWiths.war.entity_preview, {colName: 'o', twName: 'tw2'}, 't1', WarEntityPreviewWithFulltext.definition)} o,
          ${this.createBuildAndAddObject(this.objectWiths.pro.info_proj_rel, {colName: 'pr', twName: 'tw2'}, 't2', ProInfoProjRel.definition)} pr
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
          ${this.createBuildAndAddObject(this.objectWiths.inf.statement, {colName: 'o', twName: 'tw3'}, 't1', InfStatement.definition)} o,
          ${this.createBuildAndAddObject(this.objectWiths.pro.info_proj_rel, {colName: 'pr', twName: 'tw3'}, 't2', ProInfoProjRel.definition)} pr
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
        t1.fk_object_info,
          ${this.createBuildAndAddObject(this.objectWiths.inf.statement, {colName: 'o', twName: 'tw4'}, 't1', InfStatement.definition)} o,
          ${this.createBuildAndAddObject(this.objectWiths.pro.info_proj_rel, {colName: 'pr', twName: 'tw4'}, 't2', ProInfoProjRel.definition)} pr
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
          ${this.createBuildAndAddObject(this.objectWiths.inf.lang_string, {colName: 'o', twName: 'tw5'}, 't1', InfLangString.definition)} o
        FROM
          tw4
        CROSS JOIN
          information.v_lang_string t1
        WHERE t1.pk_entity = tw4.fk_object_info
      ),
      ${this.twSpotModel(refersTo)}
      ------------------------------------
      --- group parts by model
      ------------------------------------
        ${this.groupPartsByModel()}

      ------------------------------------
      --- final select
      ------------------------------------
      ${this.buildFinalObject()}
    `;

    this.getBuiltQuery('ram-')

    return this.executeAndReturnFirstData<GvPositiveSchemaObject>();
  }
}
