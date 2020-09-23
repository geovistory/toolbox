import {Postgres1DataSource} from '../../datasources';
import {DatColumn, DatTextProperty} from '../../models';
import {GvSchemaObject} from '../../models/gv-schema-object.model';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';
import {DatClassColumnMapping} from '../../models/dat-class-column-mapping.model';


export class QTableColumns extends SqlBuilderLb4Models {

  constructor(
    dataSource: Postgres1DataSource
  ) {
    super(dataSource)
  }
  /**
   * @param fkProject project
   * @param fkTable pkEntity of the digital table to which the columns belong
   */
  async query(fkProject: number, fkTable: number): Promise<GvSchemaObject> {

    this.sql = `
    WITH tw1 AS (
      SELECT
        ${this.createSelect('t1', DatColumn.definition)}
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
        ${this.createSelect('t1', DatTextProperty.definition)}
      FROM
      data.text_property t1,
      data.namespace t2,
      tw1 t3
      WHERE t1.fk_namespace = t2.pk_entity
      AND t2.fk_project = ${this.addParam(fkProject)}
      AND t1.fk_entity = t3.pk_entity
      AND t1.fk_system_type = 3295 -- Label of an entity.
    ),
    -- class column mappings
    tw3 AS (
      SELECT
        ${this.createSelect('t1', DatClassColumnMapping.definition)}
      FROM
      data.class_column_mapping t1,
      tw1 t2
      WHERE t1.fk_column = t2.pk_entity
    ),
    ------------------------------------
    --- group parts by model
    ------------------------------------
    dat_column AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', DatColumn.definition)} as objects
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
        ${this.createBuildObject('t1', DatTextProperty.definition)} as objects
        FROM (
          SELECT * FROM tw2
        ) AS t1
      ) as t1
      GROUP BY true
    ),
    dat_class_column_mapping AS (
      SELECT json_agg(t1.objects) as json
      FROM (
        select distinct on (t1.pk_entity)
        ${this.createBuildObject('t1', DatClassColumnMapping.definition)} as objects
        FROM (
          SELECT * FROM tw3
        ) AS t1
      ) as t1
      GROUP BY true
    )
    SELECT
    json_build_object (
      'dat', json_strip_nulls(json_build_object(
        'column', dat_column.json,
        'text_property', dat_text_property.json,
        'class_column_mapping', dat_class_column_mapping.json
      ))
    ) as data
    FROM
    dat_column
    LEFT JOIN dat_text_property ON true
    LEFT JOIN dat_class_column_mapping ON true
  `;

        this.getBuiltQuery()

    return this.execute<GvSchemaObject>();
  }



}
