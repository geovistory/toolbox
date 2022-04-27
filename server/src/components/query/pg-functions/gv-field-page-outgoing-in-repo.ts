import {SqlBuilderLb4Models} from '../../../utils/sql-builders/sql-builder-lb4-models';


/**
 * Make SQL function that can be used in SQL Query to query a GvFieldPage
 * with isOutgoing=true and scope = {inRepo:true}
 */
export class SqlGvFieldPageOutgoingInRepo extends SqlBuilderLb4Models {
  generateFunctionSql() {
    this.sql = `
    CREATE OR REPLACE FUNCTION gv_field_page_outgoing_in_repo (_fk_property int, _fk_subject_info int, _fk_subject_data int, _fk_subject_tables_cell bigint, _fk_subject_tables_row bigint, _limit int, _offset int, _req json)
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
          COALESCE(json_agg(stmt.obj), '[]'::json)
          END
          AS "paginatedStatements",
        COALESCE(max(full_count), 0)::int "count",
        _req req
      FROM (
        --------------------------------------------------------------------------
        -- PAGINATED SELECT
        --------------------------------------------------------------------------
        SELECT
          json_strip_nulls (json_build_object('isOutgoing', true, 'target', t3.target_obj, 'targetClass', t3.target_class, 'targetLabel', t3.target_label, 'statement', gv_to_jsonb (t1))) obj,
          count(*) OVER () AS full_count
        FROM
          information.v_statement t1,
          gv_get_statement_target (0, t1.fk_object_info, t1.fk_object_data, t1.fk_object_tables_cell, t1.fk_object_tables_row) t3
        WHERE
          --------------------------------------------------------------------------
          -- JOIN SOURCE ENTITY WITH STATEMENTS
          --------------------------------------------------------------------------
          t1.fk_subject_info = _fk_subject_info
          AND t1.fk_subject_data = _fk_subject_data
          AND t1.fk_subject_tables_cell = _fk_subject_tables_cell
          AND t1.fk_subject_tables_row = _fk_subject_tables_row
          AND t1.fk_property = _fk_property
          AND t1.is_in_project_count > 0

        --------------------------------------------------------------------------
        -- THE FOLLOWING ORDER BY CLAUSE IS DISABLED FOR PERFORMANCE REASONS
        -- ORDER BY
        --   t1.pk_entity DESC

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

