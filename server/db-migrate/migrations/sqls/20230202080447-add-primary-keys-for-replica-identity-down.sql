ALTER TABLE IF EXISTS "data"."avatar"
  DROP CONSTRAINT IF EXISTS avatar_pkey;

ALTER TABLE IF EXISTS "data"."chunk"
  DROP CONSTRAINT IF EXISTS chunk_pkey;

ALTER TABLE IF EXISTS "data"."class_column_mapping"
  DROP CONSTRAINT IF EXISTS class_column_mapping_pkey;

ALTER TABLE IF EXISTS "data"."column"
  DROP CONSTRAINT IF EXISTS column_pkey;

ALTER TABLE IF EXISTS "data"."data_association"
  DROP CONSTRAINT IF EXISTS data_association_pkey;

ALTER TABLE IF EXISTS "data"."data_association_mapping"
  DROP CONSTRAINT IF EXISTS data_association_mapping_pkey;

ALTER TABLE IF EXISTS "data"."digital"
  DROP CONSTRAINT IF EXISTS digital_pkey;

ALTER TABLE IF EXISTS "data"."factoid"
  DROP CONSTRAINT IF EXISTS factoid_pkey;

ALTER TABLE IF EXISTS "data"."factoid_mapping"
  DROP CONSTRAINT IF EXISTS factoid_mapping_pkey;

ALTER TABLE IF EXISTS "data"."factoid_property_mapping"
  DROP CONSTRAINT IF EXISTS factoid_property_mapping_pkey;

ALTER TABLE IF EXISTS "data"."factoid_role"
  DROP CONSTRAINT IF EXISTS factoid_role_pkey;

ALTER TABLE IF EXISTS "data"."namespace"
  DROP CONSTRAINT IF EXISTS namespace_pkey;

ALTER TABLE IF EXISTS "data"."property_of_property"
  DROP CONSTRAINT IF EXISTS property_of_property_pkey;

ALTER TABLE IF EXISTS "data"."property_of_property_mapping"
  DROP CONSTRAINT IF EXISTS property_of_property_mapping_pkey;

ALTER TABLE IF EXISTS "data"."text_property"
  DROP CONSTRAINT IF EXISTS text_property_pkey;

ALTER TABLE IF EXISTS "data"."values_association"
  DROP CONSTRAINT IF EXISTS values_association_pkey;

ALTER TABLE IF EXISTS "data_for_history"."api_class"
  DROP CONSTRAINT IF EXISTS api_class_pkey;

ALTER TABLE IF EXISTS "data_for_history"."api_profile"
  DROP CONSTRAINT IF EXISTS api_profile_pkey;

ALTER TABLE IF EXISTS "data_for_history"."api_property"
  DROP CONSTRAINT IF EXISTS api_property_pkey;

ALTER TABLE IF EXISTS "data_for_history"."associates_system_type_deprecated"
  DROP CONSTRAINT IF EXISTS associates_system_type_deprecated_pkey;

ALTER TABLE IF EXISTS "data_for_history"."class_profile_view_deprecated"
  DROP CONSTRAINT IF EXISTS class_profile_view_deprecated_pkey;

ALTER TABLE IF EXISTS "data_for_history"."label_deprecated"
  DROP CONSTRAINT IF EXISTS label_deprecated_pkey;

ALTER TABLE IF EXISTS "data_for_history"."property_of_property"
  DROP CONSTRAINT IF EXISTS property_of_property_pkey;

ALTER TABLE IF EXISTS "data_for_history"."property_profile_view_deprecated"
  DROP CONSTRAINT IF EXISTS property_profile_view_deprecated_pkey;

ALTER TABLE IF EXISTS "data_for_history"."system_type_deprecated"
  DROP CONSTRAINT IF EXISTS system_type_deprecated_pkey;

ALTER TABLE IF EXISTS "data_for_history"."text_property_deprecated"
  DROP CONSTRAINT IF EXISTS text_property_deprecated_pkey;

ALTER TABLE IF EXISTS "information"."_backup_entity_association"
  DROP CONSTRAINT IF EXISTS _backup_entity_association_pkey;

ALTER TABLE IF EXISTS "information"."appellation"
  DROP CONSTRAINT IF EXISTS appellation_pkey;

ALTER TABLE IF EXISTS "information"."dimension"
  DROP CONSTRAINT IF EXISTS dimension_pkey;

ALTER TABLE IF EXISTS "information"."lang_string"
  DROP CONSTRAINT IF EXISTS lang_string_pkey;

