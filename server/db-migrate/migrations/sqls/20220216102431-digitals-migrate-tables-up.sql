-- select the digitals with system type table
CREATE TEMP TABLE tables ON COMMIT DROP AS
SELECT
  t1.pk_entity, t1.tmsp_creation, t1.tmsp_last_modification, t1.fk_namespace
FROM
  data.digital t1
WHERE
  t1.fk_system_type = 3287;

-- create the resources of class C18 Table 898
INSERT INTO information.resource (fk_class, community_visibility, metadata)
SELECT
  898,
  '{ "dataApi": false, "toolbox": false, "website": false}',
  json_build_object('id', 'digitals_6', 'created', 'By Jonas Schneider for Digitals', 'pkDigital', pk_entity)
FROM
  tables;

-- update the is reproduction of statements
-- C18 Table → P1 is reproduction of (has reproduction) 1216 → expression/portion
-- To obtain this, the existing statement is updated:
-- the subject from the data.digital (fk_subject_data) now points to the new Text entity (fk_subject_info).
UPDATE
  information.statement t1
SET
  metadata = json_build_object('id', 'digitals_6', 'updated', 'By Jonas Schneider for Digitals', 'pkDigital', t1.fk_subject_data),
  fk_subject_data = 0,
  fk_subject_info = t2.pk_entity
FROM
  information.resource t2
WHERE
  t1.fk_subject_data = (t2.metadata ->> 'pkDigital')::int
  AND (t2.metadata ->> 'id') = 'digitals_6'
  AND t1.fk_property = 1216;

-- create the has value statements for digitals
--C18 Table → P29 has value (is value of) 1879 -> geov:C29 Table Value
-- The fk_object_data points to the data.digital (pk_entity)
INSERT INTO information.statement (fk_subject_info, fk_property, fk_object_data, metadata)
SELECT
  t2.pk_entity, -- the new entity C28 Table
  1879,
  t1.pk_entity, -- the digital (now acting as geov:C29 Table Value)
  json_build_object('id', 'digitals_6', 'created', 'By Jonas Schneider for Digitals', 'pkDigital', t1.pk_entity)
FROM
  tables t1,
  information.resource t2
WHERE
  t1.pk_entity = (t2.metadata ->> 'pkDigital')::int
  AND t2.metadata ->> 'id' = 'digitals_6';

-- select the project relations of the has reproduction statements
CREATE TEMP TABLE has_repro_stmt_project_rels ON COMMIT DROP AS
SELECT
  t2.metadata ->> 'pkDigital' pk_digital, t1.fk_project, t1.fk_last_modifier, t1.fk_creator, t1.tmsp_last_modification, t1.tmsp_creation, t1.pk_entity AS pk_proj_rel
FROM
  projects.info_proj_rel t1, information.statement t2
WHERE
  t1.fk_entity = t2.pk_entity
  AND t1.is_in_project = TRUE
  AND t2.metadata ->> 'id' = 'digitals_6'
  AND t2.metadata ->> 'updated' IS NOT NULL
  AND t2.fk_property = 1216;

DROP TRIGGER creation_tmsp ON projects.info_proj_rel;

DROP TRIGGER last_modification_tmsp ON projects.info_proj_rel;

-- add the has value statements to the projects
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
WHERE
  t1.metadata ->> 'id' = 'digitals_6'
  AND t1.metadata ->> 'pkDigital' = t2.pk_digital
  AND t1.fk_property = 1879;

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
  t1.metadata ->> 'id' = 'digitals_6'
  AND t1.metadata ->> 'pkDigital' = t2.pk_digital;

-- add entity label config for tables
DELETE FROM projects.entity_label_config
WHERE fk_project = 375669
  AND fk_class = 898;

INSERT INTO projects.entity_label_config (fk_project, fk_class, config)
  VALUES (375669, 898, '{
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

-- add the triggers again
CREATE TRIGGER creation_tmsp
  BEFORE INSERT ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_creation ();

CREATE TRIGGER last_modification_tmsp
  BEFORE INSERT OR UPDATE ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE PROCEDURE commons.tmsp_last_modification ();

