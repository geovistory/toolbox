

import {Postgres1DataSource} from '../../datasources';
import {DfhProfile} from '../../models';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


export class QDfhProfilesOfProject extends SqlBuilderLb4Models {

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
  query(fkProject: number, requiredOntomeProfiles: number[]): Promise<DfhProfile[]> {

    this.sql = `
      SELECT
        ${this.createSelect('t2', DfhProfile.definition)}
      FROM
        projects.dfh_profile_proj_rel t1,
        data_for_history.v_profile t2
      WHERE t1.fk_project = ${this.addParam(fkProject)}
      AND t2.pk_profile = t1.fk_profile
      UNION ALL
      SELECT
        ${this.createSelect('t1', DfhProfile.definition)}
      FROM
        data_for_history.v_profile t1
      WHERE t1.pk_profile = ANY (ARRAY[${this.addParams(requiredOntomeProfiles)}]::int[])
      `;

    return this.execute<DfhProfile[]>();

  }

}
