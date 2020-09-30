import {DatColumn} from '../../models';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';
import {Postgres1DataSource} from '../../datasources';


export class QTableDatColumns extends SqlBuilderLb4Models {

  constructor(
    dataSource: Postgres1DataSource
  ) {
    super(dataSource)
  }

  /**
   * @param fkProject project
   * @param pkColumns pkEntity of the columns to query
   */
  query(fkProject: number, pkColumns: number[]): Promise<DatColumn[]> {

    this.sql = `
    SELECT
    ${this.createSelect('t1', DatColumn.definition)}
    FROM
    data."column" t1,
    data.namespace t2
    WHERE t1.fk_namespace = t2.pk_entity
    AND t2.fk_project = ${this.addParam(fkProject)}
    AND t1.pk_entity IN (${this.addParams(pkColumns)})
  `;

    return this.execute<DatColumn[]>()
  }

}
