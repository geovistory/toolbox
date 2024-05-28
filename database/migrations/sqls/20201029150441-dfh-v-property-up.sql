
CREATE OR REPLACE VIEW data_for_history.v_property
 AS
 WITH tw0 AS (
	SELECT 
		t1.dfh_pk_property,
		t1.dfh_is_inherited ,
		t1.dfh_property_domain,
		t1.dfh_domain_instances_min_quantifier,
		t1.dfh_domain_instances_max_quantifier ,
		t1.dfh_property_range,
		t1.dfh_range_instances_min_quantifier,
		t1.dfh_range_instances_max_quantifier,
		t1.dfh_identity_defining,
		t1.dfh_is_has_type_subproperty,
		t1.dfh_property_identifier_in_namespace,
		t1.dfh_fk_profile,
		t1.removed_from_api
	FROM data_for_history.api_property t1
	
	-- add property 1111 to all classes
	UNION
 	SELECT 
		1111 AS dfh_pk_property,
		true AS dfh_is_inherited,
		365 AS dfh_property_domain,
		0 AS dfh_domain_instances_min_quantifier,
		'-1'::integer AS dfh_domain_instances_max_quantifier,
		t1_1.dfh_pk_class AS dfh_property_range,
		1 AS dfh_range_instances_min_quantifier,
		1 AS dfh_range_instances_max_quantifier,
		true AS dfh_identity_defining,
		false AS dfh_is_has_type_subproperty,
		'histP9'::character varying AS dfh_property_identifier_in_namespace,
		t1_1.dfh_fk_profile,
		t1_1.removed_from_api
 	FROM data_for_history.api_class t1_1
  	WHERE t1_1.dfh_pk_class <> 365
  	GROUP BY t1_1.dfh_fk_profile, t1_1.removed_from_api, t1_1.dfh_pk_class, t1_1.dfh_class_identifier_in_namespace, t1_1.dfh_basic_type, t1_1.dfh_basic_type_label
)

-- aggtegates the profiles and removed_from_api per property
, tw1 AS (
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
-- select list of unique properties (see distinct on) 
-- joining the profiles
-- note: the important thing is that properties not removed from api 
--       are given precedence over properties removed from api (see order by)
SELECT DISTINCT ON (t1.dfh_pk_property,t1.dfh_property_domain,t1.dfh_property_range)
	t1.dfh_pk_property AS pk_property,
	t1.dfh_is_inherited AS is_inherited,
	t1.dfh_property_domain AS has_domain,
	t1.dfh_domain_instances_min_quantifier AS domain_instances_min_quantifier,
	t1.dfh_domain_instances_max_quantifier AS domain_instances_max_quantifier,
	t1.dfh_property_range AS has_range,
	t1.dfh_range_instances_min_quantifier AS range_instances_min_quantifier,
	t1.dfh_range_instances_max_quantifier AS range_instances_max_quantifier,
	t1.dfh_identity_defining AS identity_defining,
	t1.dfh_is_has_type_subproperty AS is_has_type_subproperty,
	t1.dfh_property_identifier_in_namespace AS identifier_in_namespace,
	t2.profiles -- joins the profiles
FROM 
	tw0 t1,
	tw1 t2
WHERE
	t1.dfh_pk_property=t2.dfh_pk_property
AND	t1.dfh_property_domain=t2.dfh_property_domain
AND	t1.dfh_property_range=t2.dfh_property_range
ORDER BY 
	t1.dfh_pk_property, 
	t1.dfh_property_domain,
	t1.dfh_property_range, 
	t1.removed_from_api ASC -- make sure the select distinct gives prio to removed_from_api=false
	
