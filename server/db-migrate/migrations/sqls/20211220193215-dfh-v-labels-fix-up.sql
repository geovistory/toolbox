CREATE OR REPLACE VIEW data_for_history.v_label AS SELECT DISTINCT ON (t1.dfh_pk_profile, t1.dfh_profile_label, t1.dfh_profile_label_language)
  'label'::text AS type,
  t1.dfh_profile_label AS label,
  t1.dfh_profile_label_language AS
  LANGUAGE,
  t1.dfh_pk_profile AS fk_profile,
  NULL::integer AS fk_project,
  NULL::integer AS fk_property,
  NULL::integer AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_profile t1
UNION
SELECT DISTINCT ON (t1.dfh_pk_profile, t1.dfh_profile_definition, t1.dfh_profile_definition_language)
  'definition'::text AS type,
  t1.dfh_profile_definition AS label,
  t1.dfh_profile_definition_language AS
  LANGUAGE,
  t1.dfh_pk_profile AS fk_profile,
  NULL::integer AS fk_project,
  NULL::integer AS fk_property,
  NULL::integer AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_profile t1
UNION
SELECT DISTINCT ON (t1.dfh_owned_by_project, t1.dfh_project_label, t1.dfh_project_label_language)
  'label'::text AS type,
  t1.dfh_project_label AS label,
  t1.dfh_project_label_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  t1.dfh_owned_by_project AS fk_project,
  NULL::integer AS fk_property,
  NULL::integer AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_profile t1
UNION
SELECT DISTINCT ON (t1.dfh_pk_property, t1.dfh_property_label, t1.dfh_property_label_language)
  'label'::text AS type,
  t1.dfh_property_label AS label,
  t1.dfh_property_label_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  NULL::integer AS fk_project,
  t1.dfh_pk_property AS fk_property,
  NULL::integer AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_property t1
UNION
SELECT DISTINCT ON (t1.dfh_pk_property, t1.dfh_property_inverse_label, t1.dfh_property_label_language)
  'inverse_label'::text AS type,
  t1.dfh_property_inverse_label AS label,
  t1.dfh_property_label_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  NULL::integer AS fk_project,
  t1.dfh_pk_property AS fk_property,
  NULL::integer AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_property t1
WHERE
  t1.dfh_property_inverse_label IS NOT NULL
UNION
SELECT DISTINCT ON (t1.dfh_pk_property, t1.dfh_property_scope_note, t1.dfh_property_scope_note_language)
  'scope_note'::text AS type,
  t1.dfh_property_scope_note AS label,
  t1.dfh_property_scope_note_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  NULL::integer AS fk_project,
  t1.dfh_pk_property AS fk_property,
  NULL::integer AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_property t1
UNION
SELECT DISTINCT ON (t1.dfh_pk_class, t1.dfh_class_label, t1.dfh_class_label_language)
  'label'::text AS type,
  t1.dfh_class_label AS label,
  t1.dfh_class_label_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  NULL::integer AS fk_project,
  NULL::integer AS fk_property,
  t1.dfh_pk_class AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_class t1
UNION
SELECT DISTINCT ON (t1.dfh_pk_class, t1.dfh_class_scope_note, t1.dfh_class_scope_note_language)
  'scope_note'::text AS type,
  t1.dfh_class_scope_note AS label,
  t1.dfh_class_scope_note_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  NULL::integer AS fk_project,
  NULL::integer AS fk_property,
  t1.dfh_pk_class AS fk_class,
  NULL::integer AS fk_property_of_property
FROM
  data_for_history.api_class t1
UNION
SELECT DISTINCT ON (t1.pk_property_of_property, t1.label, t1.label_language)
  'label'::text AS type,
  t1.label,
  t1.label_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  NULL::integer AS fk_project,
  NULL::integer AS fk_property,
  NULL::integer AS fk_class,
  t1.pk_property_of_property AS fk_property_of_property
FROM
  data_for_history.property_of_property t1
UNION
SELECT DISTINCT ON (t1.pk_property_of_property, t1.scope_note, t1.scope_note_language)
  'scope_note'::text AS type,
  t1.scope_note AS label,
  t1.scope_note_language AS
  LANGUAGE,
  NULL::integer AS fk_profile,
  NULL::integer AS fk_project,
  NULL::integer AS fk_property,
  NULL::integer AS fk_class,
  t1.pk_property_of_property AS fk_property_of_property
FROM
  data_for_history.property_of_property t1;

