import {Postgres1DataSource} from '../../datasources';
import {ProInfoProjRel} from '../../models';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


export class QRelateIdsToProject extends SqlBuilderLb4Models {

  constructor(
    dataSource: Postgres1DataSource
  ) {
    super(dataSource)
  }

  /**
   * add info project relations between given project and entities
   * @param fkProject project
   * @param pkEntities information.pk_entity array
   * @param accountId the account of the user performing the action
   */
  query(fkProject: number, pkEntities: number[], accountId: number): Promise<GvPositiveSchemaObject> {


    this.sql = `
    WITH tw1 AS (
      SELECT DISTINCT pk
      FROM unnest(ARRAY[${this.addParams(pkEntities)}]::int[]) as pk
    ),
    -- insert the info_proj_rels
    tw2 AS (

        INSERT INTO projects.v_info_proj_rel (fk_last_modifier, fk_entity, fk_project, is_in_project)
        SELECT
          ${this.addParam(accountId)},
          pk,
          ${this.addParam(fkProject)},
          true
        FROM tw1
        RETURNING *
      ),
      ------------------------------------
      --- group parts by model
      ------------------------------------

      info_proj_rel AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', ProInfoProjRel.definition)} as objects
          FROM (
            SELECT * FROM tw2
          ) AS t1
        ) as t1
        GROUP BY 1=1
      )
      SELECT
      json_build_object (
        'pro', json_strip_nulls(json_build_object(
          'info_proj_rel', info_proj_rel.json
        ))
      ) as data
      FROM
      (select 0 ) as one_row
      LEFT JOIN info_proj_rel ON true;
    `;
    return this.executeAndReturnFirstData<GvPositiveSchemaObject>();
  }
}
