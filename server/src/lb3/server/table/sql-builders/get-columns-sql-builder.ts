import { SqlBuilderLbModels } from '../../utils/sql-builder-lb-models';
import { Lb3Models, BuiltQuery } from '../../utils/interfaces';


export class GetColumnsSqlBuilder extends SqlBuilderLbModels {

  constructor(lb3models: Lb3Models) {
    super(lb3models)
  }

  /**
   * @param fkProject project
   * @param fkTable pkEntity of the digital table to which the columns belong
   */
  buildQuery(fkProject: number, fkTable: number): BuiltQuery {

    this.sql = `
    WITH tw1 AS (
      SELECT
        ${this.createSelect('t1', 'DatColumn')}
      FROM
      data."column" t1,
      data.namespace t2
      WHERE t1.fk_namespace = t2.pk_entity
      AND t2.fk_project = ${this.addParam(fkProject)}
      AND t1.fk_digital = ${this.addParam(fkTable)}
    ),
    -- labels of columns (text_properties)
    tw2 AS (
      SELECT
        ${this.createSelect('t1', 'DatTextProperty')}
      FROM
      data.text_property t1,
      data.namespace t2,
      tw1 t3
      WHERE t1.fk_namespace = t2.pk_entity
      AND t2.fk_project = ${this.addParam(fkProject)}
      AND t1.fk_entity = t3.pk_entity
      AND t1.fk_system_type = 3295 -- Label of an entity.
    ),
    ------------------------------------
    --- group parts by model
    ------------------------------------
    dat_column AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', 'DatColumn')} as objects
        FROM (
          SELECT * FROM tw1
        ) AS t1
      ) as t1
      GROUP BY true
    ),
    dat_text_property AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', 'DatTextProperty')} as objects
        FROM (
          SELECT * FROM tw2
        ) AS t1
      ) as t1
      GROUP BY true
    )
    SELECT
    json_build_object (
      'dat', json_strip_nulls(json_build_object(
        'column', dat_column.json,
        'text_property', dat_text_property.json
      ))
    ) as data
    FROM
    dat_column
    LEFT JOIN dat_text_property ON true
  `;

    return this.getBuiltQuery();
  }

}
