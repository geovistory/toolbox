-- 2 
ALTER TABLE projects.argument DROP COLUMN fk_project;
ALTER TABLE projects.argument_vt DROP COLUMN fk_project;

ALTER TABLE projects.argument RENAME COLUMN fk_argument_method_type TO fk_assertion_method_type;
ALTER TABLE projects.argument_vt RENAME COLUMN fk_argument_method_type TO fk_assertion_method_type; 

ALTER TABLE projects.argument RENAME COLUMN is_based_on_reliability TO source_reliability;
ALTER TABLE projects.argument_vt RENAME COLUMN is_based_on_reliability TO source_reliability; 

ALTER TABLE projects.argument DROP COLUMN fk_is_based_on_data_entity;
ALTER TABLE projects.argument_vt DROP COLUMN fk_is_based_on_data_entity;

ALTER TABLE projects.argument DROP COLUMN fk_is_based_on_info_entity;
ALTER TABLE projects.argument_vt DROP COLUMN fk_is_based_on_info_entity;

ALTER TABLE projects.argument DROP COLUMN fk_is_about_info_entity;
ALTER TABLE projects.argument_vt DROP COLUMN fk_is_about_info_entity;

-- 1
ALTER TABLE projects.argument
    ADD COLUMN fk_is_based_on_cell integer NOT NULL; 

ALTER TABLE projects.argument
    ADD COLUMN fk_is_based_on_factoid_role integer NOT NULL; 

ALTER TABLE projects.argument
    ADD COLUMN fk_is_based_on_persistent_item integer NOT NULL; 

ALTER TABLE projects.argument
    ADD COLUMN fk_is_based_on_entity_association integer NOT NULL; 
    
ALTER TABLE projects.argument
    ADD COLUMN fk_is_based_on_role integer NOT NULL; 

ALTER TABLE projects.argument
    ADD COLUMN fk_is_about_entity_association integer NOT NULL; 
    
ALTER TABLE projects.argument
    ADD COLUMN fk_is_about_role integer NOT NULL; 

ALTER TABLE projects.argument_vt
    ADD COLUMN fk_is_based_on_cell integer NOT NULL; 

ALTER TABLE projects.argument_vt
    ADD COLUMN fk_is_based_on_factoid_role integer NOT NULL; 

ALTER TABLE projects.argument_vt
    ADD COLUMN fk_is_based_on_persistent_item integer NOT NULL; 

ALTER TABLE projects.argument_vt
    ADD COLUMN fk_is_based_on_entity_association integer NOT NULL; 
    
ALTER TABLE projects.argument_vt
    ADD COLUMN fk_is_based_on_role integer NOT NULL; 

ALTER TABLE projects.argument_vt
    ADD COLUMN fk_is_about_entity_association integer NOT NULL; 
    
ALTER TABLE projects.argument_vt
    ADD COLUMN fk_is_about_role integer NOT NULL; 