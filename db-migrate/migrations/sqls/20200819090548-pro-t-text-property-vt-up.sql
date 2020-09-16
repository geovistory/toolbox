ALTER TABLE projects.text_property_vt
ADD COLUMN fk_project INT;

ALTER TABLE projects.text_property_vt
ADD COLUMN fk_pro_project INT;

ALTER TABLE projects.text_property_vt
drop COLUMN fk_entity;

-- update version history of added columns
UPDATE projects.text_property_vt t0
SET fk_pro_project = t1.fk_pro_project,
fk_project = t1.fk_project
FROM projects.text_property t1
WHERE t0.pk_entity = t1.pk_entity;
