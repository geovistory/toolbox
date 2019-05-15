-- 2

CREATE TABLE projects.namespace_project_rel_vt
(
    pk_entity integer NOT NULL,
    schema_name character varying COLLATE pg_catalog."default",
    table_name character varying COLLATE pg_catalog."default",
    entity_version integer,
    notes text COLLATE pg_catalog."default",
    fk_creator integer,
    fk_last_modifier integer,
    tmsp_creation timestamp with time zone,
    tmsp_last_modification timestamp with time zone,
    sys_period tstzrange,
    fk_project integer,
    fk_class integer,
    fk_namespace integer
);

-- 1
CREATE TABLE projects.namespace_project_rel
(
    fk_project integer,
    fk_class integer,
    fk_namespace integer,
    CONSTRAINT commons_namespace_project_rel_pk_entity_unique UNIQUE (pk_entity)
,
    CONSTRAINT namespace_project_rel_fk_project_fk_class_key UNIQUE (fk_project, fk_class)
,
    CONSTRAINT namespace_project_rel_fk_class_fkey FOREIGN KEY (fk_class)
        REFERENCES data_for_history.class (dfh_pk_class) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT namespace_project_rel_fk_namespace_fkey FOREIGN KEY (fk_namespace)
        REFERENCES information.namespace (pk_entity) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT namespace_project_rel_fk_project_fkey FOREIGN KEY (fk_project)
        REFERENCES projects.project (pk_entity) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    INHERITS (projects.entity);

-- Trigger: create_entity_version_key

-- DROP TRIGGER create_entity_version_key ON projects.namespace_project_rel;

CREATE TRIGGER create_entity_version_key
    BEFORE INSERT
    ON projects.namespace_project_rel
    FOR EACH ROW
    EXECUTE PROCEDURE commons.create_entity_version_key();

-- Trigger: creation_tmsp

-- DROP TRIGGER creation_tmsp ON projects.namespace_project_rel;

CREATE TRIGGER creation_tmsp
    BEFORE INSERT
    ON projects.namespace_project_rel
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_creation();

-- Trigger: insert_schema_table_name

-- DROP TRIGGER insert_schema_table_name ON projects.namespace_project_rel;

CREATE TRIGGER insert_schema_table_name
    BEFORE INSERT
    ON projects.namespace_project_rel
    FOR EACH ROW
    EXECUTE PROCEDURE commons.insert_schema_table_name();

-- Trigger: last_modification_tmsp

-- DROP TRIGGER last_modification_tmsp ON projects.namespace_project_rel;

CREATE TRIGGER last_modification_tmsp
    BEFORE INSERT OR UPDATE 
    ON projects.namespace_project_rel
    FOR EACH ROW
    EXECUTE PROCEDURE commons.tmsp_last_modification();

-- Trigger: update_entity_version_key

-- DROP TRIGGER update_entity_version_key ON projects.namespace_project_rel;

CREATE TRIGGER update_entity_version_key
    BEFORE UPDATE 
    ON projects.namespace_project_rel
    FOR EACH ROW
    EXECUTE PROCEDURE commons.update_entity_version_key();

-- Trigger: versioning_trigger

-- DROP TRIGGER versioning_trigger ON projects.namespace_project_rel;

CREATE TRIGGER versioning_trigger
    BEFORE INSERT OR DELETE OR UPDATE 
    ON projects.namespace_project_rel
    FOR EACH ROW
    EXECUTE PROCEDURE public.versioning('sys_period', 'projects.namespace_project_rel', 'true');