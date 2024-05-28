-- 1 create merged table having all data from persistent_item and temporal_entity
CREATE TABLE information.resource as
    SELECT * FROM information.temporal_entity
    UNION
    SELECT * FROM information.persistent_item
;
UPDATE information.resource
SET table_name = 'resource';

-- 2 attach pk_entity to sequence

ALTER TABLE information.resource ALTER COLUMN pk_entity SET DEFAULT nextval('information.entity_pk_entity_seq'::regclass);

-- 3 remove views
DROP VIEW information.v_persistent_item;
DROP VIEW information.v_temporal_entity;

-- 4 drop functions
drop function information.is_persistent_item_or_temporal_entity;
drop function information.v_persistent_item_find_or_create;
drop function information.v_temporal_entity_find_or_create;

-- 5 un-inherit persistent_item and temporal_entity tables
ALTER TABLE information.persistent_item NO INHERIT information.entity;
ALTER TABLE information.temporal_entity NO INHERIT information.entity;

-- 6 rename tables
ALTER TABLE information.persistent_item RENAME TO persistent_item_backup;
ALTER TABLE information.temporal_entity RENAME TO temporal_entity_backup;
ALTER TABLE information.persistent_item_vt RENAME TO persistent_item_vt_backup;
ALTER TABLE information.temporal_entity_vt RENAME TO temporal_entity_vt_backup;

-- 7 make resource child of entity
ALTER TABLE information.resource ALTER COLUMN pk_entity SET NOT NULL;
ALTER TABLE information.resource ALTER COLUMN schema_name SET NOT NULL;
ALTER TABLE information.resource ALTER COLUMN table_name SET NOT NULL;

ALTER TABLE information.resource INHERIT information.entity;

-- 8 add triggers and _vt table
SELECT
    commons.init_entity_child_table ('information.resource');

CREATE TRIGGER notify_modification
    AFTER INSERT OR DELETE OR UPDATE
    ON information.resource
    FOR EACH STATEMENT
    EXECUTE PROCEDURE commons.notify_modification_trigger();

-- 9 redirect foreign keys to new table
ALTER TABLE information.dimension DROP CONSTRAINT dimension_fk_measurement_unit_fkey;

ALTER TABLE information.dimension
    ADD CONSTRAINT dimension_fk_measurement_unit_fkey FOREIGN KEY (fk_measurement_unit)
    REFERENCES information.resource (pk_entity) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE projects.argument DROP CONSTRAINT assertion_fk_assertion_method_type_fkey;

ALTER TABLE projects.argument
    ADD CONSTRAINT assertion_fk_assertion_method_type_fkey FOREIGN KEY (fk_argument_method_type)
    REFERENCES information.resource (pk_entity) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE system.system_relevant_type DROP CONSTRAINT system_relevant_type_fk_type_fkey;

ALTER TABLE system.system_relevant_type
    ADD CONSTRAINT system_relevant_type_fk_type_fkey FOREIGN KEY (fk_type)
    REFERENCES information.resource (pk_entity) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;
