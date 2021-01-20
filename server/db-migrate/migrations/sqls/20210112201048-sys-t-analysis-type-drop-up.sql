-- 1 create system types for analysis types
SELECT setval('system.entity_pk_entity_seq', 3330, true);
INSERT INTO System.system_type (st_schema_name, st_table_name, st_column_name, definition)
VALUES
('projects', 'analysis', 'fk_analysis_type', 'time-chart'),
('projects', 'analysis', 'fk_analysis_type', 'table'),
('projects', 'analysis', 'fk_analysis_type', 'map-and-time-cont');
SELECT  setval('system.entity_pk_entity_seq',  max(pk_entity), true)from system.entity;

-- 2 redirect foreign key to use system types
ALTER TABLE projects.analysis DROP CONSTRAINT analysis_fk_analysis_type_fkey;

ALTER TABLE projects.analysis
    ADD CONSTRAINT analysis_fk_analysis_type_fkey FOREIGN KEY (fk_analysis_type)
    REFERENCES system.system_type (pk_entity);

-- 3 mark table as deprecated
ALTER TABLE system.analysis_type RENAME TO analysis_type_deprecated;

ALTER TABLE system.analysis_type_vt RENAME TO analysis_type_vt_deprecated;
