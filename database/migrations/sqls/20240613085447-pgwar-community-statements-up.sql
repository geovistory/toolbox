------ Table pgwar.community_statements -----------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pgwar.community_statements(
  pk_entity integer NOT NULL,
  fk_subject_info integer,
  fk_property integer NOT NULL,
  fk_object_info integer,
  fk_object_tables_cell bigint,
  ord_num_of_domain numeric,
  ord_num_of_range numeric,
  object_label varchar(100),
  object_value jsonb,
  tmsp_last_modification timestamp with time zone,
  PRIMARY KEY (pk_entity)
);

------ Table pgwar.community_statements ----------------------------------------------------------------
---------------------------------------------------------------------------------------------
-- this table is used by the fulltext cron job to find entities that need an fulltext update
-- because they are the subject or object of a deleted community statement
CREATE TABLE IF NOT EXISTS pgwar.community_statements_deleted(
  pk_entity integer NOT NULL,
  fk_subject_info integer,
  fk_property integer NOT NULL,
  fk_object_info integer,
  object_value jsonb,
  tmsp_deletion timestamp with time zone,
  PRIMARY KEY (pk_entity)
);

CREATE OR REPLACE FUNCTION pgwar.handle_community_statements_delete() 
RETURNS TRIGGER AS $$
BEGIN
    -- Insert or update the deleted row in pgwar.community_statements
    INSERT INTO pgwar.community_statements (pk_entity, fk_subject_info, fk_property, fk_object_info, object_value, tmsp_deletion)
    VALUES (OLD.pk_entity, OLD.fk_subject_info, OLD.fk_property, OLD.fk_object_info, OLD.object_value, CURRENT_TIMESTAMP)
    ON CONFLICT (pk_entity)
    DO UPDATE SET 
        fk_subject_info = EXCLUDED.fk_subject_info,
        fk_property = EXCLUDED.fk_property,
        fk_object_info = EXCLUDED.fk_object_info,
        object_value = EXCLUDED.object_value,
        tmsp_deletion = EXCLUDED.tmsp_deletion;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_delete_community_statements
AFTER DELETE ON pgwar.community_statements
FOR EACH ROW
EXECUTE FUNCTION pgwar.handle_community_statements_delete();

------ View pgwar.v_statements_combined -----------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE OR REPLACE VIEW pgwar.v_statements_combined AS
SELECT
    pk_entity,
    0 as fk_project,
    fk_subject_info,
    fk_property,
    fk_object_info,
    fk_object_tables_cell,
    ord_num_of_domain,
    ord_num_of_range,
    object_label,
    object_value,
    tmsp_last_modification
FROM pgwar.community_statements
UNION ALL
SELECT
    pk_entity,
    fk_project,
    fk_subject_info,
    fk_property,
    fk_object_info,
    fk_object_tables_cell,
    ord_num_of_domain,
    ord_num_of_range,
    object_label,
    object_value,
    tmsp_last_modification
FROM pgwar.project_statements;


------ View pgwar.v_statements_deleted_combined -----------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE OR REPLACE VIEW pgwar.v_statements_deleted_combined AS
SELECT
    pk_entity,
    0 as fk_project,
    fk_subject_info,
    fk_property,
    fk_object_info,
    object_value,
    tmsp_deletion
FROM pgwar.community_statements_deleted
UNION ALL
SELECT
    pk_entity,
    fk_project,
    fk_subject_info,
    fk_property,
    fk_object_info,
    object_value,
    tmsp_deletion
FROM pgwar.project_statements_deleted;