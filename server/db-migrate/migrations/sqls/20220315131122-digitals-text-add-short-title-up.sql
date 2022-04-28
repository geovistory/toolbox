-- select texts and entity labels and default language of project
CREATE TEMP TABLE text_labels ON COMMIT DROP AS
SELECT
  t1.pk_entity, t3.entity_label, t5.fk_language, (t1.metadata ->> 'pkDigital')::int pk_digital, t4.fk_project
FROM
  information.resource t1, information.statement t2, war.entity_preview t3, projects.info_proj_rel t4, projects.project t5
WHERE
  t1.metadata ->> 'id' = 'digitals_3'
  AND t2.fk_subject_info = t1.pk_entity
  AND t2.fk_property = 1216
  AND t3.pk_entity = t2.fk_object_info
  AND t1.pk_entity = t4.fk_entity
  AND t4.is_in_project = TRUE
  AND t5.pk_entity = t4.fk_project
  AND t3.fk_project = t4.fk_project;

-- create lang strings
INSERT INTO information.lang_string (fk_class, string, fk_language)
SELECT DISTINCT
  784,
  entity_label,
  fk_language
FROM
  text_labels
ON CONFLICT
  DO NOTHING;

-- create statements
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_info, metadata)
SELECT
  t1.pk_entity,
  1761,
  t2.pk_entity,
  json_build_object('id', 'digitals_4', 'created', 'By Jonas Schneider for Digitals', 'fkProject', t1.fk_project)
FROM
  text_labels t1,
  information.lang_string t2
WHERE
  t1.entity_label = t2.string
  AND t1.fk_language = t2.fk_language
  AND t2.fk_class = 784
RETURNING
  *;

-- add to projects
INSERT INTO projects.info_proj_rel (fk_entity, fk_project, fk_last_modifier, fk_creator, is_in_project)
SELECT
  t1.pk_entity,
  (t1.metadata ->> 'fkProject')::int,
  7,
  7,
  TRUE
FROM
  information.statement t1
WHERE
  t1.metadata ->> 'id' = 'digitals_4'
RETURNING
  *;