ALTER TABLE IF EXISTS "information"."persistent_item_backup"
  DROP CONSTRAINT IF EXISTS persistent_item_backup_pkey;

ALTER TABLE IF EXISTS "information"."place"
  DROP CONSTRAINT IF EXISTS place_pkey;

ALTER TABLE IF EXISTS "information"."resource"
  DROP CONSTRAINT IF EXISTS resource_pkey;

ALTER TABLE IF EXISTS "information"."statement"
  DROP CONSTRAINT IF EXISTS statement_pkey;

ALTER TABLE IF EXISTS "information"."temporal_entity_backup"
  DROP CONSTRAINT IF EXISTS temporal_entity_backup_pkey;

ALTER TABLE IF EXISTS "information"."text_property"
  DROP CONSTRAINT IF EXISTS text_property_pkey;

ALTER TABLE IF EXISTS "information"."time_primitive"
  DROP CONSTRAINT IF EXISTS time_primitive_pkey;

ALTER TABLE IF EXISTS "projects"."_backup_class_field_config"
  DROP CONSTRAINT IF EXISTS _backup_class_field_config_pkey;

ALTER TABLE IF EXISTS "projects"."analysis"
  DROP CONSTRAINT IF EXISTS analysis_pkey;

ALTER TABLE IF EXISTS "projects"."argument"
  DROP CONSTRAINT IF EXISTS argument_pkey;

ALTER TABLE IF EXISTS "projects"."class_field_config"
  DROP CONSTRAINT IF EXISTS class_field_config_pkey;

ALTER TABLE IF EXISTS "projects"."dfh_profile_proj_rel"
  DROP CONSTRAINT IF EXISTS dfh_profile_proj_rel_pkey;

ALTER TABLE IF EXISTS "projects"."entity_label_config"
  DROP CONSTRAINT IF EXISTS entity_label_config_pkey;

ALTER TABLE IF EXISTS "projects"."info_proj_rel"
  DROP CONSTRAINT IF EXISTS info_proj_rel_pkey;

ALTER TABLE IF EXISTS "projects"."project"
  DROP CONSTRAINT IF EXISTS project_pkey;

ALTER TABLE IF EXISTS "projects"."property_label_deprecated"
  DROP CONSTRAINT IF EXISTS property_label_deprecated_pkey;

ALTER TABLE IF EXISTS "projects"."query"
  DROP CONSTRAINT IF EXISTS query_pkey;

ALTER TABLE IF EXISTS "projects"."table_config"
  DROP CONSTRAINT IF EXISTS table_config_pkey;

ALTER TABLE IF EXISTS "projects"."text_property"
  DROP CONSTRAINT IF EXISTS text_property_pkey;

ALTER TABLE IF EXISTS "projects"."visual"
  DROP CONSTRAINT IF EXISTS visual_pkey;

ALTER TABLE IF EXISTS "system"."analysis_type_deprecated"
  DROP CONSTRAINT IF EXISTS analysis_type_deprecated_pkey;

ALTER TABLE IF EXISTS "system"."app_context"
  DROP CONSTRAINT IF EXISTS app_context_pkey;

ALTER TABLE IF EXISTS "system"."class_field"
  DROP CONSTRAINT IF EXISTS class_field_pkey;

ALTER TABLE IF EXISTS "system"."class_field_property_rel"
  DROP CONSTRAINT IF EXISTS class_field_property_rel_pkey;

ALTER TABLE IF EXISTS "system"."class_has_type_property"
  DROP CONSTRAINT IF EXISTS class_has_type_property_pkey;

ALTER TABLE IF EXISTS "system"."config"
  DROP CONSTRAINT IF EXISTS config_pkey;

ALTER TABLE IF EXISTS "system"."system_relevant_class"
  DROP CONSTRAINT IF EXISTS system_relevant_class_pkey;

ALTER TABLE IF EXISTS "system"."system_relevant_type"
  DROP CONSTRAINT IF EXISTS system_relevant_type_pkey;

ALTER TABLE IF EXISTS "system"."system_type"
  DROP CONSTRAINT IF EXISTS system_type_pkey;

ALTER TABLE IF EXISTS "war"."class_preview"
  DROP CONSTRAINT IF EXISTS class_preview_pkey;

ALTER TABLE IF EXISTS "war"."field_change"
  DROP CONSTRAINT IF EXISTS field_change_pkey;

ALTER TABLE IF EXISTS "war"."statement"
  DROP CONSTRAINT IF EXISTS statement_pkey;

