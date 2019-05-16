-- 1
ALTER TABLE projects.argument DROP COLUMN fk_is_about_role;

ALTER TABLE projects.argument DROP COLUMN fk_is_about_entity_association;

ALTER TABLE projects.argument DROP COLUMN fk_is_based_on_role;

ALTER TABLE projects.argument DROP COLUMN fk_is_based_on_entity_association;

ALTER TABLE projects.argument DROP COLUMN fk_is_based_on_persistent_item;

ALTER TABLE projects.argument DROP COLUMN fk_is_based_on_factoid_role;

ALTER TABLE projects.argument DROP COLUMN fk_is_based_on_cell;

ALTER TABLE projects.argument_vt DROP COLUMN fk_is_about_role;

ALTER TABLE projects.argument_vt DROP COLUMN fk_is_about_entity_association;

ALTER TABLE projects.argument_vt DROP COLUMN fk_is_based_on_role;

ALTER TABLE projects.argument_vt DROP COLUMN fk_is_based_on_entity_association;

ALTER TABLE projects.argument_vt DROP COLUMN fk_is_based_on_persistent_item;

ALTER TABLE projects.argument_vt DROP COLUMN fk_is_based_on_factoid_role;

ALTER TABLE projects.argument_vt DROP COLUMN fk_is_based_on_cell;


-- 2 
ALTER TABLE projects.argument
    ADD COLUMN fk_is_about_info_entity integer; 

ALTER TABLE projects.argument_vt
    ADD COLUMN fk_is_about_info_entity integer; 

ALTER TABLE projects.argument
    ADD COLUMN fk_is_based_on_info_entity integer; 

ALTER TABLE projects.argument_vt
    ADD COLUMN fk_is_based_on_info_entity integer; 

ALTER TABLE projects.argument
    ADD COLUMN fk_is_based_on_data_entity integer; 

ALTER TABLE projects.argument_vt
    ADD COLUMN fk_is_based_on_data_entity integer; 

ALTER TABLE projects.argument RENAME COLUMN source_reliability TO is_based_on_reliability;
ALTER TABLE projects.argument_vt RENAME COLUMN source_reliability TO is_based_on_reliability; 

ALTER TABLE projects.argument RENAME COLUMN fk_assertion_method_type TO fk_argument_method_type;
ALTER TABLE projects.argument_vt RENAME COLUMN fk_assertion_method_type TO fk_argument_method_type; 

ALTER TABLE projects.argument
    ADD COLUMN fk_project integer NOT NULL REFERENCES projects.project (pk_entity); 
ALTER TABLE projects.argument_vt
    ADD COLUMN fk_project integer NOT NULL REFERENCES projects.project (pk_entity); 
