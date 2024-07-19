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
    -- Insert or update the deleted row in pgwar.community_statements_deleted
    INSERT INTO pgwar.community_statements_deleted (pk_entity, fk_subject_info, fk_property, fk_object_info, object_value, tmsp_deletion)
    VALUES (OLD.pk_entity, OLD.fk_subject_info, OLD.fk_property, OLD.fk_object_info, OLD.object_value, CURRENT_TIMESTAMP)
    ON CONFLICT (pk_entity)
    DO UPDATE SET 
        fk_subject_info = EXCLUDED.fk_subject_info,
        fk_property = EXCLUDED.fk_property,
        fk_object_info = EXCLUDED.fk_object_info,
        object_value = EXCLUDED.object_value,
        tmsp_deletion = CURRENT_TIMESTAMP;

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


------ Table pgwar.offsets ------------------------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pgwar.offsets(
  job_name text,
  offset_tmsp timestamp with time zone,
  PRIMARY KEY (job_name)
);

CREATE INDEX IF NOT EXISTS project_statements_tmsp_last_modification_idx
ON pgwar.project_statements USING btree
(tmsp_last_modification ASC NULLS LAST);

------ Function to update community statements from inserted or updated project statements --
---------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pgwar.update_community_statements_from_upserts()
RETURNS void AS $$
DECLARE
    _job_name text;
BEGIN
    _job_name := 'update-community-statements-from-upserts';

    -- initialize offset, if needed
    IF NOT EXISTS(
        SELECT offset_tmsp
        FROM pgwar.offsets
        WHERE job_name = _job_name
    ) THEN
        INSERT INTO pgwar.offsets (job_name, offset_tmsp)
        VALUES (_job_name, '2000-01-01 00:00:00.000000+00');
    END IF;

    -- get current offset
    WITH _offset AS (
        SELECT offset_tmsp
        FROM pgwar.offsets
        WHERE job_name = _job_name
    ),
    -- identify updated project statements
    upserted_p_stmts AS (
        SELECT pk_entity, 
                max(tmsp_last_modification) new_offset_tmsp
        FROM (
            SELECT pk_entity, tmsp_last_modification 
            FROM 
                pgwar.project_statements, 
                _offset
            WHERE tmsp_last_modification > _offset.offset_tmsp
            ORDER BY tmsp_last_modification ASC
        ) AS modified
        GROUP BY pk_entity
    ),
    insert_community_statements AS (
        -- insert or update community statements
        INSERT INTO pgwar.community_statements (
            pk_entity, 
            fk_subject_info,
            fk_property,
            fk_object_info,
            fk_object_tables_cell,
            ord_num_of_domain,
            ord_num_of_range,
            object_label,
            object_value,
            tmsp_last_modification
        )
        SELECT 
            p_stmt.pk_entity, 
            p_stmt.fk_subject_info,
            p_stmt.fk_property,
            p_stmt.fk_object_info,
            p_stmt.fk_object_tables_cell,
            avg(p_stmt.ord_num_of_domain) AS ord_num_of_domain,
            avg(p_stmt.ord_num_of_range) AS ord_num_of_range,
            p_stmt.object_label,
            p_stmt.object_value,
            upserted_p_stmts.new_offset_tmsp AS tmsp_last_modification
        FROM pgwar.project_statements p_stmt,
            upserted_p_stmts
        WHERE p_stmt.pk_entity = upserted_p_stmts.pk_entity
        GROUP BY 
            p_stmt.pk_entity, 
            p_stmt.fk_subject_info,
            p_stmt.fk_property,
            p_stmt.fk_object_info,
            p_stmt.fk_object_tables_cell,
            p_stmt.object_label,
            p_stmt.object_value,
            upserted_p_stmts.new_offset_tmsp
        ON CONFLICT (pk_entity)
        DO UPDATE SET
            fk_subject_info = EXCLUDED.fk_subject_info,
            fk_property = EXCLUDED.fk_property,
            fk_object_info = EXCLUDED.fk_object_info,
            fk_object_tables_cell = EXCLUDED.fk_object_tables_cell,
            ord_num_of_domain = EXCLUDED.ord_num_of_domain,
            ord_num_of_range = EXCLUDED.ord_num_of_range,
            object_label = EXCLUDED.object_label,
            object_value = EXCLUDED.object_value,
            tmsp_last_modification = EXCLUDED.tmsp_last_modification
        -- return the tmsp_last_modification which equals new_offset_tmsp
        RETURNING tmsp_last_modification
    )
    -- set the offset
    UPDATE pgwar.offsets
    SET offset_tmsp = new_offset.tmsp_last_modification
    FROM (
        SELECT tmsp_last_modification
        FROM insert_community_statements
        LIMIT 1
    ) new_offset
	WHERE job_name = _job_name;

