import {Postgres1DataSource} from '../../datasources';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';
import {InfResource, ProInfoProjRel} from '../../models';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';


export class SqlTypesOfProject extends SqlBuilderLb4Models {

  constructor(
    dataSource: Postgres1DataSource
  ) {
    super(dataSource)
  }

  /**
  * Queries all instances of E55 Type of given project with the minimal related information
  * returning a SchemaObject
  * - the respources itself
  * - their info_proj_rels
  *
  * The rest can then be queried async
  *
  * @param {*} fkProject
  */
  query(fkProject: number): Promise<GvPositiveSchemaObject> {
    this.sql = `
      WITH
      tw1 AS (
        SELECT
          ${this.createSelect('t1', InfResource.definition)},
          ${this.createBuildObject('t2', ProInfoProjRel.definition)} proj_rel
        FROM
          information.resource t1
        CROSS JOIN
          projects.info_proj_rel t2,
          data_for_history.v_class  t3
        WHERE t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fkProject)}
        AND t1.fk_class = t3.pk_class
        AND t3.basic_type = 30
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
        GROUP BY true
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
        GROUP BY true
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
      LEFT JOIN info_proj_rel ON true;
    `;
    return this.executeAndReturnFirstData<GvPositiveSchemaObject>();

  }

}
