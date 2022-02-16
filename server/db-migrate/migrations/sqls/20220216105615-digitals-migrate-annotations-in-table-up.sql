-- select 'refersto' statements
CREATE TEMP TABLE stmt_refersto ON COMMIT DROP AS
SELECT
  t1.pk_entity AS pk_statement, t1.fk_subject_tables_cell AS pk_spot, -- cell
  t1.fk_object_info AS pk_referred_entity, -- entity, the stmt refers to
  t3.pk_entity AS pk_table -- entity (Table), of which the spot is part of
FROM
  information.statement t1, tables.cell t2, information.resource t3
WHERE
  t1.fk_property = 1334
  AND t1.fk_subject_tables_cell = t2.pk_cell
  AND t2.fk_digital = (t3.metadata ->> 'pkDigital')::int;

-- For each cell -> refers to statement, we create a new information.resource of class Annotation in Table 934
INSERT INTO information.resource (fk_class, community_visibility, metadata)
SELECT
  934,
  '{ "dataApi": false, "toolbox": false, "website": false}',
  json_build_object('id', 'digitals_8', 'created', 'By Jonas Schneider for Digitals', 'refersToStmt', pk_statement)
FROM
  stmt_refersto;

CREATE TEMP TABLE stmt_refersto_and_new_resource ON COMMIT DROP AS
SELECT
  t1.*, t2.pk_entity AS pk_annotation_in_table
FROM
  stmt_refersto t1, information.resource t2
WHERE
  t1.pk_statement = (t2.metadata ->> 'refersToStmt')::int
  AND t2.metadata ->> 'id' = 'digitals_8';

-- For each stmt_refersto, we create a new information.statement
-- C27 Annotation in Table >	P23 is annotated in (has annotation) 1872 >	geov:C18 Table
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_info, metadata)
SELECT
  t1.pk_annotation_in_table,
  1872,
  t1.pk_table,
  json_build_object('id', 'digitals_8', 'created', 'By Jonas Schneider for Digitals', 'refersToStmt', t1.pk_statement)
FROM
  stmt_refersto_and_new_resource t1
RETURNING
  pk_entity;

-- For each stmt_refersto, we create a new information.statement
-- C27 Annotation in Table >	P24 at position (is spot of) 1874  > geov:C7 Cell
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_tables_cell, metadata)
SELECT
  t1.pk_annotation_in_table,
  1874,
  t1.pk_spot,
  json_build_object('id', 'digitals_8', 'created', 'By Jonas Schneider for Digitals', 'refersToStmt', t1.pk_statement)
FROM
  stmt_refersto_and_new_resource t1
RETURNING
  pk_entity;

-- For each stmt_refersto, we create a new information.statement
-- C27 Annotation in Table >	P25 annotated entity (is annotated by) 1875	> crm:E1 CRM Entity
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_info, metadata)
SELECT
  t1.pk_annotation_in_table,
  1875,
  t1.pk_referred_entity,
  json_build_object('id', 'digitals_8', 'created', 'By Jonas Schneider for Digitals', 'refersToStmt', t1.pk_statement)
FROM
  stmt_refersto_and_new_resource t1
RETURNING
  pk_entity;

------- project relations --------
-- disable triggers to keep original timestamps
DROP TRIGGER creation_tmsp ON projects.info_proj_rel;

DROP TRIGGER last_modification_tmsp ON projects.info_proj_rel;

-- select project relations of original statements
CREATE TEMP TABLE refersto_stmt_project_rels ON COMMIT DROP AS
SELECT
  t2.pk_statement, t1.fk_project, t1.fk_last_modifier, t1.fk_creator, t1.tmsp_last_modification, t1.tmsp_creation, t1.pk_entity AS pk_proj_rel
FROM
  projects.info_proj_rel t1, stmt_refersto t2
WHERE
  t1.fk_entity = t2.pk_statement
  AND t1.is_in_project = TRUE;

-- add the new statements to the projects
INSERT INTO projects.info_proj_rel (fk_entity, fk_project, fk_last_modifier, fk_creator, tmsp_last_modification, tmsp_creation, is_in_project)
SELECT
  t1.pk_entity,
  t2.fk_project,
  t2.fk_last_modifier,
  t2.fk_creator,
  t2.tmsp_last_modification,
  t2.tmsp_creation,
  TRUE
FROM
  information.statement t1,
  refersto_stmt_project_rels t2
WHERE
  t2.pk_statement = (t1.metadata ->> 'refersToStmt')::int
  AND t1.metadata ->> 'id' = 'digitals_8'
  AND t1.metadata ->> 'created' IS NOT NULL
RETURNING
  *;

-- add the new entity to the projects
INSERT INTO projects.info_proj_rel (fk_entity, fk_project, fk_last_modifier, fk_creator, tmsp_last_modification, tmsp_creation, is_in_project)
SELECT
  t1.pk_entity,
  t2.fk_project,
  t2.fk_last_modifier,
  t2.fk_creator,
  t2.tmsp_last_modification,
  t2.tmsp_creation,
  TRUE
FROM
  information.resource t1,
  refersto_stmt_project_rels t2
WHERE
  t2.pk_statement = (t1.metadata ->> 'refersToStmt')::int
  AND t1.metadata ->> 'id' = 'digitals_8'
  AND t1.metadata ->> 'created' IS NOT NULL
RETURNING
  *;

-- enable the triggers again
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation ();

CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification ();

-- remove the original statement from all projects
UPDATE
  projects.info_proj_rel t1
SET
  is_in_project = FALSE
FROM
  refersto_stmt_project_rels t2
WHERE
  t1.pk_entity = t2.pk_proj_rel;

