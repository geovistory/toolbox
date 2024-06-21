------ Drop triggers after upsert and delete on literal tables ---------------------------------
---------------------------------------------------------------------------------------------
DROP TRIGGER IF EXISTS after_upsert_appellation ON information.appellation;
DROP TRIGGER IF EXISTS after_upsert_dimension ON information.dimension;
DROP TRIGGER IF EXISTS after_upsert_lang_string ON information.lang_string;
DROP TRIGGER IF EXISTS after_upsert_language ON information.language;
DROP TRIGGER IF EXISTS after_upsert_place ON information.place;
DROP TRIGGER IF EXISTS after_upsert_time_primitive ON information.time_primitive;
DROP TRIGGER IF EXISTS after_upsert_cell ON tables.cell;

DROP TRIGGER IF EXISTS after_delete_appellation ON information.appellation;
DROP TRIGGER IF EXISTS after_delete_dimension ON information.dimension;
DROP TRIGGER IF EXISTS after_delete_lang_string ON information.lang_string;
DROP TRIGGER IF EXISTS after_delete_language ON information.language;
DROP TRIGGER IF EXISTS after_delete_place ON information.place;
DROP TRIGGER IF EXISTS after_delete_time_primitive ON information.time_primitive;
DROP TRIGGER IF EXISTS after_delete_cell ON tables.cell;

DROP TRIGGER IF EXISTS after_upsert_statement ON information.statement;
DROP TRIGGER IF EXISTS after_delete_statement ON information.statement;

------ Drop trigger functions -----------------------------------------------------------------
---------------------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS pgwar.after_upsert_object_info();
DROP FUNCTION IF EXISTS pgwar.after_upsert_object_tables_cell();
DROP FUNCTION IF EXISTS pgwar.after_delete_object_info();
DROP FUNCTION IF EXISTS pgwar.after_delete_object_tables_cell();
DROP FUNCTION IF EXISTS pgwar.after_upsert_statement();
DROP FUNCTION IF EXISTS pgwar.after_delete_statement();

------ Drop upsert_statement function ---------------------------------------------------------
---------------------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS pgwar.upsert_statement(pgwar.statement);

------ Drop pgwar.statement table -------------------------------------------------------------
---------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS pgwar.statement;

------ Drop custom functions ------------------------------------------------------------------
---------------------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS pgwar.get_value_object(information.appellation);
DROP FUNCTION IF EXISTS pgwar.get_value_object(information.place);
DROP FUNCTION IF EXISTS pgwar.get_value_object(information.language);
DROP FUNCTION IF EXISTS pgwar.get_value_object(information.time_primitive);
DROP FUNCTION IF EXISTS pgwar.get_value_object(information.lang_string);
DROP FUNCTION IF EXISTS pgwar.get_value_object(tables.cell);
DROP FUNCTION IF EXISTS pgwar.get_value_object(information.dimension);

DROP FUNCTION IF EXISTS pgwar.get_value_label(information.appellation);
DROP FUNCTION IF EXISTS pgwar.get_value_label(information.place);
DROP FUNCTION IF EXISTS pgwar.get_value_label(information.language);
DROP FUNCTION IF EXISTS pgwar.get_value_label(information.time_primitive);
DROP FUNCTION IF EXISTS pgwar.get_value_label(information.lang_string);
DROP FUNCTION IF EXISTS pgwar.get_value_label(tables.cell);
DROP FUNCTION IF EXISTS pgwar.get_value_label(information.dimension);

DROP FUNCTION IF EXISTS pgwar.update_from_statement(information.statement);

------ Drop functions in commons schema -------------------------------------------------------
---------------------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS commons.julian_second__to_iso_8601(bigint);
DROP FUNCTION IF EXISTS commons.julian_day_to_gregorian_pretty(integer);
DROP FUNCTION IF EXISTS commons.time_primitive__pretty_json(information.time_primitive);
