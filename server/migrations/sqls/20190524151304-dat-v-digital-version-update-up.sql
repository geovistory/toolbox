-- 1
ALTER TABLE data.digital_vt
  ADD COLUMN metadata jsonb;

ALTER TABLE data.digital_vt
  ADD COLUMN fk_system_type integer;

-- 2
DROP VIEW data.v_digital_version;

CREATE OR REPLACE VIEW data.v_digital_version AS
SELECT
  v.pk_entity,
  v.schema_name,
  v.table_name,
  v.entity_version,
  v.notes,
  v.fk_namespace,
  v.fk_creator,
  v.fk_last_modifier,
  v.tmsp_creation,
  v.tmsp_last_modification,
  v.sys_period,
  v.metadata,
  v.pk_text,
  v.quill_doc,
  v.string,
  v.fk_system_type,
  concat((v.pk_text || '_'::text) || v.entity_version) AS pk_text_version_concat
FROM
  data.digital v
UNION ALL
SELECT
  v.pk_entity,
  v.schema_name,
  v.table_name,
  v.entity_version,
  v.notes,
  v.fk_namespace,
  v.fk_creator,
  v.fk_last_modifier,
  v.tmsp_creation,
  v.tmsp_last_modification,
  v.sys_period,
  v.metadata,
  v.pk_text,
  v.quill_doc,
  v.string,
  v.fk_system_type,
  concat((v.pk_text || '_'::text) || v.entity_version) AS pk_text_version_concat
FROM
  data.digital_vt v;

CREATE TRIGGER on_insert INSTEAD OF INSERT ON data.v_digital_version
FOR EACH ROW
EXECUTE PROCEDURE data.v_digital_version_insert ();

