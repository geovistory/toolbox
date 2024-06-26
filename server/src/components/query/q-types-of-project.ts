import {Postgres1DataSource} from '../../datasources';
import {InfResource, ProInfoProjRel} from '../../models';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


export class QTypesOfProject extends SqlBuilderLb4Models {

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
      -- select types of project
      WITH tw0 AS (
        SELECT
          pk_entity
        FROM
          pgwar.entity_preview
        WHERE
          fk_project =  ${this.addParam(fkProject)}
          AND parent_classes @> '53'::jsonb
        UNION
        SELECT
          pk_entity
        FROM
          pgwar.entity_preview
        WHERE
          fk_project =  ${this.addParam(fkProject)}
          AND ancestor_classes @> '53'::jsonb
      ),
      -- join resource and info_proj_rel
      tw1 AS (
        SELECT
          ${this.createSelect('t1', InfResource.definition)},
          ${this.createBuildObject('t2', ProInfoProjRel.definition)} proj_rel
        FROM
          information.resource t1,
          projects.info_proj_rel t2,
		      tw0
        WHERE tw0.pk_entity = t2.fk_entity
        AND tw0.pk_entity = t1.pk_entity
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
      LEFT JOIN info_proj_rel ON true;
    `;
    this.getBuiltQuery('q-types-of-project')
    return this.executeAndReturnFirstData<GvPositiveSchemaObject>();

  }

}
