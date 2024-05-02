import {Postgres1DataSource} from '../../datasources';
import {InfResource, ProInfoProjRel} from '../../models';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


export class QResource extends SqlBuilderLb4Models {

  constructor(
    dataSource: Postgres1DataSource
  ) {
    super(dataSource)
  }

  /**
   * Creates SQL for querying a SchemaObject containing
   * the resource and its project relation
   *
   * @param {*} fkProject
   * @param {*} pkEntity primary key of the resource.
   */
  query(fkProject: number, pkEntity: number): Promise<GvPositiveSchemaObject> {
    this.sql = `
      WITH tw1 AS (
        SELECT
          ${this.createSelect('t1', InfResource.definition)},
          ${this.createBuildObject('t2', ProInfoProjRel.definition)} proj_rel
        FROM
          information.resource t1
        CROSS JOIN
          projects.info_proj_rel t2
        WHERE t1.pk_entity = t2.fk_entity AND t2.is_in_project = true  AND t2.fk_project = ${this.addParam(
      fkProject
    )}
        AND t1.pk_entity = ${this.addParam(pkEntity)}
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
          ) AS t1
        ) as t1
        GROUP BY 1=1
      ),
      resource AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', InfResource.definition)} as objects
          FROM (
            SELECT * FROM tw1
          ) AS t1
        ) as t1
        GROUP BY 1=1
      )
      SELECT
      json_build_object (
        'inf', json_strip_nulls(json_build_object(
          'resource', resource.json
        )),
        'pro', json_strip_nulls(json_build_object(
          'info_proj_rel', info_proj_rel.json
        ))
      ) as data
      FROM
      resource
      LEFT JOIN info_proj_rel ON true
    `;
    return this.executeAndReturnFirstData<GvPositiveSchemaObject>();
  }

}
