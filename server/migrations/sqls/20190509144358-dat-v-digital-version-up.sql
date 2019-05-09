-- 1
DROP VIEW information.v_digital_object_version;
DROP FUNCTION information.v_digital_object_version_insert();

-- 2 
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


-- 3

CREATE FUNCTION data.v_digital_version_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$
  DECLARE
    resulting_concat_pk text;
      resulting_row data.v_digital_version; 
  BEGIN
  -- if there is a pk_entity, update the existing entity
  IF (NEW.pk_entity IS NOT NULL) THEN

  UPDATE data.digital SET
    notes = NEW.notes,
    quill_doc = NEW.quill_doc
  WHERE pk_entity = NEW.pk_entity
  RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO resulting_concat_pk;

  -- else if there is no pk_entity, insert a new entity
  ELSE

  INSERT INTO data.digital (notes, quill_doc)
  VALUES(NEW.notes, NEW.quill_doc)
  RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO resulting_concat_pk;

  END IF;

  -- in both cases return the pk_entity_version_concat, so that one can query the new version in the view
  SELECT * FROM INTO resulting_row data.v_digital_version where pk_entity_version_concat = resulting_concat_pk;
  
  RETURN resulting_row;
  END;

  $BODY$;


-- 4

CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON data.v_digital_version
    FOR EACH ROW
    EXECUTE PROCEDURE data.v_digital_version_insert();