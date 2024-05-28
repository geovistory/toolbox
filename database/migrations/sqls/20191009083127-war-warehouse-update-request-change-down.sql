-- 4
DROP FUNCTION warehouse.entity_preview_update_queue_worker;

-- 3
CREATE OR REPLACE FUNCTION warehouse.after_info_proj_rel_upsert ()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE NOT LEAKPROOF
  AS $BODY$
DECLARE
  _table_name VARCHAR;
  _fk_project INT;
  _fk_entity INT;
  _fk_temporal_entity INT;
  _fk_info_domain INT;
  _fk_info_range INT;
  _domain_is_in_project BOOLEAN;
  _range_is_in_project BOOLEAN;
  _BOOL BOOLEAN;
  _result JSONB;
  _new_label TEXT;
BEGIN
  _fk_project = NEW.fk_project;
  -- find the table name of the affected table
  SELECT
    table_name INTO _table_name
  FROM
    information.entity e
  WHERE
    e.pk_entity = NEW.fk_entity;
  --------------------- text_property ---------------------
  IF (
    SELECT
      _table_name = 'text_property') THEN
    SELECT
      t.fk_concerned_entity INTO _fk_entity
    FROM
      information.text_property t
    WHERE
      t.pk_entity = NEW.fk_entity;
    RAISE INFO 'updated epr of text_property for entity: %, fk_project: %', _fk_entity, _fk_project;
    PERFORM
      warehouse.needs_update ('entity_preview_non_recursive__upsert'::text,
        ARRAY['ARRAY[' || _fk_entity::text || ']'::text, _fk_project::text]);
    --------------------- role -----------------------------
  ELSIF (
      SELECT
        _table_name = 'role') THEN
    SELECT
      r.fk_entity INTO _fk_entity
    FROM
      information.role r
    WHERE
      r.pk_entity = NEW.fk_entity;
    SELECT
      r.fk_temporal_entity INTO _fk_temporal_entity
    FROM
      information.role r
    WHERE
      r.pk_entity = NEW.fk_entity;
    PERFORM
      warehouse.needs_update ('entity_preview_non_recursive__upsert'::text,
        ARRAY['ARRAY[' || _fk_entity::text || ']'::text, _fk_project::text]);
    PERFORM
      warehouse.needs_update ('entity_preview_non_recursive__upsert'::text,
        ARRAY['ARRAY[' || _fk_temporal_entity::text || ']'::text, _fk_project::text]);
    --------------------- entity_association -----------------
  ELSIF (
      SELECT
        _table_name = 'entity_association') THEN
    SELECT
      ea.fk_info_domain INTO _fk_info_domain
    FROM
      information.entity_association ea
    WHERE
      ea.pk_entity = NEW.fk_entity;
    SELECT
      ea.fk_info_range INTO _fk_info_range
    FROM
      information.entity_association ea
    WHERE
      ea.pk_entity = NEW.fk_entity;
    RAISE INFO 'updated epr of entity_association with fk_info_domain: %, fk_info_range: %, fk_project: %', _fk_info_domain, _fk_info_range, _fk_project;
    PERFORM
      warehouse.needs_update ('entity_preview_non_recursive__upsert'::text,
        ARRAY['ARRAY[' || _fk_info_domain::text || ']'::text, _fk_project::text]);
    PERFORM
      warehouse.needs_update ('entity_preview_non_recursive__upsert'::text,
        ARRAY['ARRAY[' || _fk_info_range::text || ']'::text, _fk_project::text]);
    --------------------- temporal_entity or persistent_item -----------------
  ELSIF (
      SELECT
        _table_name IN ('temporal_entity',
          'persistent_item')) THEN
    RAISE INFO 'updated crm entity with pk_entity: %, fk_project: %', NEW.fk_entity, _fk_project;
    IF (NEW.is_in_project = TRUE) THEN
      PERFORM
        warehouse.needs_update ('entity_preview_non_recursive__upsert'::text,
          ARRAY['ARRAY[' || NEW.fk_entity::text || ']'::text, _fk_project::text]);
    ELSIF (NEW.is_in_project = FALSE) THEN
      PERFORM
        warehouse.needs_update ('entity_preview_non_recursive__delete'::text,
          ARRAY['ARRAY[' || NEW.fk_entity::text || ']'::text, _fk_project::text]);
    END IF;
  END IF;
  RETURN NEW;
END;
$BODY$;

-- 2
DROP TABLE warehouse.entity_preview_update_queue;

