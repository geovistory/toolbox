CREATE OR REPLACE VIEW data_for_history.v_class AS
WITH tw1 AS (
  SELECT
    t1.dfh_pk_class,
    jsonb_agg(DISTINCT jsonb_build_object('fk_profile', t1.dfh_fk_profile, 'removed_from_api', t1.removed_from_api)) AS profiles
  FROM
    data_for_history.api_class t1
  GROUP BY
    t1.dfh_pk_class
)
SELECT DISTINCT ON (t1.dfh_pk_class)
  t1.dfh_pk_class AS pk_class,
  t1.dfh_class_identifier_in_namespace AS identifier_in_namespace,
  t1.dfh_basic_type AS basic_type,
  t1.dfh_basic_type_label AS basic_type_label,
  tw1.profiles,
  t1.dfh_parent_classes AS parent_classes,
  t1.dfh_ancestor_classes AS ancestor_classes
FROM
  tw1,
  data_for_history.api_class t1
WHERE
  tw1.dfh_pk_class = t1.dfh_pk_class
