import { SqlBuilderLbModels } from '../../utils/sql-builder-lb-models';
import { Lb3Models, BuiltQuery } from '../../utils/interfaces';


export class GetDatColumnsArray extends SqlBuilderLbModels {

  constructor(lb3models: Lb3Models) {
    super(lb3models)
  }

  /**
   * @param fkProject project
   * @param pkColumns pkEntity of the columns to query
   */
  buildQuery(fkProject: number, pkColumns: number[]): BuiltQuery {

    this.sql = `
    SELECT
    ${this.createSelect('t1', 'DatColumn')}
    FROM
    data."column" t1,
    data.namespace t2
    WHERE t1.fk_namespace = t2.pk_entity
    AND t2.fk_project = ${this.addParam(fkProject)}
    AND t1.pk_entity IN (${this.addParams(pkColumns)})
  `;

    return this.getBuiltQuery();
  }

}
