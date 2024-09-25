-- create view v_property_preview
CREATE OR REPLACE VIEW pgwar.v_property_preview AS WITH tw0 AS (
    SELECT project.pk_entity,
      project.fk_language
    FROM projects.project
    UNION ALL
    SELECT NULL::integer AS int4,
      18889
  ),
  tw1 AS (
    SELECT t2.fk_dfh_property AS fk_property,
      t1.pk_entity AS fk_project,
      t2.string AS label,
      1 AS rank,
      'project label'::text AS text
    FROM tw0 t1,
      projects.text_property t2
    WHERE t1.pk_entity = t2.fk_project
      AND t2.fk_dfh_property IS NOT NULL
      AND t2.fk_language = t1.fk_language
    UNION ALL
    SELECT t2.fk_dfh_property AS fk_property,
      t1.pk_entity AS fk_project,
      t2.string AS label,
      2 AS rank,
      'default project label in default lang'::text AS text
    FROM tw0 t1,
      projects.text_property t2
    WHERE 375669 = t2.fk_project
      AND t2.fk_dfh_property IS NOT NULL
      AND t2.fk_language = t1.fk_language
    UNION ALL
    SELECT t3.fk_property,
      t1.pk_entity AS fk_project,
      t3.label,
      3 AS rank,
      'ontome label in default lang'::text AS text
    FROM tw0 t1,
      information.language t2,
      data_for_history.v_label t3
    WHERE t3.fk_property IS NOT NULL
      AND t3.language::bpchar = t2.iso6391
      AND t3.type = 'label'::text
    UNION ALL
    SELECT t2.fk_dfh_property AS fk_property,
      t1.pk_entity AS fk_project,
      t2.string AS label,
      4 AS rank,
      'default project label in en'::text AS text
    FROM tw0 t1,
      projects.text_property t2
    WHERE 375669 = t2.fk_project
      AND t2.fk_dfh_property IS NOT NULL
      AND t2.fk_language = 18889
    UNION ALL
    SELECT t3.fk_property,
      t1.pk_entity AS fk_project,
      t3.label,
      3 AS rank,
      'ontome label in en'::text AS text
    FROM tw0 t1,
      data_for_history.v_label t3
    WHERE t3.fk_property IS NOT NULL
      AND t3.language::text = 'en'::text
      AND t3.type = 'label'::text
  )
SELECT DISTINCT ON (fk_project, fk_property) fk_property,
  fk_project,
  label
FROM tw1
ORDER BY fk_project,
  fk_property,
  rank;
-- create view v_class_preview
CREATE OR REPLACE VIEW pgwar.v_class_preview AS WITH tw0 AS (
    SELECT project.pk_entity,
      project.fk_language
    FROM projects.project
    UNION ALL
    SELECT NULL::integer AS int4,
      18889
  ),
  tw1 AS (
    SELECT t2.fk_dfh_class AS fk_class,
      t1.pk_entity AS fk_project,
      t2.string AS label,
      1 AS rank,
      'project label'::text AS text
    FROM tw0 t1,
      projects.text_property t2
    WHERE t1.pk_entity = t2.fk_project
      AND t2.fk_dfh_class IS NOT NULL
      AND t2.fk_language = t1.fk_language
    UNION ALL
    SELECT t2.fk_dfh_class AS fk_class,
      t1.pk_entity AS fk_project,
      t2.string AS label,
      2 AS rank,
      'default project label in default lang'::text AS text
    FROM tw0 t1,
      projects.text_property t2
    WHERE 375669 = t2.fk_project
      AND t2.fk_dfh_class IS NOT NULL
      AND t2.fk_language = t1.fk_language
    UNION ALL
    SELECT t3.fk_class,
      t1.pk_entity AS fk_project,
      t3.label,
      3 AS rank,
      'ontome label in default lang'::text AS text
    FROM tw0 t1,
      information.language t2,
      data_for_history.v_label t3
    WHERE t3.fk_class IS NOT NULL
      AND t1.fk_language = t2.pk_entity
      AND t3.language::bpchar = t2.iso6391
      AND t3.type = 'label'::text
    UNION ALL
    SELECT t2.fk_dfh_class AS fk_class,
      t1.pk_entity AS fk_project,
      t2.string AS label,
      4 AS rank,
      'default project label in en'::text AS text
    FROM tw0 t1,
      projects.text_property t2
    WHERE 375669 = t2.fk_project
      AND t2.fk_dfh_class IS NOT NULL
      AND t2.fk_language = 18889
    UNION ALL
    SELECT t3.fk_class,
      t1.pk_entity AS fk_project,
      t3.label,
      5 AS rank,
      'ontome label in en'::text AS text
    FROM tw0 t1,
      data_for_history.v_label t3
    WHERE t3.fk_class IS NOT NULL
      AND t3.language::text = 'en'::text
      AND t3.type = 'label'::text
  )
SELECT DISTINCT ON (fk_project, fk_class) fk_class,
  fk_project,
  label
FROM tw1
ORDER BY fk_project,
  fk_class,
  rank;
