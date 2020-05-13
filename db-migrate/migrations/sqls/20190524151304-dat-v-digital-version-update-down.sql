-- 2
DROP VIEW data.v_digital_version;
CREATE OR REPLACE VIEW data.v_digital_version AS
 SELECT v.pk_entity,
    v.pk_text,
    v.schema_name,
    v.table_name,
    v.notes,
    v.fk_creator,
    v.fk_last_modifier,
    v.tmsp_creation,
    v.tmsp_last_modification,
    v.sys_period,
    v.quill_doc,
    v.string,
    v.entity_version,
    concat((v.pk_text || '_'::text) || v.entity_version) AS pk_text_version_concat
   FROM data.digital v
UNION ALL
 SELECT v.pk_entity,
    v.pk_text,
    v.schema_name,
    v.table_name,
    v.notes,
    v.fk_creator,
    v.fk_last_modifier,
    v.tmsp_creation,
    v.tmsp_last_modification,
    v.sys_period,
    v.quill_doc,
    v.string,
    v.entity_version,
    concat((v.pk_text || '_'::text) || v.entity_version) AS pk_text_version_concat
   FROM data.digital_vt v;


CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON data.v_digital_version
    FOR EACH ROW
    EXECUTE PROCEDURE data.v_digital_version_insert();


-- 1
ALTER TABLE data.digital_vt DROP COLUMN fk_system_type;
ALTER TABLE data.digital_vt DROP COLUMN metadata;
