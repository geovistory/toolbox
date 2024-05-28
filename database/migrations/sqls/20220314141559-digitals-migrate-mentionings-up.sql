-- select 'mentions' statements
CREATE TEMP TABLE stmt_mentions ON COMMIT DROP AS
SELECT
  t1.pk_entity AS pk_statement, t1.fk_subject_info AS pk_source, t1.fk_object_info AS pk_mentioned_entity
FROM
  information.statement t1
WHERE
  t1.fk_property = 1218;

-- create the new resource of class 935, C28 Mentioning
-- and store the pk_entity of the 'mentions' statement in the metadata
INSERT INTO information.resource (fk_class, community_visibility, metadata)
SELECT
  935,
  '{ "dataApi": true, "toolbox": true, "website": true}',
  json_build_object('id', 'digitals_2', 'created', 'By Jonas Schneider for Digitals', 'mentionsStatement', pk_statement)
FROM
  stmt_mentions;

CREATE TEMP TABLE new_resources ON COMMIT DROP AS
SELECT
  *, (metadata ->> 'mentionsStatement')::int AS pk_orig_statement
FROM
  information.resource
WHERE
  metadata ->> 'id' = 'digitals_2';

CREATE TEMP TABLE stmt_mentions_and_new_resource ON COMMIT DROP AS
SELECT
  t1.*, t2.pk_entity AS pk_mentioning, t2.pk_orig_statement
FROM
  stmt_mentions t1
  INNER JOIN new_resources t2 ON t1.pk_statement = t2.pk_orig_statement;

SELECT
  *
FROM
  stmt_mentions_and_new_resource;

-- create C28 Mentioning → geov:P26 mentions (is mentioned in) 1876 → E1 CRM Entity
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_info, metadata)
SELECT
  t1.pk_mentioning,
  1876,
  t1.pk_mentioned_entity,
  json_build_object('id', 'digitals_2', 'created', 'By Jonas Schneider for Digitals', 'mentionsStatement', t1.pk_statement)
FROM
  stmt_mentions_and_new_resource t1
RETURNING
  pk_entity;

-- create C28 Mentioning → geov:P27 is mentioned in (mentions) 1877 → E77 Persistent Item
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_info, metadata)
SELECT
  t1.pk_mentioning,
  1877,
  t1.pk_source,
  json_build_object('id', 'digitals_2', 'created', 'By Jonas Schneider for Digitals', 'mentionsStatement', t1.pk_statement)
FROM
  stmt_mentions_and_new_resource t1
RETURNING
  pk_entity;

CREATE TEMP TABLE has_reference_statement ON COMMIT DROP AS
SELECT
  t1.pk_entity AS pk_has_reference, t1.fk_object_info AS pk_reference, t2.pk_statement AS pk_mentions_statement, t2.pk_mentioning
FROM
  information.statement t1, stmt_mentions_and_new_resource t2
WHERE
  t2.pk_statement = t1.fk_subject_info
  AND t1.fk_property_of_property = 1;

-- create C28 Mentioning → geov:P28 at position 1878 → C11 Reference
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_info, metadata)
SELECT
  t1.pk_mentioning,
  1878,
  t1.pk_reference,
  json_build_object('id', 'digitals_2', 'created', 'By Jonas Schneider for Digitals', 'hasReferenceStatement', t1.pk_has_reference)
FROM
  has_reference_statement t1
RETURNING
  *;

-- select project relations of mentions statements
CREATE TEMP TABLE mentions_stmt_project_rels ON COMMIT DROP AS
SELECT
  t2.pk_statement, t1.fk_project, t1.fk_last_modifier, t1.fk_creator, t1.tmsp_last_modification, t1.tmsp_creation, t1.pk_entity AS pk_proj_rel
FROM
  projects.info_proj_rel t1, stmt_mentions t2
WHERE
  t1.fk_entity = t2.pk_statement
  AND t1.is_in_project = TRUE;

-- select project relations of reference statements
CREATE TEMP TABLE has_reference_stmt_project_rels ON COMMIT DROP AS
SELECT
  t2.pk_has_reference, t1.fk_project, t1.fk_last_modifier, t1.fk_creator, t1.tmsp_last_modification, t1.tmsp_creation, t1.pk_entity AS pk_proj_rel
FROM
  projects.info_proj_rel t1, has_reference_statement t2
WHERE
  t1.fk_entity = t2.pk_has_reference
  AND t1.is_in_project = TRUE;

SELECT
  *
FROM
  has_reference_stmt_project_rels;

-- disable triggers to keep original timestamps
DROP TRIGGER creation_tmsp ON projects.info_proj_rel;

DROP TRIGGER last_modification_tmsp ON projects.info_proj_rel;

-- create project relations of mentions statements
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
  mentions_stmt_project_rels t2
WHERE
  t2.pk_statement = (t1.metadata ->> 'mentionsStatement')::int
  AND t1.metadata ->> 'id' = 'digitals_2'
  AND t1.metadata ->> 'created' IS NOT NULL
RETURNING
  *;

-- create project relations of resources statements
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
  mentions_stmt_project_rels t2
WHERE
  t2.pk_statement = (t1.metadata ->> 'mentionsStatement')::int
  AND t1.metadata ->> 'id' = 'digitals_2'
  AND t1.metadata ->> 'created' IS NOT NULL
RETURNING
  *;

-- create project relations of reference statements
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
  has_reference_stmt_project_rels t2
WHERE
  t2.pk_has_reference = (t1.metadata ->> 'hasReferenceStatement')::int
  AND t1.metadata ->> 'id' = 'digitals_2'
  AND t1.metadata ->> 'created' IS NOT NULL
RETURNING
  *;

CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation ();

CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification ();

-- REMOVE old statements from all projects
UPDATE
  projects.info_proj_rel t1
SET
  is_in_project = FALSE
FROM
  mentions_stmt_project_rels t2
WHERE
  t1.pk_entity = t2.pk_proj_rel;

UPDATE
  projects.info_proj_rel t1
SET
  is_in_project = FALSE
FROM
  has_reference_stmt_project_rels t2
WHERE
  t1.pk_entity = t2.pk_proj_rel;

