import { model, property } from '@loopback/repository';
import { WareEntityPreviewPage } from '../../controllers';
import { Postgres1DataSource } from '../../datasources';
import { InfStatement } from '../../models';
import { SqlBuilderLb4Models } from '../../utils/sql-builders/sql-builder-lb4-models';
@model()
class SearchExistingRelatedStatementFilter {
  @property({ type: String, required: true }) key: 'fk_property' | 'fk_property_of_property';
  @property({ required: true }) value: number;
};

@model()
export class SearchExistingRelatedStatement {
  @property({ type: String, required: true }) relateBy: 'fk_object_info' | 'fk_subject_info'
  @property() filter: SearchExistingRelatedStatementFilter
}

export class QWarEntityPreviewSearchExisiting extends SqlBuilderLb4Models {

  constructor(
    dataSource: Postgres1DataSource
  ) {
    super(dataSource)
  }

  /**
   * Returns a SchemaObject with everything needed to create a paginated list of
   * EntityPreview, related to the given source entity
   *
   */
  query(
    pkProject: number,
    tsSearchString: string,
    searchString: string,
    pkClasses: number[],
    limit: number,
    offset: number,
    entityType?: string,
    relatedStatement?: SearchExistingRelatedStatement,
    projectOnly?: boolean
  ) {


    // basic type filter
    let whereEntityType = '';
    if (entityType) {
      whereEntityType = `AND entity_type = ${this.addParam(entityType)}`;
    }





    this.sql = `
      WITH
      -- filter the repo versions, add the fk_project of given project, if is_in_project
      -- this ensures we allways search in the full repo full-text (finds more)
      -- and it includes the information, whether the entity is in project or not
      tw0 AS (
        SELECT  to_tsquery(${this.addParam(tsSearchString)}) q
      ),
      te1 AS (

        ${projectOnly ? '' : `
          -- repo versions
          select *
          from
            tw0 t0,
            war.entity_preview t1
          WHERE t1.fk_project IS NULL
          ${tsSearchString ? `
          AND (
            t1.ts_vector @@ t0.q
            OR
            t1.pk_entity::text = ${this.addParam(searchString)}
          )
          ` : ''}
          ${whereEntityType}
          ${pkClasses?.length ? `AND t1.fk_class IN (${this.addParams(pkClasses)})` : ''}

          UNION ALL
        `}

        -- project versions
        select *
        from
          tw0 t0,
          war.entity_preview t1
        where t1.project= ${this.addParam(pkProject)}
        ${tsSearchString ? `
        AND (
          t1.ts_vector @@ t0.q
          OR
          t1.pk_entity::text = ${this.addParam(searchString)}
        )
        ` : ''}
        ${whereEntityType}
        ${pkClasses?.length ? `AND t1.fk_class IN (${this.addParams(pkClasses)})` : ''}
      ),
      te2 AS (

        -- take one preview per pk_entity, project version wins
        select distinct on (pk_entity)
        *
        FROM te1
        order by pk_entity, project desc
      ),
      tw1 AS (
        SELECT
          COALESCE(t2.fk_project, t1.fk_project) fk_project,
          COALESCE(t2.fk_project, t1.project) project,
          t1.pk_entity,
          t1.fk_class,
          t1.entity_label,
          t1.class_label,
          t1.entity_type,
          t1.type_label,
          t1.fk_type,
          t1.time_span,
          t1.full_text,
          t1.ts_vector
          FROM
          tw0 t0,
          te2 t1
          LEFT JOIN projects.info_proj_rel t2 ON t1.pk_entity = t2.fk_entity
            AND t2.fk_project = ${this.addParam(pkProject)}
            AND t2.is_in_project = true
        ),
        tw2 AS (
          select
            t1.fk_project,
            t1.project,
            t1.pk_entity,
            t1.fk_class,
            t1.entity_label,
            t1.class_label,
            t1.entity_type,
            t1.type_label,
            t1.fk_type,
            t1.time_span,
            ts_headline(t1.full_text, t0.q) as full_text_headline,
            ts_headline(t1.class_label, t0.q) as class_label_headline,
            ts_headline(t1.entity_label, t0.q) as entity_label_headline,
            ts_headline(t1.type_label, t0.q) as type_label_headline,
            count(t1.pk_entity) OVER() AS total_count,
            ROW_NUMBER () OVER (
              PARTITION BY t1.pk_entity
              ORDER BY
                t1.project DESC
            ) as rank
          FROM
            tw0 t0,
            tw1 t1
          ORDER BY ts_rank(ts_vector, t0.q) DESC, entity_label asc
          LIMIT ${this.addParam(limit)}
          OFFSET ${this.addParam(offset)}
        ),
        -- take only first ranked preview version of the same entity
        tw3 AS (
          SELECT
            t1.fk_project,
            t1.project,
            t1.pk_entity,
            t1.fk_class,
            t1.entity_label,
            t1.class_label,
            t1.entity_type,
            t1.type_label,
            t1.fk_type,
            t1.time_span,
            t1.full_text_headline,
            t1.class_label_headline,
            t1.entity_label_headline,
            t1.type_label_headline,
            ${relatedStatement ? `
              COALESCE(
                json_agg(${this.createBuildObject('t2', InfStatement.definition)})
                FILTER (WHERE t2.pk_entity IS NOT NULL),
                '[]'
              )  related_statements,
            `: ''}
            COALESCE(
                json_agg(t3.fk_project)
                FILTER (WHERE t3.pk_entity IS NOT NULL),
                '[]'
              ) projects
          FROM tw2 t1
          ${relatedStatement ? `
            LEFT JOIN information.v_statement t2
            ON t1.pk_entity = t2.${relatedStatement.relateBy}
            AND t2.${relatedStatement.filter.key} = ${relatedStatement.filter.value}
            AND t2.is_in_project_count > 0
          `: ''}
          LEFT JOIN projects.info_proj_rel t3
            ON t1.pk_entity = t3.fk_entity
            AND t3.is_in_project = true
          WHERE rank = 1
          GROUP BY
            t1.fk_project,
            t1.project,
            t1.pk_entity,
            t1.fk_class,
            t1.entity_label,
            t1.class_label,
            t1.entity_type,
            t1.type_label,
            t1.fk_type,
            t1.time_span,
            t1.full_text_headline,
            t1.class_label_headline,
            t1.entity_label_headline,
            t1.type_label_headline
        ),

        ------------------------------------
        --- group parts by model
        ------------------------------------
        items AS  (
          SELECT json_agg(t1) as json
          FROM tw3 t1
          GROUP BY true
        ),
        count AS  (
          SELECT total_count
          FROM tw2
          LIMIT 1
        )
        ------------------------------------
        --- build final response object
        ------------------------------------
        SELECT
        json_build_object (
          'totalCount', coalesce(count.total_count, 0),
          'data', coalesce(items.json, '[]'::json)
        ) as data
        FROM
        (select 0 ) as one_row
        LEFT JOIN items ON true
        LEFT JOIN count ON true;
    `;
    return this.executeAndReturnFirstData<WareEntityPreviewPage>()
  }
}
