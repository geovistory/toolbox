/* Replace with your SQL commands */
-- 7
DROP TABLE information.resource_vt;

ALTER TABLE information.resource NO INHERIT information.entity;

-- 6
ALTER TABLE information.persistent_item_backup RENAME TO persistent_item;

ALTER TABLE information.temporal_entity_backup RENAME TO temporal_entity;

ALTER TABLE information.persistent_item_vt_backup RENAME TO persistent_item_vt;

ALTER TABLE information.temporal_entity_vt_backup RENAME TO temporal_entity_vt;

-- 5
ALTER TABLE information.persistent_item INHERIT information.entity;

ALTER TABLE information.temporal_entity INHERIT information.entity;

-- 4
CREATE OR REPLACE FUNCTION information.is_persistent_item_or_temporal_entity (integer)
  RETURNS boolean
  LANGUAGE 'sql'
  COST 100 VOLATILE
  AS $BODY$
  SELECT
    EXISTS (
      SELECT
        pk_entity
      FROM
        information.persistent_item
      WHERE
        pk_entity = $1
      UNION
      SELECT
        pk_entity
      FROM
        information.temporal_entity
      WHERE
        pk_entity = $1)
$BODY$;

CREATE FUNCTION information.v_persistent_item_find_or_create ()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE NOT LEAKPROOF
  AS $BODY$
DECLARE
  resulting_row information.persistent_item;
BEGIN
  -- RAISE INFO 'input values: %', NEW;
  ------ if existing, store in result -----
  SELECT
    *
  FROM
    INTO resulting_row information.persistent_item
  WHERE
    pk_entity = NEW.pk_entity;
  -- RAISE INFO 'result of select: %', resulting_row;
  ------- if not existing, insert and store in result -----
  IF NOT FOUND THEN
    -- RAISE INFO 'Not found, creating new...';
    WITH _insert AS (
INSERT INTO information.persistent_item (fk_class)
        VALUES (NEW.fk_class)
        -- return all fields of the new row
      RETURNING
        *)
      SELECT
        *
      FROM
        INTO resulting_row _insert;
    -- RAISE INFO 'result of insert: %', resulting_row;
  END IF;
  RETURN resulting_row;
END;
$BODY$;

CREATE FUNCTION information.v_temporal_entity_find_or_create ()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE NOT LEAKPROOF
  AS $BODY$
DECLARE
  resulting_row information.temporal_entity;
BEGIN
  -- RAISE INFO 'input values: %', NEW;
  ------ if existing, store in result -----
  SELECT
    *
  FROM
    INTO resulting_row information.temporal_entity
  WHERE
    pk_entity = NEW.pk_entity;
  -- RAISE INFO 'result of select: %', resulting_row;
  ------- if not existing, insert and store in result -----
  IF NOT FOUND THEN
    -- RAISE INFO 'Not found, creating new...';
    WITH _insert AS (
INSERT INTO information.temporal_entity (fk_class)
        VALUES (NEW.fk_class)
        -- return all fields of the new row
      RETURNING
        *)
      SELECT
        *
      FROM
        INTO resulting_row _insert;
    -- RAISE INFO 'result of insert: %', resulting_row;
  END IF;
  RETURN resulting_row;
END;
$BODY$;


-- 3
CREATE OR REPLACE VIEW information.v_temporal_entity
 AS
 SELECT temporal_entity.pk_entity,
    temporal_entity.schema_name,
    temporal_entity.table_name,
    temporal_entity.notes,
    temporal_entity.fk_creator,
    temporal_entity.fk_last_modifier,
    temporal_entity.tmsp_creation,
    temporal_entity.tmsp_last_modification,
    temporal_entity.sys_period,
    temporal_entity.fk_class
   FROM information.temporal_entity;
CREATE OR REPLACE VIEW information.v_persistent_item
 AS
 SELECT persistent_item.pk_entity,
    persistent_item.schema_name,
    persistent_item.table_name,
    persistent_item.notes,
    persistent_item.fk_creator,
    persistent_item.fk_last_modifier,
    persistent_item.tmsp_creation,
    persistent_item.tmsp_last_modification,
    persistent_item.sys_period,
    persistent_item.metadata,
    persistent_item.fk_class
   FROM information.persistent_item;
-- 2 + 1
DROP table information.resource;
