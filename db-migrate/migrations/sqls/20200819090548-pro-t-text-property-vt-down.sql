ALTER TABLE projects.text_property_vt
DROP COLUMN fk_project ;

ALTER TABLE projects.text_property_vt
DROP COLUMN fk_pro_project ;

ALTER TABLE projects.text_property_vt
ADD COLUMN fk_entity INT;
