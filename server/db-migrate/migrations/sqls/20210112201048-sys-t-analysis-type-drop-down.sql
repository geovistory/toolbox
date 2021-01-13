-- 3 unmark table as deprecated
ALTER TABLE system.analysis_type_deprecated RENAME TO analysis_type;
ALTER TABLE system.analysis_type_vt_deprecated RENAME TO analysis_type_vt;

-- 2 redirect foreign key to use system types
ALTER TABLE projects.analysis DROP CONSTRAINT analysis_fk_analysis_type_fkey;

ALTER TABLE projects.analysis
    ADD CONSTRAINT analysis_fk_analysis_type_fkey FOREIGN KEY (fk_analysis_type)
    REFERENCES system.analysis_type (pk_entity);


-- 1 drop system types for analysis types
DELETE FROM system.system_type WHERE pk_entity IN (3331,3332,3333)
