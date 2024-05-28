CREATE VIEW data_for_history.v_property_profile_view AS
SELECT DISTINCT
  t1.pk_entity,
	CASE WHEN t1.dfh_fk_property_of_origin IS NOT NULL THEN true ELSE false END is_inherited,
	t1.dfh_has_domain,
 	coalesce(t1.dfh_fk_property_of_origin, t1.dfh_pk_property) fk_property,
	t1.dfh_has_range,
	t1.dfh_pk_property,
	t1.dfh_identifier_in_namespace,
	t1.dfh_standard_label,
	t1.dfh_pk_profile,
	t1.dfh_profile_label,
  t1.is_enabled_in_profile,
  t1.removed_from_api,
  t1.dfh_fk_property_of_origin,
	t2.dfh_domain_instances_min_quantifier,
	t2.dfh_domain_instances_max_quantifier,
	t2.dfh_range_instances_min_quantifier,
	t2.dfh_range_instances_max_quantifier,
  t2.identity_defining
FROM
data_for_history.property_profile_view t1,
data_for_history.property t2
WHERE t1.dfh_pk_property = t2.dfh_pk_property
ORDER BY is_inherited, fk_property, t1.dfh_pk_property;



CREATE VIEW data_for_history.v_property AS
SELECT DISTINCT
  t1.pk_entity,
	CASE WHEN t1.dfh_fk_property_of_origin IS NOT NULL THEN true ELSE false END is_inherited,
	t1.dfh_has_domain,
 	coalesce(t1.dfh_fk_property_of_origin, t1.dfh_pk_property) fk_property,
	t1.dfh_has_range,
	t1.dfh_pk_property,
	t1.dfh_identifier_in_namespace,
	t1.dfh_standard_label,
  t1.is_enabled_in_profile,
  t1.removed_from_api,
  t1.dfh_fk_property_of_origin,
	t1.dfh_domain_instances_min_quantifier,
	t1.dfh_domain_instances_max_quantifier,
	t1.dfh_range_instances_min_quantifier,
	t1.dfh_range_instances_max_quantifier,
  t1.identity_defining
FROM
data_for_history.property t1
ORDER BY dfh_has_domain, fk_property, is_inherited,  t1.dfh_pk_property;
