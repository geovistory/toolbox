DROP FUNCTION IF EXISTS war.gv_field_page_incoming_in_project(integer, integer, integer, integer, bigint, bigint, integer, integer, json);

DROP FUNCTION IF EXISTS war.gv_field_page_incoming_in_repo(integer, integer, integer, bigint, bigint, integer, integer, json);

DROP FUNCTION IF EXISTS war.gv_field_page_outgoing_in_project(integer, integer, integer, integer, bigint, bigint, integer, integer, json);

DROP FUNCTION IF EXISTS war.gv_field_page_outgoing_in_repo(integer, integer, integer, bigint, bigint, integer, integer, json);

DROP FUNCTION IF EXISTS war.gv_get_statement_target(integer, integer, integer, bigint, bigint);

DROP FUNCTION IF EXISTS war.gv_to_jsonb(data.digital);

DROP FUNCTION IF EXISTS war.gv_to_jsonb(information.appellation);

DROP FUNCTION IF EXISTS war.gv_to_jsonb(information.language);

DROP FUNCTION IF EXISTS war.gv_to_jsonb(information.resource);

DROP FUNCTION IF EXISTS war.gv_to_jsonb(information.v_dimension);

DROP FUNCTION IF EXISTS war.gv_to_jsonb(information.v_lang_string);

DROP FUNCTION IF EXISTS war.gv_to_jsonb(information.v_place);

DROP FUNCTION IF EXISTS war.gv_to_jsonb(information.v_statement);

DROP FUNCTION IF EXISTS war.gv_to_jsonb(information.v_time_primitive);

DROP FUNCTION IF EXISTS war.gv_to_jsonb(projects.v_info_proj_rel);

DROP FUNCTION IF EXISTS war.gv_to_jsonb(tables."row");

DROP FUNCTION IF EXISTS war.gv_to_jsonb(tables.cell);

DROP FUNCTION IF EXISTS war.gv_to_jsonb(war.entity_preview_backup);

DROP FUNCTION IF EXISTS war.update_view_entity_preview(character varying);

