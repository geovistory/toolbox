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
ALTER TABLE IF EXISTS "data"."avatar"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."chunk"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."class_column_mapping"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."column"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."data_association"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."data_association_mapping"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."digital"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."factoid"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."factoid_mapping"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."factoid_property_mapping"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."factoid_role"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."namespace"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."property_of_property"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."property_of_property_mapping"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."text_property"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data"."values_association"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data_for_history"."api_class"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data_for_history"."api_profile"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data_for_history"."api_property"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data_for_history"."associates_system_type_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data_for_history"."class_profile_view_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data_for_history"."label_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data_for_history"."property_of_property"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data_for_history"."property_profile_view_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data_for_history"."system_type_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "data_for_history"."text_property_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "information"."_backup_entity_association"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "information"."appellation"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "information"."dimension"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "information"."lang_string"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "information"."place"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "information"."resource"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "information"."statement"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "information"."text_property"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "information"."time_primitive"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "projects"."_backup_class_field_config"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "projects"."analysis"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "projects"."argument"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "projects"."class_field_config"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "projects"."dfh_profile_proj_rel"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "projects"."entity_label_config"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "projects"."info_proj_rel"
  ADD PRIMARY KEY (fk_entity, fk_project);

ALTER TABLE IF EXISTS "projects"."project"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "projects"."property_label_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "projects"."query"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "projects"."table_config"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "projects"."text_property"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "projects"."visual"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "system"."analysis_type_deprecated"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "system"."app_context"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "system"."class_field"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "system"."class_field_property_rel"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "system"."class_has_type_property"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "system"."config"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "system"."system_relevant_class"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "system"."system_relevant_type"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "system"."system_type"
  ADD PRIMARY KEY (pk_entity);

ALTER TABLE IF EXISTS "war"."class_preview"
  ADD PRIMARY KEY (fk_class, fk_project);

ALTER TABLE IF EXISTS "war"."field_change"
  ADD PRIMARY KEY (fk_project, fk_source_info, fk_source_tables_cell, fk_property, fk_property_of_property, is_outgoing);

ALTER TABLE IF EXISTS "war"."statement"
  ADD PRIMARY KEY (pk_entity, project);

