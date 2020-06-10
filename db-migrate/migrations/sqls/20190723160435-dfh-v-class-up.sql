CREATE VIEW data_for_history.v_class AS
select DISTINCT ON (
	pk_entity,
	entity_version,
	is_enabled_in_profile,
	removed_from_api,
	dfh_pk_class,
	dfh_identifier_in_namespace,
	dfh_standard_label,
	dfh_creation_time,
	dfh_modification_time
)
t1.pk_entity,
t1.entity_version,
t1.is_enabled_in_profile,
t1.removed_from_api,
t1.dfh_pk_class,
t1.dfh_identifier_in_namespace,
t1.dfh_standard_label,
t1.dfh_creation_time,
t1.dfh_modification_time,
t2.dfh_fk_system_type
from
	data_for_history."class" t1,
	data_for_history.class_profile_view t2
WHERE
	t1.dfh_pk_class = t2.dfh_fk_class
ORDER BY
	pk_entity,
	entity_version,
	is_enabled_in_profile,
	removed_from_api,
	dfh_pk_class,
	dfh_identifier_in_namespace,
	dfh_standard_label,
	dfh_creation_time,
	dfh_modification_time;
