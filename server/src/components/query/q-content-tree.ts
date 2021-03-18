import {Postgres1DataSource} from '../../datasources';
import {DatDigital} from '../../models/dat-digital.model';
import {InfLanguage} from '../../models/inf-language.model';
import {InfStatement} from '../../models/inf-statement.model';
import {InfTextProperty} from '../../models/inf-text-property.model';
import {ProInfoProjRel} from '../../models/pro-info-proj-rel.model';
import {WarEntityPreview} from '../../models/war-entity-preview.model';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';

export class QContentTree extends SqlBuilderLb4Models {

  constructor(
    dataSource: Postgres1DataSource,
  ) {
    super(dataSource)
  }


  /**
   *
   * @param {*} fkProject
   * @param {*} pkEntity primary key of the Expression entity, for which we need the tree.
   */
  query(fkProject: number, pkEntity: number) {
    this.sql = `
      -- query recusivly all the statements we need to create the tree
      -- tw0 delivers
      -- - pk_entity: the statements we need
      -- - fk_subject_info: the entity_preview we need (Expression Portion)
      -- - fk_subject_data: the data.digital we need
      WITH RECURSIVE tw0 (fk_subject_info, fk_subject_data, fk_property, fk_object_info, fk_object_data, level, pk_entity, path) AS (
          SELECT  t1.fk_subject_info, t1.fk_subject_data, t1.fk_property, t1.fk_object_info, t1.fk_object_data, 0, t1.pk_entity, ARRAY[t1.pk_entity]
          FROM    information.statement t1,
                  projects.info_proj_rel t2
          WHERE   t1.fk_object_info = ${this.addParam(pkEntity)}
          AND     t1.pk_entity = t2.fk_entity
          AND 	  t2.fk_project = ${this.addParam(fkProject)}
          AND     t2.is_in_project = true
          AND		  t1.fk_property IN (1317, 1328, 1329, 1216)

          UNION ALL

          SELECT  p.fk_subject_info, p.fk_subject_data, p.fk_property, p.fk_object_info, p.fk_object_data, t0.level + 1, p.pk_entity, ARRAY_APPEND(t0.path, p.pk_entity)
          FROM    information.statement p,
                  tw0 t0,
                  projects.info_proj_rel t2
          WHERE 	t0.fk_subject_info = p.fk_object_info
          AND     p.pk_entity = t2.fk_entity
          AND     t2.fk_project = ${this.addParam(fkProject)}
          AND     t2.is_in_project = true
          AND		  p.fk_property IN (1317, 1328, 1329, 1216)

      ),
      -- entity_previews (Expression Portions)
      tw1 AS (
        SELECT DISTINCT ON (t1.pk_entity)
          ${this.createSelect('t1', WarEntityPreview.definition)},
          ${this.createBuildObject('t2', ProInfoProjRel.definition)} proj_rel
        FROM
          war.entity_preview t1
        JOIN tw0 t3
          ON t1.pk_entity = t3.fk_subject_info
        CROSS JOIN
          projects.info_proj_rel t2
        WHERE t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fkProject)}
        ORDER BY
          t1.pk_entity,
          CASE WHEN(t1.fk_project = ${this.addParam(fkProject)}) THEN 0
          ELSE 1
          END
      ),
      -- statements
      tw2 AS (
        SELECT
          ${this.createSelect('t1', InfStatement.definition)},
          ${this.createBuildObject('t2', ProInfoProjRel.definition)} proj_rel
        FROM
          tw0
        CROSS JOIN
          information.v_statement t1,
          projects.info_proj_rel t2
        WHERE
        tw0.pk_entity = t1.pk_entity
        AND t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fkProject)}
      ),
      -- text_properties
      tw3 AS (
        SELECT
          ${this.createSelect('t1', InfTextProperty.definition)},
          ${this.createBuildObject('t2', ProInfoProjRel.definition)} proj_rel
        FROM
          tw1
        CROSS JOIN
          information.v_text_property t1,
          projects.info_proj_rel t2
        WHERE t1.fk_concerned_entity = tw1.pk_entity
        AND t1.pk_entity = t2.fk_entity AND t2.is_in_project = true AND t2.fk_project = ${this.addParam(
      fkProject
    )}
      ),
      -- language
      tw4 AS (
        SELECT
          ${this.createSelect('t1', InfLanguage.definition)}
        FROM
          tw3
        CROSS JOIN
          information.v_language t1
        WHERE t1.pk_entity = tw3.fk_language
      ),
      -- has type statement
      tw5 AS (
        SELECT
          ${this.createSelect('t1', InfStatement.definition)},
          ${this.createBuildObject('t3', ProInfoProjRel.definition)} proj_rel
        FROM
          tw1
        CROSS JOIN
          information.v_statement t1,
          data_for_history.v_property t2,
          projects.info_proj_rel t3
        WHERE t1.fk_subject_info = tw1.pk_entity
        AND t1.fk_property = t2.pk_property
        AND t2.is_has_type_subproperty = true
        AND t1.pk_entity = t3.fk_entity
        AND t3.is_in_project = true
        AND t3.fk_project = ${this.addParam(fkProject)}
      ),
      -- has appellation for language statements
      tw6 AS (
        SELECT
          ${this.createSelect('t1', InfStatement.definition)},
          ${this.createBuildObject('t2', ProInfoProjRel.definition)} proj_rel
        FROM
          tw1
        CROSS JOIN
          information.v_statement t1,
          projects.info_proj_rel t2
        WHERE t1.fk_object_info = tw1.pk_entity
        AND t1.fk_property = 1111
        AND t1.pk_entity = t2.fk_entity
        AND t2.is_in_project = true
        AND t2.fk_project = ${this.addParam(fkProject)}
      ),
      -- digital
      tw7 AS (
        SELECT
          ${this.createSelect('t1', DatDigital.definition)}
        FROM
          tw0
        CROSS JOIN
          data.digital t1
        WHERE t1.pk_entity = tw0.fk_subject_data
      ),
      ------------------------------------
      --- group parts by model
      ------------------------------------

      info_proj_rel AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.proj_rel->>'pk_entity') t1.proj_rel as objects
          FROM (
            SELECT proj_rel FROM tw1
            UNION ALL
            SELECT proj_rel FROM tw2
            UNION ALL
            SELECT proj_rel FROM tw3
            UNION ALL
            SELECT proj_rel FROM tw5
            UNION ALL
            SELECT proj_rel FROM tw6
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      entity_preview AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', WarEntityPreview.definition)} as objects
          FROM (
            SELECT * FROM tw1
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      text_property AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', InfTextProperty.definition)} as objects
          FROM (
            SELECT * FROM tw3
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      language AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', InfLanguage.definition)} as objects
          FROM (
            SELECT * FROM tw4
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      statement AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', InfStatement.definition)} as objects
          FROM (
            SELECT * FROM tw2
            UNION ALL
            SELECT * FROM tw5
            UNION ALL
            SELECT * FROM tw6
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      digital AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${this.createBuildObject('t1', DatDigital.definition)} as objects
          FROM (
            SELECT * FROM tw7
          ) AS t1
        ) as t1
        GROUP BY true
      )
      SELECT
      json_build_object (
        'inf', json_strip_nulls(json_build_object(
          'statement', statement.json,
          'text_property', text_property.json,
          'language', language.json
        )),
        'pro', json_strip_nulls(json_build_object(
          'info_proj_rel', info_proj_rel.json
        )),
        'dat', json_strip_nulls(json_build_object(
          'digital', digital.json
        )),
        'war', json_strip_nulls(json_build_object(
          'entity_preview', entity_preview.json
        ))
      ) as data
      FROM
      (select 0 ) as one_row
      LEFT JOIN entity_preview ON true
      LEFT JOIN text_property ON true
      LEFT JOIN language ON true
      LEFT JOIN statement ON true
      LEFT JOIN digital ON true
      LEFT JOIN info_proj_rel ON true
    `;


    return this.executeAndReturnFirstData<GvPositiveSchemaObject>()
  }
}