END;
$$ LANGUAGE plpgsql;


CREATE INDEX IF NOT EXISTS project_statements_deleted_tmsp_deletion_idx
ON pgwar.project_statements_deleted USING btree
(tmsp_deletion ASC NULLS LAST);

------ Function to update community statements from deleted project statements --
---------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pgwar.update_community_statements_from_deletes()
RETURNS void AS $$
DECLARE
    _job_name text;
BEGIN
    _job_name := 'update-community-statements-from-deletes';

    -- initialize offset, if needed
    IF NOT EXISTS(
        SELECT offset_tmsp
        FROM pgwar.offsets
        WHERE job_name = _job_name
    ) THEN
        INSERT INTO pgwar.offsets (job_name, offset_tmsp)
        VALUES (_job_name, '2000-01-01 00:00:00.000000+00');
    END IF;

    -- get current offset
    WITH _offset AS (
        SELECT offset_tmsp
        FROM pgwar.offsets
        WHERE job_name = _job_name
    ),
    -- identify updated project statements
    deleted_p_stmts AS (
        SELECT 
            pk_entity, 
		    max(tmsp_deletion) new_offset_tmsp
        FROM (
            SELECT pk_entity, tmsp_deletion
            FROM 
                pgwar.project_statements_deleted, 
                _offset
            WHERE tmsp_deletion > _offset.offset_tmsp
            ORDER BY tmsp_deletion ASC
        ) AS modified
        GROUP BY pk_entity
    ),
    insert_community_statements AS (
        -- insert or update community statements
        INSERT INTO pgwar.community_statements (
            pk_entity, 
            fk_subject_info,
            fk_property,
            fk_object_info,
            fk_object_tables_cell,
            ord_num_of_domain,
            ord_num_of_range,
            object_label,
            object_value,
            tmsp_last_modification
        )
        SELECT 
            p_stmt.pk_entity, 
            p_stmt.fk_subject_info,
            p_stmt.fk_property,
            p_stmt.fk_object_info,
            p_stmt.fk_object_tables_cell,
            avg(p_stmt.ord_num_of_domain) AS ord_num_of_domain,
            avg(p_stmt.ord_num_of_range) AS ord_num_of_range,
            p_stmt.object_label,
            p_stmt.object_value,
            deleted_p_stmts.new_offset_tmsp AS tmsp_last_modification
        FROM pgwar.project_statements p_stmt,
            deleted_p_stmts
        WHERE p_stmt.pk_entity = deleted_p_stmts.pk_entity
        GROUP BY 
            p_stmt.pk_entity, 
            p_stmt.fk_subject_info,
            p_stmt.fk_property,
            p_stmt.fk_object_info,
            p_stmt.fk_object_tables_cell,
            p_stmt.object_label,
            p_stmt.object_value,
            deleted_p_stmts.new_offset_tmsp
        ON CONFLICT (pk_entity)
        DO UPDATE SET
            fk_subject_info = EXCLUDED.fk_subject_info,
            fk_property = EXCLUDED.fk_property,
            fk_object_info = EXCLUDED.fk_object_info,
            fk_object_tables_cell = EXCLUDED.fk_object_tables_cell,
            ord_num_of_domain = EXCLUDED.ord_num_of_domain,
            ord_num_of_range = EXCLUDED.ord_num_of_range,
            object_label = EXCLUDED.object_label,
            object_value = EXCLUDED.object_value,
            tmsp_last_modification = EXCLUDED.tmsp_last_modification
        -- return the tmsp_last_modification which equals new_offset_tmsp
        RETURNING tmsp_last_modification
    ),
    delete_community_statements AS (
        DELETE FROM pgwar.community_statements
        WHERE pk_entity IN (SELECT pk_entity FROM deleted_p_stmts)
        AND pk_entity NOT IN (
            SELECT DISTINCT ps.pk_entity 
            FROM pgwar.project_statements ps,
            deleted_p_stmts d
            WHERE ps.pk_entity = d.pk_entity
        )
    )
    -- set the offset
    UPDATE pgwar.offsets
    SET offset_tmsp = new_offset.tmsp_last_modification
    FROM (
        SELECT tmsp_last_modification
        FROM insert_community_statements
        LIMIT 1
    ) new_offset
	WHERE job_name = _job_name;

END;
$$ LANGUAGE plpgsql;

/**
* Indexes
**/

CREATE INDEX IF NOT EXISTS community_statements_fk_object_info_fk_property_idx
    ON pgwar.community_statements(fk_object_info,fk_property);

CREATE INDEX IF NOT EXISTS community_statements_fk_subject_info_fk_property_dx
    ON pgwar.community_statements(fk_subject_info,fk_property);
