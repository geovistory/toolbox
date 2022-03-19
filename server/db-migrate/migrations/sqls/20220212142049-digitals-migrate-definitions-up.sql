-- drop quill doc checks, for performance reasons
ALTER TABLE commons.text
  DROP CONSTRAINT IF EXISTS text_quill_doc_check;

ALTER TABLE information.appellation
  DROP CONSTRAINT IF EXISTS text_quill_doc_check;

ALTER TABLE information.lang_string
  DROP CONSTRAINT IF EXISTS text_quill_doc_check;

-- select 'has-definition' statements and its language strings
CREATE TEMP TABLE stmt_has_def ON COMMIT DROP AS
SELECT
  t1.pk_entity AS pk_statement, t2.pk_entity AS pk_lang_string, t2.quill_doc, t2.fk_language
FROM
  information.statement t1, information.lang_string t2
WHERE
  fk_property = 1762
  AND t1.fk_object_info = t2.pk_entity
  AND t2.quill_doc IS NOT NULL;

-- for each, create an information.resource of class (Definition)
-- and store the pk_entity of the 'has-definition' statement in the metadata
INSERT INTO information.resource (fk_class, community_visibility, metadata)
SELECT
  899,
  '{ "dataApi": true, "toolbox": true, "website": true}',
  json_build_object('id', 'digitals', 'created', 'By Jonas Schneider for Digitals', 'hasDefinitionStatement', pk_statement)
FROM
  stmt_has_def;

--SELECT * FROM information.resource
--WHERE metadata->>'id'= 'digitals';
-- create an information.appellation (String)
-- and store the pk_entity of the 'has-definition' statement in the metadata
INSERT INTO information.appellation (fk_class, quill_doc, metadata)
SELECT
  339,
  quill_doc,
  json_build_object('id', 'digitals', 'created', 'By Jonas Schneider for Digitals', 'hasDefinitionStatement', pk_statement)
FROM
  stmt_has_def;

SELECT
  *
FROM
  information.appellation
WHERE
  metadata ->> 'id' = 'digitals';

CREATE TEMP TABLE stmt_as_def_and_new_resource ON COMMIT DROP AS
SELECT
  t1.*, t2.pk_entity AS pk_definition
FROM
  stmt_has_def t1, information.resource t2
WHERE
  t1.pk_statement = (t2.metadata ->> 'hasDefinitionStatement')::int
  AND t2.metadata ->> 'id' = 'digitals';

-- update the statement to the definition
UPDATE
  information.statement t1
SET
  fk_object_info = t0.pk_definition,
  metadata = json_build_object('id', 'digitals', 'updated', 'By Jonas Schneider for Digitals', 'hasDefinitionStatement', pk_statement)
FROM
  stmt_as_def_and_new_resource t0
WHERE
  t0.pk_statement = t1.pk_entity;

-- and the statement to the language
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_info, metadata)
SELECT
  t1.pk_definition,
  63,
  t1.fk_language,
  json_build_object('id', 'digitals', 'created', 'By Jonas Schneider for Digitals', 'hasDefinitionStatement', pk_statement)
FROM
  stmt_as_def_and_new_resource t1
RETURNING
  pk_entity;

-- and the statement to the app
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_info, metadata)
SELECT
  t1.pk_definition,
  1864,
  t2.pk_entity,
  json_build_object('id', 'digitals', 'created', 'By Jonas Schneider for Digitals', 'hasDefinitionStatement', pk_statement)
FROM
  stmt_as_def_and_new_resource t1,
  information.appellation t2
WHERE
  t1.pk_statement = (t2.metadata ->> 'hasDefinitionStatement')::int
  AND t2.metadata ->> 'id' = 'digitals';

CREATE TEMP TABLE stmt_project_rels ON COMMIT DROP AS
SELECT
  t3.pk_entity, fk_project, t1.fk_last_modifier, t1.fk_creator
FROM
  projects.info_proj_rel t1, stmt_has_def t2, information.statement t3
WHERE
  t1.fk_entity = t2.pk_statement
  AND t1.is_in_project = TRUE
  AND t2.pk_statement = (t3.metadata ->> 'hasDefinitionStatement')::int
  AND t3.metadata ->> 'id' = 'digitals'
  AND t3.metadata ->> 'created' IS NOT NULL;

-- add the statements and the definition to the projects
INSERT INTO projects.info_proj_rel (fk_entity, fk_project, fk_last_modifier, fk_creator, is_in_project)
SELECT
  pk_entity,
  fk_project,
  fk_last_modifier,
  fk_creator,
  TRUE
FROM
  stmt_project_rels;

-- add the definitions to the project
CREATE TEMP TABLE resource_project_rels ON COMMIT DROP AS
SELECT
  t3.pk_entity, fk_project, t1.fk_last_modifier, t1.fk_creator
FROM
  projects.info_proj_rel t1, stmt_has_def t2, information.resource t3
WHERE
  t1.fk_entity = t2.pk_statement
  AND t1.is_in_project = TRUE
  AND t2.pk_statement = (t3.metadata ->> 'hasDefinitionStatement')::int
  AND t3.metadata ->> 'id' = 'digitals'
  AND t3.metadata ->> 'created' IS NOT NULL;

INSERT INTO projects.info_proj_rel (fk_entity, fk_project, fk_last_modifier, fk_creator, is_in_project)
SELECT
  pk_entity,
  fk_project,
  fk_last_modifier,
  fk_creator,
  TRUE
FROM
  resource_project_rels;

