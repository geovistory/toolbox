import {Postgres1DataSource} from '../../datasources';
import {GvPaginationObject, GvPaginationStatementFilter, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfStatement, InfTimePrimitive, WarEntityPreview} from '../../models';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


export class QAlternativeLeafItems extends SqlBuilderLb4Models {

  constructor(
    dataSource: Postgres1DataSource,
  ) {
    super(dataSource)
  }


  /**
   * Returns a SchemaObject with everything needed to create a list of
   * leaf items (to add), related to the given source entity through statements
   * that are not in the current project
   *
   * @param fkProject project
   * @param filterObject StatementParams to filter the statements
   * @param limit page size for pagination
   * @param offset offset for pagination
   */
  query(
    fkProject: number,
    filterObject: GvPaginationStatementFilter,
    limit: number,
    offset: number
  ) {
    this.sql = `
      WITH
      -- alternative statements (that are in at least one other project)
      tw0 AS (
        SELECT ${this.createSelect('t1', InfStatement.definition)}
        FROM
        information.v_statement t1
        WHERE ${[
        ...this.getFiltersByObject('t1', filterObject),
        't1.is_in_project_count > 0'].join(' AND ')}
      EXCEPT
        SELECT ${this.createSelect('t1', InfStatement.definition)}
        FROM
        information.v_statement t1,
        projects.info_proj_rel t2
        WHERE
        ${[
        ...this.getFiltersByObject('t1', filterObject),
        `t1.pk_entity = t2.fk_entity`,
        `t2.fk_project = ${this.addParam(fkProject)}`,
        `t2.is_in_project = true`].join(' AND ')}
      ),
      -- count
      tw1 AS (
        SELECT
          count(*)
        FROM
          tw0
        GROUP BY
          TRUE
      ),
      -- statements
      tw2 AS (
        SELECT
          ${this.createSelect('t1', InfStatement.definition)}
        FROM
          tw0 t1
          LIMIT ${this.addParam(limit)} -- add limit
          OFFSET ${this.addParam(offset)} -- add offset
      ),
      --appellation
      tw3 AS (
        SELECT
          ${this.createSelect('t1', InfAppellation.definition)}
        FROM
          tw2
          CROSS JOIN information.appellation t1
        WHERE
          tw2.fk_object_info = t1.pk_entity
      ),
      --lang_string
      tw4 AS (
        SELECT
          ${this.createSelect('t1', InfLangString.definition)}
        FROM
          tw2
          CROSS JOIN information.v_lang_string t1
        WHERE
          tw2.fk_object_info = t1.pk_entity
      ),
      -- language of lang_string
      tw5 AS (
        SELECT
          ${this.createSelect('t1', InfLanguage.definition)}
        FROM
          tw4
          CROSS JOIN information.v_language t1
        WHERE
          tw4.fk_language = t1.pk_entity
      ),
      -- language
      tw6 AS (
        SELECT
          ${this.createSelect('t1', InfLanguage.definition)}
        FROM
          tw2
          CROSS JOIN information.v_language t1
        WHERE
          tw2.fk_object_info = t1.pk_entity
      ),
      -- time_primitive
      tw7 AS (
        SELECT
          ${this.createSelect('t1', InfTimePrimitive.definition)}
        FROM
          tw2
          CROSS JOIN information.v_time_primitive t1
        WHERE
          tw2.fk_object_info = t1.pk_entity
      ),
      -- place
      tw8 AS (
        SELECT
          ${this.createSelect('t1', InfPlace.definition)}
        FROM
          tw2
          CROSS JOIN information.v_place t1
        WHERE
          tw2.fk_object_info = t1.pk_entity
      ),
      -- dimension
      tw9 AS (
        SELECT
          ${this.createSelect('t1', InfDimension.definition)}
        FROM
          tw2
          CROSS JOIN information.v_dimension t1
        WHERE
          tw2.fk_object_info = t1.pk_entity
      ),
      -- object entity_preview
      tw10 AS (
        SELECT
          ${this.createSelect('t1', WarEntityPreview.definition)}
        FROM
          tw2
          CROSS JOIN war.entity_preview t1
        WHERE
          tw2.fk_object_info = t1.pk_entity
          AND t1.fk_project IS NULL
      ),
      -- subject entity_preview
      tw11 AS (
        SELECT
          ${this.createSelect('t1', WarEntityPreview.definition)}
        FROM
          tw2
          CROSS JOIN war.entity_preview t1
        WHERE
          tw2.fk_subject_info = t1.pk_entity
          AND t1.fk_project IS NULL
      ),
      -- measurement unit entity_preview
      tw12 AS (
        SELECT
          ${this.createSelect('t1', WarEntityPreview.definition)}
        FROM
          tw9
          CROSS JOIN war.entity_preview t1
        WHERE
          tw9.fk_measurement_unit = t1.pk_entity
          AND t1.fk_project IS NULL
      ),
      ------------------------------------
      --- group parts by model
      ------------------------------------
      statement AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', InfStatement.definition)} as objects
          FROM
          (
            SELECT * FROM tw2
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      appellation AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', InfAppellation.definition)} as objects
          FROM
          (
            SELECT * FROM tw3
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      lang_string AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', InfLangString.definition)} as objects
          FROM
          (
            SELECT * FROM tw4
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      language AS (
        SELECT json_agg(t2.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', InfLanguage.definition)} as objects
          FROM
          (
            SELECT * FROM tw5
            UNION ALL
            SELECT * FROM tw6
          ) AS t1
        ) as t2
        GROUP BY true
      ),
      time_primitive AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', InfTimePrimitive.definition)} as objects
          FROM
          (
            SELECT * FROM tw7
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      place AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', InfPlace.definition)} as objects
          FROM
          (
            SELECT * FROM tw8
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      dimension AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', InfDimension.definition)} as objects
          FROM
          (
            SELECT * FROM tw9
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      entity_preview AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select
          distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', WarEntityPreview.definition)} as objects
          FROM
          (
            SELECT * FROM tw10
            UNION ALL
            SELECT * FROM tw11
            UNION ALL
            SELECT * FROM tw12
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      paginatedStatements AS (
        SELECT COALESCE(json_agg(t1.pk_entity), '[]'::json) as json
        FROM
          tw2 as t1
      )
      select
      json_build_object(
        'count', coalesce(tw1.count,0),
        'schemas', json_build_object(
          'inf', json_strip_nulls(json_build_object(
            'statement', statement.json,
            'lang_string', lang_string.json,
            'appellation', appellation.json,
            'language', language.json,
            'time_primitive', time_primitive.json,
            'place', place.json,
            'dimension', dimension.json
          )),
          'war', json_strip_nulls(json_build_object(
            'entity_preview', entity_preview.json
          ))
        ),
        'paginatedStatements', paginatedStatements.json
      ) as data
      FROM
      (select 0 ) as one_row
      LEFT JOIN tw1 ON true
      LEFT JOIN paginatedStatements ON true
      LEFT JOIN statement ON true
      LEFT JOIN appellation ON true
      LEFT JOIN lang_string ON true
      LEFT JOIN language ON true
      LEFT JOIN time_primitive ON true
      LEFT JOIN place ON true
      LEFT JOIN dimension ON true
      LEFT JOIN entity_preview ON true;
    `;
    return this.executeAndReturnFirstData<GvPaginationObject>()

  }

  getFiltersByObject(tableAlias: string, filterObject: GvPaginationStatementFilter): string[] {
    const filters: string[] = []
    let column: keyof GvPaginationStatementFilter;
    for (column in filterObject) {
      const value = filterObject[column];
      if (value) {
        filters.push(`${tableAlias}.${column}=${this.addParam(value)}`)
      }
    }
    return filters;
  }
}
