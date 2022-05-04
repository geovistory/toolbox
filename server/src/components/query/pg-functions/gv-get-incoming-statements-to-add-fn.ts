import {SqlBuilderLb4Models} from '../../../utils/sql-builders/sql-builder-lb4-models';


/**
 * Make SQL function that returns the target of a statement
 */
export class SqlGvGetIncomingStatementsToAdd extends SqlBuilderLb4Models {
  generateFunctionSql() {
    this.sql = `
    DROP FUNCTION IF EXISTS gv_get_incoming_statements_to_add;
    CREATE FUNCTION gv_get_incoming_statements_to_add(
        properties jsonb,
        entity_id integer)
          RETURNS TABLE(pk_entity integer, fk_source integer, fk_target integer, target_class integer, target_super_classes json)
          LANGUAGE 'sql'

          COST 100
          VOLATILE
          ROWS 1000
      AS $BODY$
        WITH tw2 AS (
      SELECT * FROM jsonb_to_recordset(properties) as items(
        pk_property int,
        has_domain int,
        has_range int,
        domain_instances_max_quantifier int
      )
      ),
      tw3 AS (
        -- select all incoming statements, joined with range and domain class
        SELECT
          t1.pk_entity,
          t1.fk_object_info,
          t1.fk_subject_info,
          t3.fk_class domain_class,
          t1.fk_property,
          CASE WHEN t4.domain_instances_max_quantifier = - 1 THEN
            FLOAT8 '+infinity'
          WHEN t4.domain_instances_max_quantifier IS NULL THEN
            FLOAT8 '+infinity'
          ELSE
            t4.domain_instances_max_quantifier
          END target_max_quantifier,
          t1.is_in_project_count,
          -- counts the items of same domain and property
          row_number() OVER (PARTITION BY t3.fk_class,
            t1.fk_property ORDER BY t1.is_in_project_count DESC, t1.tmsp_creation DESC) AS rank,
          t5.community_visibility
        FROM information.v_statement t1
        JOIN information.v_entity_class_map t2 ON t1.fk_object_info = t2.pk_entity
        JOIN information.v_entity_class_map t3 ON t1.fk_subject_info = t3.pk_entity
        JOIN tw2 t4  ON t1.fk_property = t4.pk_property
        AND t2.fk_class = t4.has_range
        AND t3.fk_class = t4.has_domain
        LEFT JOIN information.resource t5 ON t1.fk_subject_info = t5.pk_entity
        WHERE fk_object_info = entity_id
        AND t1.is_in_project_count > 0
        -- let only statements pass, whose subject are not hidden from toolbox comminity
        AND (t5.community_visibility->>'toolbox')::boolean IS DISTINCT FROM false
        )
      SELECT
          pk_entity,
          fk_object_info AS fk_source,
          fk_subject_info AS fk_target,
        domain_class AS target_class,
        array_to_json(domain_super_classes) AS target_super_classes
        FROM    tw3
      JOIN LATERAL (
        SELECT DISTINCT ON (dfh_pk_class) dfh_ancestor_classes || dfh_parent_classes AS domain_super_classes
        FROM data_for_history.api_class
        WHERE tw3.domain_class = dfh_pk_class
      ) dfh_class on true
        WHERE
          target_max_quantifier >= rank;

      $BODY$;
  `
    return this
  }
}

