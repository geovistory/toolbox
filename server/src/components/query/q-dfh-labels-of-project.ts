

import {Postgres1DataSource} from '../../datasources';
import {DfhLabel} from '../../models';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


export class QDfhLabelsOfProject extends SqlBuilderLb4Models {

  constructor(
    dataSource: Postgres1DataSource
  ) {
    super(dataSource)
  }

  /**
  * Queries all DfhLabels for classes and properties activated by
  * project. project default language is preferred.
  *
  * @param {*} fkProject
  */
  query(fkProject: number): Promise<DfhLabel[]> {


    this.sql = `
    WITH tw as (
      SELECT t2.iso6391 as default_language
      FROM projects.project t1,
      information."language" t2
      WHERE t1.pk_entity = ${this.addParam(fkProject)}
      AND t2.pk_entity =  t1.fk_language
    ),
    tw0 as (
      SELECT DISTINCT
      t1.fk_profile
      FROM
      projects.dfh_profile_proj_rel t1
      WHERE fk_project = ${this.addParam(fkProject)}
      UNION
      SELECT 5 -- GEOVISTORY BASIC PROJECT
    ),
    tw1 as (
      SELECT DISTINCT t2.dfh_pk_class
      FROM
        tw0 t1,
        data_for_history.api_class t2
      WHERE t1.fk_profile = t2.dfh_fk_profile
    ),
    tw2 as (
      SELECT DISTINCT
      t2.dfh_pk_property
      FROM
      tw0 t1,
      data_for_history.api_property t2
      WHERE t1.fk_profile = t2.dfh_fk_profile
    ),
    tw3 AS (
      SELECT t1.*
      FROM data_for_history.v_label t1, tw0
      WHERE t1.fk_profile = tw0.fk_profile
      AND language = 'en'
      UNION ALL
      SELECT t1.*
      FROM data_for_history.v_label t1, tw1
      WHERE t1.fk_class = tw1.dfh_pk_class
      AND language = 'en'
      UNION ALL
      SELECT t1.*
      FROM data_for_history.v_label t1, tw2
      WHERE t1.fk_property = tw2.dfh_pk_property
      AND language = 'en'

      UNION ALL

      SELECT t1.*
      FROM data_for_history.v_label t1, tw0, tw
      WHERE t1.fk_profile = tw0.fk_profile
      AND language = tw.default_language
      UNION ALL
      SELECT t1.*
      FROM data_for_history.v_label t1, tw1, tw
      WHERE t1.fk_class = tw1.dfh_pk_class
      AND language =  tw.default_language
      UNION ALL
      SELECT t1.*
      FROM data_for_history.v_label t1, tw2, tw
      WHERE t1.fk_property = tw2.dfh_pk_property
      AND language =  tw.default_language
    )
    SELECT DISTINCT ON ("type", fk_profile,fk_project,fk_property,fk_class)
    ${this.createSelect('tw3', DfhLabel.definition)}
    FROM tw3, tw
    ORDER BY
      "type", fk_profile,fk_project,fk_property,fk_class,
       CASE language
          WHEN tw.default_language THEN 1
          WHEN 'en' THEN 2
       END;
      `;

    return this.execute<DfhLabel[]>();

  }

}
