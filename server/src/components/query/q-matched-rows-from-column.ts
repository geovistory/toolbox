import { Postgres1DataSource } from '../../datasources';
import { FkProjectFkEntity } from '../../models/gv-negative-schema-object.model';
import { SqlBuilderLb4Models } from '../../utils/sql-builders/sql-builder-lb4-models';


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
    SELECT t3.pk_entity as pk_entity FROM tables.cell as t1
    INNER JOIN information.statement as t2 on pk_cell = fk_subject_tables_cell
    INNER JOIN projects.info_proj_rel as t3 on t2.pk_entity = t3.fk_entity
    WHERE
    t1.fk_column = ${this.addParam(fkColumn)}
    AND t3.fk_project = ${this.addParam(fkProject)}
    AND t3.is_in_project = true
  ) t2
  WHERE t1.pk_entity = t2.pk_entity
  RETURNING t1.*
  )
  select ${this.createBuildObject('t0', FkProjectFkEntity.definition)}  as "infProjRel", fk_entity as "pkStatement" from t0
  `;
    const result = await this.execute<Array<{ infProjRel: FkProjectFkEntity, pkStatement: number }>>();
    return result;
  }

  async queryCount(fkProject: number, fkColumn: number) {
    this.sql = `
    SELECT count(*) FROM tables.cell as t1
    INNER JOIN information.statement as t2 on pk_cell = fk_subject_tables_cell
    INNER JOIN projects.info_proj_rel as t3 on t2.pk_entity = t3.fk_entity
    WHERE
        t1.fk_column = ${this.addParam(fkColumn)}
    AND t3.fk_project = ${this.addParam(fkProject)}
    AND t3.is_in_project = true
  `;
    return this.execute<Array<{ count: string }>>();
  }

}
