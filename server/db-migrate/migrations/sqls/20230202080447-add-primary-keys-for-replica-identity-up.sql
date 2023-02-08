/*
 -- select all tables that have no PRIMARY KEY
 -- and show if they have a pk_entity column
 select tab.table_schema,
 tab.table_name,
 c.column_name
 from information_schema.tables tab
 left join information_schema.table_constraints tco
 on tab.table_schema = tco.table_schema
 and tab.table_name = tco.table_name
 and tco.constraint_type = 'PRIMARY KEY'
 left join information_schema.columns c
 on c.table_name = tab.table_name
 and c.table_schema = tab.table_schema
 and c.column_name = 'pk_entity'
 where tab.table_type = 'BASE TABLE'
 and tab.table_schema not in ('pg_catalog', 'information_schema', 'public')
 and tab.table_name NOT ILIKE '%_vt'
 and tco.constraint_name is null
 order by table_schema,
 table_name
 */
ALTER TABLE "data"."avatar"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."chunk"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."class_column_mapping"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."column"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."data_association"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."data_association_mapping"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."digital"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."factoid"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."factoid_mapping"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."factoid_property_mapping"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."factoid_role"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."namespace"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."property_of_property"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."property_of_property_mapping"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."text_property"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data"."values_association"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."api_class"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."api_profile"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."api_property"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."associates_system_type_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."associates_system_type_vt_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."class_profile_view_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."class_profile_view_vt_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."label_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."label_vt_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."property_of_property"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."property_profile_view_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."property_profile_view_vt_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."system_type_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."system_type_vt_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."text_property_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "data_for_history"."text_property_vt_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "information"."_backup_entity_association"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "information"."appellation"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "information"."dimension"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "information"."lang_string"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "information"."number"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "information"."persistent_item_backup"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "information"."persistent_item_vt_backup"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "information"."place"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "information"."resource"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "information"."statement"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "information"."temporal_entity_backup"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "information"."temporal_entity_vt_backup"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "information"."text_property"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "information"."time_primitive"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "projects"."_backup_class_field_config"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "projects"."analysis"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "projects"."argument"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "projects"."class_field_config"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "projects"."dfh_profile_proj_rel"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "projects"."entity_label_config"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "projects"."info_proj_rel"
  ADD PRIMARY KEY (fk_entity, fk_project);

ALTER TABLE "projects"."project"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "projects"."property_label_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "projects"."query"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "projects"."table_config"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "projects"."text_property"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "projects"."visual"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "system"."analysis_type_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "system"."analysis_type_vt_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "system"."app_context"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "system"."class_field"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "system"."class_field_property_rel"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "system"."class_has_type_property"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "system"."config"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "system"."system_relevant_class"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "system"."system_relevant_type"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "system"."system_type"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE "war"."class_preview"
  ADD PRIMARY KEY (fk_class, fk_project);

ALTER TABLE "war"."field_change"
  ADD PRIMARY KEY (fk_project, fk_source_info, fk_source_tables_cell, fk_property, fk_property_of_property, is_outgoing);

ALTER TABLE "war"."statement"
  ADD PRIMARY KEY (pk_entity, project);

