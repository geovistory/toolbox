-- Test the creation of project and community entities
-- after modifying information.resource and projects.info_proj_rel

-- Start transaction and plan the tests.
BEGIN;
SELECT plan(14);

------- Prepare required context data ------

-- Insert a language entry to be used in projects
INSERT INTO information.language(pk_language) VALUES ('eng');

-- Insert two projects associated with the language
INSERT INTO projects.project(fk_language, notes)
SELECT pk_entity, '_p1' FROM information.language;

INSERT INTO projects.project(fk_language, notes)
SELECT pk_entity, '_p2' FROM information.language;

------- INSERT data directly related to this test -----
-- Insert one entity with a specific class and community visibility
INSERT INTO information.resource(fk_class, community_visibility, notes)
VALUES (11, '{"toolbox":true}', '_1');

-- Add the entity to project _p1
INSERT INTO projects.info_proj_rel(fk_project, fk_entity, is_in_project, notes)
SELECT t1.pk_entity, t2.pk_entity, TRUE, '_ipr1'
FROM projects.project t1, information.resource t2
WHERE t1.notes = '_p1';

-- Add the entity to project _p2
INSERT INTO projects.info_proj_rel(fk_project, fk_entity, is_in_project, notes)
SELECT t1.pk_entity, t2.pk_entity, TRUE, '_ipr2'
FROM projects.project t1, information.resource t2
WHERE t1.notes = '_p2';

-- Assert a project entity preview is created for project _p1
SELECT IS (fk_class, 11, 'Assert project entity preview is created')
FROM pgwar.entity_preview t1, projects.project t2
WHERE t1.fk_project = t2.pk_entity AND t2.notes = '_p1';

-- Assert a community entity preview is created
SELECT IS (fk_class, 11, 'Assert community entity preview is created')
FROM pgwar.entity_preview
WHERE fk_project = 0;

-- Remove the entity from project _p1
UPDATE projects.info_proj_rel
SET is_in_project = FALSE
WHERE notes = '_ipr1';

-- Prepare and assert the project entity preview for project _p1 is deleted
PREPARE get_project_entity_preview AS
SELECT * FROM pgwar.entity_preview t1, projects.project t2
WHERE t1.fk_project = t2.pk_entity AND t2.notes = $1;

SELECT is_empty('get_project_entity_preview(''_p1'')', 'Assert entity preview for project _p1 is deleted');

-- Assert the project entity preview for project _p2 is not deleted
SELECT isnt_empty('get_project_entity_preview(''_p2'')', 'Assert entity preview for project _p2 is not deleted');

-- Assert the community entity preview is still present
PREPARE get_community_entity_preview AS
SELECT * FROM pgwar.entity_preview WHERE fk_project = 0;

SELECT isnt_empty('get_community_entity_preview', 'Assert community entity preview is still present');

-- Remove the entity from project _p2 using DELETE
DELETE FROM projects.info_proj_rel WHERE notes = '_ipr2';

-- Assert the project entity preview for project _p2 is deleted
SELECT is_empty('get_project_entity_preview(''_p2'')', 'Assert project entity preview for _p2 is deleted');

-- Assert the community entity preview is deleted
SELECT is_empty('get_community_entity_preview', 'Assert community entity preview is deleted');

-- Add the entity back to project _p1
UPDATE projects.info_proj_rel
SET is_in_project = TRUE
WHERE notes = '_ipr1';

-- Update the fk_class of the entity
UPDATE information.resource
SET fk_class = 33
WHERE notes = '_1';

-- Assert the fk_class has been updated on the project entity preview for project _p1
SELECT IS (fk_class, 33, 'Assert fk_class has been updated on project entity preview')
FROM pgwar.entity_preview t1, projects.project t2
WHERE t1.fk_project = t2.pk_entity AND t2.notes = '_p1';

-- Assert the fk_class has been updated on the community entity preview
SELECT IS (fk_class, 33, 'Assert fk_class has been updated on community entity preview')
FROM pgwar.entity_preview
WHERE fk_project = 0;

-- Remove entity from toolbox community visibility
UPDATE information.resource
SET community_visibility = '{"toolbox":false}'
WHERE notes = '_1';

-- Assert the community entity preview is not present
SELECT is_empty('get_community_entity_preview', 'Assert community entity preview is not present');

-- Add entity to toolbox community visibility
UPDATE information.resource
SET community_visibility = '{"toolbox":true}'
WHERE notes = '_1';

-- Assert the community entity preview is present
SELECT isnt_empty('get_community_entity_preview', 'Assert community entity preview is present');

-- Delete the entity from information.resource
DELETE FROM information.resource;

-- Assert the community entity preview is not present
SELECT is_empty('get_community_entity_preview', 'Assert community entity preview is not present');

-- Assert the project entity preview for project _p1 is deleted
SELECT is_empty('get_project_entity_preview(''_p1'')', 'Assert project entity preview for _p1 is deleted');

-- Assert the project entity preview for project _p2 is deleted
SELECT is_empty('get_project_entity_preview(''_p2'')', 'Assert project entity preview for _p2 is deleted');

-- Finish the tests and clean up.
SELECT * FROM finish();
ROLLBACK;
