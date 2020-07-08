

-- 1

CREATE OR REPLACE VIEW data.v_digital_version AS
 SELECT v.pk_entity,
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
   FROM data.digital v
UNION ALL
 SELECT v.pk_entity,
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
   FROM data.digital_vt v;

CREATE FUNCTION data.v_digital_version_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
  DECLARE
    result data.digital;
    resulting_row data.v_digital_version;
  BEGIN
  -- if there is a pk_entity, update the existing entity
  IF (NEW.pk_entity IS NOT NULL) THEN

  UPDATE data.digital SET
    string = NEW.string,
    quill_doc = NEW.quill_doc
  WHERE pk_entity = NEW.pk_entity
  RETURNING * INTO result;

  -- else if there is no pk_entity, insert a new entity
  ELSE

  INSERT INTO data.digital (string, quill_doc)
  VALUES(NEW.string, NEW.quill_doc)
  RETURNING * INTO result;

  END IF;

  -- in both cases return the pk_entity_version_concat, so that one can query the new version in the view
  SELECT * FROM INTO resulting_row data.v_digital_version
  WHERE pk_entity = result.pk_entity
  AND entity_version =  result.entity_version;

  RETURN resulting_row;
  END;
  $BODY$;


CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON data.v_digital_version
    FOR EACH ROW
    EXECUTE PROCEDURE data.v_digital_version_insert();
