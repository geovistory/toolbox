-- 4
DROP TRIGGER on_insert ON data.v_digital_version;

-- 3
DROP FUNCTION data.v_digital_version_insert();

-- 2
DROP VIEW data.v_digital_version ;

-- 1

CREATE OR REPLACE VIEW information.v_digital_object_version AS
 SELECT v.pk_entity,
    v.schema_name,
    v.table_name,
    v.notes,
    v.fk_creator,
    v.fk_last_modifier,
    v.tmsp_creation,
    v.tmsp_last_modification,
    v.sys_period,
    v._deprecated_pk_digital_object AS pk_digital_object,
    v._deprecated_js_quill_data AS js_quill_data,
    v.entity_version,
    concat((v.pk_entity || '_'::text) || v.entity_version) AS pk_entity_version_concat
   FROM data.digital v
UNION ALL
 SELECT v.pk_entity,
    v.schema_name,
    v.table_name,
    v.notes,
    v.fk_creator,
    v.fk_last_modifier,
    v.tmsp_creation,
    v.tmsp_last_modification,
    v.sys_period,
    v._deprecated_pk_digital_object AS pk_digital_object,
    v._deprecated_js_quill_data AS js_quill_data,
    v.entity_version,
    concat((v.pk_entity || '_'::text) || v.entity_version) AS pk_entity_version_concat
   FROM data.digital_vt v;


CREATE FUNCTION information.v_digital_object_version_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$
  DECLARE
    resulting_concat_pk text;
      resulting_row information.v_digital_object_version; 
  BEGIN
  -- if there is a pk_entity, update the existing entity
  IF (NEW.pk_entity IS NOT NULL) THEN

  UPDATE information.digital_object SET
  notes = NEW.notes,
  js_quill_data = NEW.js_quill_data
  WHERE pk_entity = NEW.pk_entity
  RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO resulting_concat_pk;

  -- else if there is no pk_entity, insert a new entity
  ELSE

  INSERT INTO information.digital_object (notes, js_quill_data)
  VALUES(NEW.notes, NEW.js_quill_data)
  RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO resulting_concat_pk;

  END IF;

  -- in both cases return the pk_entity_version_concat, so that one can query the new version in the view
  SELECT * FROM INTO resulting_row information.v_digital_object_version where pk_entity_version_concat = resulting_concat_pk;
  
  RETURN resulting_row;
  END;

  $BODY$;


CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_digital_object_version
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_digital_object_version_insert();