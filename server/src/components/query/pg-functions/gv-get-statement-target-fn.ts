import {SqlBuilderLb4Models} from '../../../utils/sql-builders/sql-builder-lb4-models';


/**
 * Make SQL function that returns the target of a statement
 */
export class SqlGvGetStatementTarget extends SqlBuilderLb4Models {
  generateFunctionSql() {
    this.sql = `

    DO $$ BEGIN
      CREATE TYPE gv_statement_target AS (
        target_obj jsonb,
        target_class int,
        target_label text
      );
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;


    CREATE OR REPLACE FUNCTION gv_get_statement_target (_project_id int, _info_id int, _data_id int, _tables_cell_id bigint, _tables_row_id bigint)
      RETURNS SETOF gv_statement_target
      LANGUAGE plpgsql
      AS $func$
    BEGIN
      ----------------------------------------------------------------------
      --JOIN STATEMENT'S TARGET LANGUAGE
      ----------------------------------------------------------------------
      RETURN QUERY
      SELECT
        jsonb_build_object('language', gv_to_jsonb (t3)) target_obj,
        fk_class target_class,
        notes target_label
      FROM
        information.language t3
      WHERE
        t3.pk_entity = _info_id;
      IF FOUND THEN
        RETURN;
      END IF;
      ----------------------------------------------------------------------
      --JOIN STATEMENT'S TARGET APPPELLATION
      ----------------------------------------------------------------------
      RETURN QUERY
      SELECT
        jsonb_build_object('appellation', gv_to_jsonb (t3)) target_obj,
        fk_class target_class,
        string target_label
      FROM
        information.appellation t3
      WHERE
        t3.pk_entity = _info_id;
      IF FOUND THEN
        RETURN;
      END IF;
      ----------------------------------------------------------------------
      --JOIN STATEMENT'S TARGET LANG_STRING
      ----------------------------------------------------------------------
      RETURN QUERY
      SELECT
        jsonb_build_object('langString', jsonb_build_object('langString', gv_to_jsonb (t3), 'language', language.obj)) target_obj,
        fk_class target_class,
        concat(t3.string, ' (', language.iso6391, ')' ) target_label
      FROM
        information.v_lang_string t3
      LEFT JOIN LATERAL (
        -- LANGUAGE OF LANG_STRING
        SELECT
          gv_to_jsonb (t4) obj,
          iso6391
        FROM
          information.language t4
        WHERE
          t4.pk_entity = t3.fk_language)
        LANGUAGE ON
        TRUE
      WHERE
        t3.pk_entity = _info_id;
      IF FOUND THEN
        RETURN;
      END IF;
      ----------------------------------------------------------------------
      --JOIN STATEMENT'S TARGET PLACE
      ----------------------------------------------------------------------
      RETURN QUERY
      SELECT
        jsonb_build_object('place', gv_to_jsonb (t3)) target_obj,
        fk_class target_class,
        concat('WGS84: ', lat, '°, ', long, '°') target_label
      FROM
        information.v_place t3
      WHERE
        t3.pk_entity = _info_id;
      IF FOUND THEN
        RETURN;
      END IF;
      ----------------------------------------------------------------------
      --JOIN STATEMENT'S TARGET TIME PRIMITIVE
      ----------------------------------------------------------------------
      RETURN QUERY
      SELECT
        jsonb_build_object('timePrimitive', jsonb_build_object('infTimePrimitive', gv_to_jsonb (t3), 'timePrimitive', json_build_object('duration', t3.duration, 'julianDay', t3.julian_day, 'calendar', t3.calendar))) target_obj,
        fk_class target_class,
        'todo' target_label
      FROM
        information.v_time_primitive t3
      WHERE
        t3.pk_entity = _info_id;
      IF FOUND THEN
        RETURN;
      END IF;
      ----------------------------------------------------------------------
      --JOIN STATEMENT'S TARGET DIMENSION
      ----------------------------------------------------------------------
      RETURN QUERY
      SELECT
        jsonb_build_object('dimension',jsonb_build_object('dimension', gv_to_jsonb (t3), 'unitPreview', entity_preview.obj)) target_obj,
        fk_class target_class,
        concat_ws(' ', t3.numeric_value, entity_preview.entity_label) target_label
      FROM
        information.v_dimension t3
      LEFT JOIN LATERAL ( SELECT DISTINCT ON (pk_entity)
          gv_to_jsonb (e.t4) obj,
          e.entity_label
        FROM (
          --repo version
          SELECT
            t4, entity_label
          FROM
            war.entity_preview t4
          WHERE
            t4.pk_entity = t3.fk_measurement_unit
            AND project_id = 0
          UNION
          --project version
          SELECT
            t4, entity_label
          FROM
            war.entity_preview t4
          WHERE
            t4.pk_entity = t3.fk_measurement_unit
            AND project_id = _project_id) e) entity_preview ON TRUE
      WHERE
        t3.pk_entity = _info_id;
        IF FOUND THEN
          RETURN;
        END IF;
      ----------------------------------------------------------------------
      --JOIN STATEMENT'S TARGET ENTITY
      ----------------------------------------------------------------------
      RETURN QUERY
      SELECT
        jsonb_build_object('entity', jsonb_build_object('resource', gv_to_jsonb (t3), 'entityPreview', entity_preview.obj)) target_obj,
        fk_class target_class,
        entity_preview.entity_label target_label
      FROM
        information.resource t3
      LEFT JOIN LATERAL ( SELECT DISTINCT ON (pk_entity)
          gv_to_jsonb (e.t4) obj,
          e.entity_label
        FROM (
          --repo version
          SELECT
            t4, entity_label
          FROM
            war.entity_preview t4
          WHERE
            t4.pk_entity = _info_id
            AND project_id = 0
          UNION
          --project version
          SELECT
            t4, entity_label
          FROM
            war.entity_preview t4
          WHERE
            t4.pk_entity = _info_id
            AND project_id = _project_id) e) entity_preview ON TRUE
      WHERE
        t3.pk_entity = _info_id;
        IF FOUND THEN
          RETURN;
        END IF;
      ----------------------------------------------------------------------
      --JOIN STATEMENT'S TARGET DIGITAL
      ----------------------------------------------------------------------
      RETURN QUERY
      SELECT
        jsonb_build_object('digital', gv_to_jsonb (t3)) target_obj,
        0 target_class,
        '' target_label
      FROM
        data.digital t3
      WHERE
        t3.pk_entity = _data_id;
      IF FOUND THEN
        RETURN;
      END IF;
      ----------------------------------------------------------------------
      --JOIN STATEMENT'S TARGET CELL
      ----------------------------------------------------------------------
      RETURN QUERY
      SELECT
        jsonb_build_object('cell', gv_to_jsonb (t3)) target_obj,
        fk_class target_class,
        coalesce(string_value, numeric_value::text) target_label
      FROM
        tables.cell t3
      WHERE
        t3.pk_cell = _tables_cell_id;
      IF FOUND THEN
        RETURN;
      END IF;

      -- Uncomment this block for joining rows and create column row (fk_class)
      -- ----------------------------------------------------------------------
      -- --JOIN STATEMENT'S TARGET ROW
      -- ----------------------------------------------------------------------
      -- RETURN QUERY
      -- SELECT
      --   jsonb_build_object('row', gv_to_jsonb (t3)) target_obj,
      --   fk_class  target_class,
      --   'todo' target_label
      -- FROM
      --   tables.row t3
      -- WHERE
      --   t3.pk_row = _tables_row_id;
      -- IF FOUND THEN
      --   RETURN;
      -- END IF;
      ----------------------------------------------------------------------
      --ELSE RETURN 0 ROWS
      ----------------------------------------------------------------------
      RETURN;
    END
    $func$;




  `
  }
}

