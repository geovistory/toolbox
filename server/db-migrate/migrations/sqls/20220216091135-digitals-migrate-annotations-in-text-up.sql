-- select 'refersto' statements
CREATE TEMP TABLE stmt_refersto ON COMMIT DROP AS
SELECT
  t1.pk_entity AS pk_statement, t1.fk_subject_data AS pk_spot, -- chunk
  t2.quill_doc, -- chunk
  t1.fk_object_info AS pk_referred_entity, -- entity, the stmt refers to
  t4.pk_entity AS pk_text -- entity (Text), of which the spot is part of
FROM
  information.statement t1, data.chunk t2, ( SELECT DISTINCT
      pk_text, pk_entity
    FROM
      data.digital_vt) AS t3, information.resource t4
WHERE
  t1.fk_property = 1334
  AND t1.fk_subject_data = t2.pk_entity
  AND t2.fk_text = t3.pk_text
  AND t3.pk_entity = (t4.metadata ->> 'pkDigital')::int;

-- For each stmt_refersto we create a new information.appellation of class Chunk 456
INSERT INTO information.appellation (fk_class, quill_doc, metadata)
SELECT
  456,
  quill_doc,
  json_build_object('id', 'digitals_5', 'created', 'By Jonas Schneider for Digitals', 'refersToStmt', pk_statement, 'pkChunk', pk_spot)
FROM
  stmt_refersto;

-- For each stmt_refersto, we create a new information.resource of class Annotation in Text 933
INSERT INTO information.resource (fk_class, community_visibility, metadata)
SELECT
  933,
  '{ "dataApi": false, "toolbox": false, "website": false}',
  json_build_object('id', 'digitals_5', 'created', 'By Jonas Schneider for Digitals', 'refersToStmt', pk_statement)
FROM
  stmt_refersto;

CREATE TEMP TABLE stmt_refersto_and_new_resource ON COMMIT DROP AS
SELECT
  t1.*, t2.pk_entity AS pk_annotation_in_text
FROM
  stmt_refersto t1, information.resource t2
WHERE
  t1.pk_statement = (t2.metadata ->> 'refersToStmt')::int
  AND t2.metadata ->> 'id' = 'digitals_5';

CREATE TEMP TABLE stmt_refersto_and_new_chunk ON COMMIT DROP AS
SELECT
  t1.*, t2.pk_entity AS pk_appellation_chunk
FROM
  stmt_refersto_and_new_resource t1, information.appellation t2
WHERE
  t1.pk_statement = (t2.metadata ->> 'refersToStmt')::int
  AND t2.metadata ->> 'id' = 'digitals_5';

-- For each stmt_refersto, we create a new information.statement
-- C26 Annotation in Text >	P23 is annotated in (has annotation) 1872 >	geov:C16 Text
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_info, metadata)
SELECT
  t1.pk_annotation_in_text,
  1872,
  t1.pk_text,
  json_build_object('id', 'digitals_5', 'created', 'By Jonas Schneider for Digitals', 'refersToStmt', t1.pk_statement)
FROM
  stmt_refersto_and_new_resource t1
RETURNING
  pk_entity;

-- For each stmt_refersto, we create a new information.statement
-- C26 Annotation in Text	P24 at position (is spot of) 1874	geov:C2 Chunk
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_info, metadata)
SELECT
  t1.pk_annotation_in_text,
  1874,
  t1.pk_appellation_chunk,
  json_build_object('id', 'digitals_5', 'created', 'By Jonas Schneider for Digitals', 'refersToStmt', t1.pk_statement)
FROM
  stmt_refersto_and_new_chunk t1
RETURNING
  pk_entity;

-- For each stmt_refersto, we create a new information.statement
-- C26 Annotation in Text	P25 annotated entity (is annotated by) 1875	crm:E1 CRM Entity
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_info, metadata)
SELECT
  t1.pk_annotation_in_text,
  1875,
  t1.pk_referred_entity,
  json_build_object('id', 'digitals_5', 'created', 'By Jonas Schneider for Digitals', 'refersToStmt', t1.pk_statement)
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
  AND t1.metadata ->> 'id' = 'digitals_5'
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
  AND t1.metadata ->> 'id' = 'digitals_5'
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

