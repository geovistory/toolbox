import {SqlBuilderLb4Models} from '../../../utils/sql-builders/sql-builder-lb4-models';


/**
 * Make SQL function that can be used in SQL Query to query a GvFieldPage
 * with isOutgoing=false and scope = {inProject:<id>}
 */
export class SqlGvFieldPageIncomingInProject extends SqlBuilderLb4Models {
  generateFunctionSql() {
    this.sql = `
    CREATE OR REPLACE FUNCTION gv_field_page_incoming_in_project (_project_id int, _fk_property int, _source_info_id int, _source_data_id int, _source_tables_cell_id bigint, _source_tables_row_id bigint, _limit int, _offset int, _req json)
      RETURNS TABLE (
        "validFor" timestamp with time zone,
        "paginatedStatements" json,
        count int,
        req json)
      LANGUAGE plpgsql
      COST 100 VOLATILE ROWS 1
      AS $func$
    BEGIN
      RETURN QUERY
      --------------------------------------------------------------------------
      -- FINAL SELECT
      --------------------------------------------------------------------------
      SELECT
        now() "validFor",
        CASE WHEN _limit=0 THEN
          '[]'::json ELSE
          COALESCE(json_agg(stmt.obj ORDER BY ord_num_of_domain ASC NULLS LAST, pk_entity DESC), '[]'::json)
          END
          AS "paginatedStatements",
        COALESCE(max(full_count), 0)::int "count",
        _req req
      FROM (
        --------------------------------------------------------------------------
        -- PAGINATED SELECT
        --------------------------------------------------------------------------
        SELECT
          json_strip_nulls (json_build_object('projRel', gv_to_jsonb (t2), 'isOutgoing', false, 'ordNum', t2.ord_num_of_domain, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', gv_to_jsonb (t1))) obj,
          count(*) OVER () AS full_count,
          t2.ord_num_of_domain,
          t1.pk_entity
        FROM
          information.v_statement t1,
          projects.v_info_proj_rel t2,
          gv_get_statement_target (_project_id, t1.fk_subject_info, t1.fk_subject_data, t1.fk_subject_tables_cell, t1.fk_subject_tables_row) t3
        WHERE
          --------------------------------------------------------------------------
          -- JOIN SOURCE ENTITY WITH STATEMENTS
          --------------------------------------------------------------------------
          t1.fk_object_info = _source_info_id
          AND t1.fk_object_data = _source_data_id
          AND t1.fk_object_tables_cell = _source_tables_cell_id
          AND t1.fk_object_tables_row = _source_tables_row_id
          AND t1.fk_property = _fk_property
          --------------------------------------------------------------------------
          -- JOIN STATEMENTS WITH PROJECT RELS
          --------------------------------------------------------------------------
          AND t1.pk_entity = t2.fk_entity
          AND t2.is_in_project = TRUE
          AND t2.fk_project = _project_id
          --------------------------------------------------------------------------
          -- order the statements according to order number of target
          --------------------------------------------------------------------------
        ORDER BY
          t2.ord_num_of_domain ASC NULLS LAST, t1.pk_entity DESC
          --------------------------------------------------------------------------
          -- paginate according to the requested limit / offset
          --------------------------------------------------------------------------
        LIMIT CASE WHEN _limit=0 THEN 1 ELSE _limit END
        OFFSET _offset) AS stmt;
    END
    $func$;


  `
    return this;

  }
}

