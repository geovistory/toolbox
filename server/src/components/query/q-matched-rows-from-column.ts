import {Postgres1DataSource} from '../../datasources';
import {FkProjectFkEntity} from '../../models/gv-negative-schema-object.model';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


export class QMatchedRowsFromColumn extends SqlBuilderLb4Models {

  constructor(
    dataSource: Postgres1DataSource
  ) {
    super(dataSource)
  }
  /**
   * @param fkProject project
   * @param fkColumn column key from where to get the mappings
   */
  async query(fkProject: number, fkColumn: number) {
    this.sql = `
    with t0 as (
  UPDATE projects.info_proj_rel t1
    SET is_in_project = false
  FROM (

    WITH tw1 AS (
      -- select the statements from cell to annotation
      -- and the info_proj_relations of these statements and annotations
      SELECT
        t2.fk_subject_info as pk_annotation,
        t3.pk_entity as pk_stmt_proj_rel,
        t5.pk_entity as pk_annotation_proj_rel
      FROM tables.cell as t1
      INNER JOIN information.statement as t2 on pk_cell = fk_object_tables_cell
      INNER JOIN projects.info_proj_rel as t3 on t2.pk_entity = t3.fk_entity
      INNER JOIN information.resource as t4 on t4.pk_entity = fk_subject_info
      INNER JOIN projects.info_proj_rel as t5 on t4.pk_entity = t5.fk_entity
      WHERE
        t1.fk_column = ${this.addParam(fkColumn)}
      AND t3.fk_project = ${this.addParam(fkProject)}
      AND t3.is_in_project = true
    )
    -- select the outgoning statements of the annotation
    -- and the info_proj_relations of these statements
    SELECT
      t3.pk_entity
    FROM tw1 as t1
    INNER JOIN information.statement as t2 on t2.fk_subject_info = t1.pk_annotation
    INNER JOIN projects.info_proj_rel as t3 on t2.pk_entity = t3.fk_entity
    WHERE
      t3.fk_project = ${this.addParam(fkProject)}
    AND t3.is_in_project = true

    UNION ALL

    SELECT pk_stmt_proj_rel
    FROM tw1

    UNION ALL

    SELECT pk_annotation_proj_rel
    FROM tw1
  ) t2
  WHERE t1.pk_entity = t2.pk_entity
  RETURNING t1.*
  )
  select ${this.createBuildObject('t0', FkProjectFkEntity.definition)}  as "infProjRel", fk_entity as "pkStatement" from t0
  `;
    const result = await this.execute<Array<{infProjRel: FkProjectFkEntity, pkStatement: number}>>();
    return result;
  }

  async queryCount(fkProject: number, fkColumn: number) {
    this.sql = `
    SELECT count(*) FROM tables.cell as t1
    INNER JOIN information.statement as t2 on pk_cell = fk_object_tables_cell
    INNER JOIN projects.info_proj_rel as t3 on t2.pk_entity = t3.fk_entity
    WHERE
        t1.fk_column = ${this.addParam(fkColumn)}
    AND t3.fk_project = ${this.addParam(fkProject)}
    AND t3.is_in_project = true
  `;
    return this.execute<Array<{count: string}>>();
  }

}
