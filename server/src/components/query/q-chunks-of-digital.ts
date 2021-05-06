import {PK_PROPERTY_REFERS_TO} from '../../config';
import {Postgres1DataSource} from '../../datasources';
import {DatChunk, InfStatement, ProInfoProjRel} from '../../models';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


export class QChunksOfDigital extends SqlBuilderLb4Models {

  constructor(
    dataSource: Postgres1DataSource
  ) {
    super(dataSource)
  }

  /**
  * Find chunks related to digital
  *
  * @param {*} fkProject
  */
  query(fkProject: number, pkDigital: number): Promise<GvPositiveSchemaObject> {


    this.sql = `
      WITH
      tw1 AS (
        WITH namespaces AS (
          SELECT pk_entity pk_namespace
          FROM data.namespace n
          WHERE n.fk_project = ${this.addParam(fkProject)}
        )
        SELECT  ${this.createSelect('t1', DatChunk.definition)}
        FROM data.chunk t1
        JOIN data.digital t2 ON t1.fk_text = t2.pk_text
        JOIN namespaces t3 ON t3.pk_namespace = t2.fk_namespace
        WHERE t2.pk_entity = ${this.addParam(pkDigital)}
      ),
      -- refers to statements
      tw2 AS (
        SELECT
          ${this.createSelect('t1', InfStatement.definition)},
          ${this.createBuildObject('t2', ProInfoProjRel.definition)} proj_rel
        FROM
          tw1
        CROSS JOIN
          information.v_statement t1,
          projects.info_proj_rel t2
        WHERE
        tw1.pk_entity = t1.fk_subject_data
        AND t1.fk_property = ${this.addParam(PK_PROPERTY_REFERS_TO)}
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
            SELECT proj_rel FROM tw2
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
            SELECT * FROM tw2
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      chunk AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', DatChunk.definition)} as objects
          FROM (
            SELECT * FROM tw1
          ) AS t1
        ) as t1
        GROUP BY true
      )
      SELECT
      json_build_object (
        'dat', json_strip_nulls(json_build_object(
          'chunk', chunk.json
        )),
        'inf', json_strip_nulls(json_build_object(
          'statement', statement.json
        )),
        'pro', json_strip_nulls(json_build_object(
          'info_proj_rel', info_proj_rel.json
        ))
      ) as data
      FROM
      (select 0 ) as one_row
      LEFT JOIN statement ON true
      LEFT JOIN chunk ON true
      LEFT JOIN info_proj_rel ON true;
    `;
    return this.executeAndReturnFirstData<GvPositiveSchemaObject>();

  }

}
