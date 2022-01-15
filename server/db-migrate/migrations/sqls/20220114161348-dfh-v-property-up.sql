DROP VIEW data_for_history.v_property;

CREATE VIEW data_for_history.v_property AS
WITH tw0 AS (
  SELECT
    t1_1.dfh_pk_property,
    t1_1.dfh_is_inherited,
    t1_1.dfh_property_domain,
    t1_1.dfh_domain_instances_min_quantifier,
    t1_1.dfh_domain_instances_max_quantifier,
    t1_1.dfh_property_range,
    t1_1.dfh_range_instances_min_quantifier,
    t1_1.dfh_range_instances_max_quantifier,
    t1_1.dfh_property_identifier_in_namespace,
    t1_1.dfh_fk_profile,
    t1_1.removed_from_api,
    t1_1.dfh_parent_properties,
    t1_1.dfh_ancestor_properties
  FROM
    data_for_history.api_property t1_1
),
tw1 AS (
  SELECT
    t1_1.dfh_pk_property,
    t1_1.dfh_property_domain,
    t1_1.dfh_property_range,
    jsonb_agg(DISTINCT jsonb_build_object('fk_profile', t1_1.dfh_fk_profile, 'removed_from_api', t1_1.removed_from_api)) AS profiles
FROM
  tw0 t1_1
GROUP BY
  t1_1.dfh_pk_property,
  t1_1.dfh_property_domain,
  t1_1.dfh_property_range
)
SELECT DISTINCT ON (t1.dfh_pk_property, t1.dfh_property_domain, t1.dfh_property_range)
  t1.dfh_pk_property AS pk_property,
  t1.dfh_property_domain AS has_domain,
  t1.dfh_domain_instances_min_quantifier AS domain_instances_min_quantifier,
  t1.dfh_domain_instances_max_quantifier AS domain_instances_max_quantifier,
  t1.dfh_property_range AS has_range,
  t1.dfh_range_instances_min_quantifier AS range_instances_min_quantifier,
  t1.dfh_range_instances_max_quantifier AS range_instances_max_quantifier,
  t1.dfh_property_identifier_in_namespace AS identifier_in_namespace,
  t1.dfh_parent_properties AS parent_properties,
  t1.dfh_ancestor_properties AS ancestor_properties,
  t2.profiles
FROM
  tw0 t1,
  tw1 t2
WHERE
  t1.dfh_pk_property = t2.dfh_pk_property
  AND t1.dfh_property_domain = t2.dfh_property_domain
  AND t1.dfh_property_range = t2.dfh_property_range
ORDER BY
  t1.dfh_pk_property,
  t1.dfh_property_domain,
  t1.dfh_property_range,
  t1.removed_from_api;

