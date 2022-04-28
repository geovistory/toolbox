-- drop the index on appellation.string
DROP INDEX information.appellation_string_idx;

-- select the digitals with system type text
CREATE TEMP TABLE texts ON COMMIT DROP AS
SELECT
  t1.pk_entity, t1.quill_doc, t1.tmsp_creation, t1.tmsp_last_modification, t1.fk_namespace
FROM
  data.digital t1
WHERE
  t1.fk_system_type = 3286;

-- create the resources
INSERT INTO information.resource (fk_class, community_visibility, metadata)
SELECT
  785,
  '{ "dataApi": false, "toolbox": false, "website": false}',
  json_build_object('id', 'digitals_3', 'created', 'By Jonas Schneider for Digitals', 'pkDigital', pk_entity)
FROM
  texts;

-- create the appellations
INSERT INTO information.appellation (fk_class, quill_doc, metadata)
SELECT
  339,
  quill_doc,
  json_build_object('id', 'digitals_3', 'created', 'By Jonas Schneider for Digitals', 'pkDigital', pk_entity)
FROM
  texts;

-- update the is reproduction of statements
UPDATE
  information.statement t1
SET
  metadata = json_build_object('id', 'digitals_3', 'updated', 'By Jonas Schneider for Digitals', 'pkDigital', t1.fk_subject_data),
  fk_subject_data = 0,
  fk_subject_info = t2.pk_entity
FROM
  information.resource t2
WHERE
  t1.fk_subject_data = (t2.metadata ->> 'pkDigital')::int
  AND (t2.metadata ->> 'id') = 'digitals_3'
  AND t1.fk_property = 1216;

-- select the digital_vt with system type text
CREATE TEMP TABLE old_texts ON COMMIT DROP AS
SELECT
  t1.pk_entity, t1.quill_doc, t1.tmsp_creation, t1.tmsp_last_modification
FROM
  data.digital_vt t1
WHERE
  t1.fk_system_type = 3286
ORDER BY
  pk_entity, entity_version ASC;

-- disable triggers to keep original timestamps
DROP TRIGGER creation_tmsp ON information.statement;

DROP TRIGGER last_modification_tmsp ON information.statement;

-- create the has value version statements for digital_vt (no adding to project) in chronological order
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_info, tmsp_creation, tmsp_last_modification, metadata)
SELECT
  t2.pk_entity,
  1864,
  t3.pk_entity,
  t1.tmsp_creation,
  t1.tmsp_last_modification,
  json_build_object('id', 'digitals_3', 'created', 'By Jonas Schneider for Digitals', 'pkDigital', t1.pk_entity, 'fromVersionTable', TRUE)
FROM
  old_texts t1,
  information.resource t2,
  information.appellation t3
WHERE
  t1.pk_entity = (t2.metadata ->> 'pkDigital')::int
  AND t2.metadata ->> 'id' = 'digitals_3'
  AND t1.pk_entity = (t3.metadata ->> 'pkDigital')::int
  AND t3.metadata ->> 'id' = 'digitals_3'
RETURNING
  *;

-- create the has value version statements for digitals
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_info, tmsp_creation, tmsp_last_modification, metadata)
SELECT
  t2.pk_entity,
  1864,
  t3.pk_entity,
  t1.tmsp_creation,
  t1.tmsp_last_modification,
  json_build_object('id', 'digitals_3', 'created', 'By Jonas Schneider for Digitals', 'pkDigital', t1.pk_entity, 'fromVersionTable', FALSE)
FROM
  texts t1,
  information.resource t2,
  information.appellation t3
WHERE
  t1.pk_entity = (t2.metadata ->> 'pkDigital')::int
  AND t2.metadata ->> 'id' = 'digitals_3'
  AND t1.pk_entity = (t3.metadata ->> 'pkDigital')::int
  AND t3.metadata ->> 'id' = 'digitals_3'
RETURNING
  *;

-- select the project relations of the has reproduction statements
CREATE TEMP TABLE has_repro_stmt_project_rels ON COMMIT DROP AS
SELECT
  t2.metadata ->> 'pkDigital' pk_digital, t1.fk_project, t1.fk_last_modifier, t1.fk_creator, t1.tmsp_last_modification, t1.tmsp_creation, t1.pk_entity AS pk_proj_rel
FROM
  projects.info_proj_rel t1, information.statement t2
WHERE
  t1.fk_entity = t2.pk_entity
  AND t1.is_in_project = TRUE
  AND t2.metadata ->> 'id' = 'digitals_3'
  AND t2.metadata ->> 'updated' IS NOT NULL
  AND t2.fk_property = 1216;

DROP TRIGGER creation_tmsp ON projects.info_proj_rel;

DROP TRIGGER last_modification_tmsp ON projects.info_proj_rel;

-- add the has value version statements, not coming from version table, to the projects
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
  has_repro_stmt_project_rels t2
WHERE (t1.metadata ->> 'fromVersionTable')::boolean = FALSE
  AND t1.metadata ->> 'id' = 'digitals_3'
  AND t1.metadata ->> 'pkDigital' = t2.pk_digital
RETURNING
  *;

-- add the resources to the projects
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
  has_repro_stmt_project_rels t2
WHERE
  t1.metadata ->> 'id' = 'digitals_3'
  AND t1.metadata ->> 'pkDigital' = t2.pk_digital;

-- add entity label config for texts
DELETE FROM projects.entity_label_config
WHERE fk_project = 375669
  AND fk_class = 785;

INSERT INTO projects.entity_label_config (fk_project, fk_class, config)
  VALUES (375669, 785, '{
    "labelParts": [
        {
            "field": {
                "fkProperty": 1761,
                "isOutgoing": true,
                "nrOfStatementsInLabel": 1
            },
            "ordNum": 0
        }
    ]
}');

CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation ();

CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification ();

CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON information.statement
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation ();

CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON information.statement
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification ();

