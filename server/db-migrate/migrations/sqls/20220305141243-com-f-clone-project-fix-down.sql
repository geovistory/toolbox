-- DROP FUNCTION commons.clone_sandbox_project(integer);
CREATE OR REPLACE FUNCTION commons.clone_sandbox_project (account_id integer)
  RETURNS void
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
DECLARE
  pk_sandbox_project int;
  fk_project_default_language int;
  fk_system_type__project_label int;
  fk_system_type__project_description int;
  project_label varchar;
  project_description varchar;
  pk_new_project int;
  pk_new_default_namespace int;
BEGIN
  -- pk_entity of the sandbox project
  pk_sandbox_project = 375232;
  -- default language = english
  fk_project_default_language = 18889;
  -- system type for project label
  fk_system_type__project_label = 639;
  -- system type for project description
  fk_system_type__project_description = 638;
  -- the label of the new project
  project_label = 'Sandbox Project';
  -- the description of the new project
  project_description = 'This is a sandbox project. You can use it to explore the functionalities of Geovistory BETA and experiment with them. Enjoy!';

  /*
   * create the project
   */
  INSERT INTO projects.project (fk_language, fk_cloned_from_project)
    VALUES (fk_project_default_language, pk_sandbox_project)
  ON CONFLICT
    DO NOTHING
  RETURNING
    pk_entity INTO pk_new_project;

  /*
   * add label of project
   */
  INSERT INTO projects.text_property (fk_project, fk_pro_project, string, fk_system_type, fk_language)
    VALUES (pk_new_project, pk_new_project, project_label, fk_system_type__project_label, fk_project_default_language);

  /*
   * add description of project
   */
  INSERT INTO projects.text_property (fk_project, fk_pro_project, string, fk_system_type, fk_language)
    VALUES (pk_new_project, pk_new_project, project_description, fk_system_type__project_description, fk_project_default_language);

  /*
   * add dfh profiles to project
   */
  INSERT INTO projects.dfh_profile_proj_rel (fk_project, fk_profile, enabled)
  SELECT
    pk_new_project AS fk_project,
    fk_profile,
    enabled
  FROM
    projects.dfh_profile_proj_rel
  WHERE
    fk_project = pk_sandbox_project;

  /*
   * add dfh classes to project
   */
  INSERT INTO projects.dfh_class_proj_rel (fk_project, fk_class, enabled_in_entities)
  SELECT
    pk_new_project AS fk_project,
    fk_class,
    enabled_in_entities
  FROM
    projects.dfh_class_proj_rel
  WHERE
    fk_project = pk_sandbox_project;

  /*
   * add default namespace to project
   */
  INSERT INTO data.namespace (fk_project, standard_label)
    VALUES (pk_new_project, 'Default Namespace')
  RETURNING
    pk_entity INTO pk_new_default_namespace;

  /*
   * add account to project
   */
  INSERT INTO public.account_project_rel (fk_project, account_id, ROLE)
    VALUES (pk_new_project, account_id, 'owner');

  /*
   * add all information to project except for statements referencing to data
   */
  WITH tw1 AS (
    /*
     * select all info_proj_rel of sandbox except those that are
     * referencing an statement associating entities in data schema
     */
    SELECT
      t1.pk_entity
    FROM
      projects.info_proj_rel t1
    WHERE
      fk_project = pk_sandbox_project
    EXCEPT
    SELECT
      t1.pk_entity
    FROM
      projects.info_proj_rel t1,
      information.statement t2
    WHERE
      fk_project = pk_sandbox_project
      AND t1.fk_entity = t2.pk_entity
      AND (t2.fk_subject_tables_cell != 0
        OR t2.fk_object_tables_cell != 0
        OR t2.fk_subject_tables_row != 0
        OR t2.fk_object_tables_row != 0
        OR t2.fk_subject_data != 0
        OR t2.fk_object_data != 0))
  INSERT INTO projects.info_proj_rel (fk_project, fk_entity, fk_entity_version, fk_entity_version_concat, is_in_project, is_standard_in_project, calendar, ord_num_of_domain, ord_num_of_range, ord_num_of_text_property, entity_version)
  SELECT
    pk_new_project AS fk_project,
    t1.fk_entity,
    t1.fk_entity_version,
    t1.fk_entity_version_concat,
    t1.is_in_project,
    t1.is_standard_in_project,
    t1.calendar,
    t1.ord_num_of_domain,
    t1.ord_num_of_range,
    t1.ord_num_of_text_property,
    t1.entity_version
  FROM
    projects.info_proj_rel t1,
    tw1 t2
  WHERE
    t1.pk_entity = t2.pk_entity;

  /*
   * copy digitals from sandbox namespace to project's namespace, keeping track of the original pk_entity (in metadata, fk_cloned_from)
   */
  INSERT INTO data.digital (fk_namespace, fk_system_type, quill_doc, metadata)
  -- Select all digitals of sandbox project
  SELECT
    pk_new_default_namespace AS fk_namespace,
    t2.fk_system_type,
    t2.quill_doc,
    jsonb_build_object('fk_cloned_from', t2.pk_entity)
  FROM
    data.namespace t1,
    data.digital t2
  WHERE
    t1.fk_project = pk_sandbox_project
    AND t1.pk_entity = t2.fk_namespace;

  /*
   * copy statements pointing to digitals, using the pk_entity of the above created, where fk_cloned_from
   * and add them to the project
   */
  INSERT INTO information.statement (fk_subject_info, fk_subject_data, fk_subject_tables_cell, fk_subject_tables_row, fk_property, fk_property_of_property, fk_object_info, fk_object_data, fk_object_tables_cell, fk_object_tables_row, metadata)
  -- select statements pointing to the new digital's fk_cloned_from
  SELECT
    coalesce(t2.fk_subject_info, 0),
    t3.pk_entity AS fk_subject_data, -- pk of new digital
    coalesce(t2.fk_subject_tables_cell, 0),
    coalesce(t2.fk_subject_tables_row, 0),
    coalesce(t2.fk_property, 0),
    coalesce(t2.fk_property_of_property, 0),
    coalesce(t2.fk_object_info, 0),
    coalesce(t2.fk_object_data, 0),
    coalesce(t2.fk_object_tables_cell, 0),
    coalesce(t2.fk_object_tables_row, 0),
    jsonb_build_object('fk_cloned_from', t2.pk_entity) -- keep track of original entity_asssociacion
  FROM
    projects.info_proj_rel t1,
    information.statement t2,
    data.digital t3
  WHERE
    fk_project = pk_sandbox_project
    AND t1.is_in_project = TRUE
    AND t1.fk_entity = t2.pk_entity
    AND t2.fk_subject_data = (t3.metadata ->> 'fk_cloned_from')::int
    AND t3.fk_namespace = pk_new_default_namespace;

  /*
   * copy chunks from sandbox namespace to project's namespace, keeping track of original pk_entity (in metadata, fk_cloned_from)
   */
  INSERT INTO data.chunk (fk_namespace, quill_doc, fk_text, fk_entity_version, metadata)
  -- Select all chunks of sandbox project
  SELECT
    pk_new_default_namespace AS fk_namespace,
    t2.quill_doc,
    t4.pk_text,
    1 AS fk_entity_version,
    jsonb_build_object('fk_cloned_from', t2.pk_entity)
  FROM
    data.namespace t1,
    data.chunk t2,
    data.digital t3,
    data.digital t4
  WHERE
    t1.fk_project = pk_sandbox_project
    AND t1.pk_entity = t2.fk_namespace
    AND t3.pk_text = t2.fk_text
    AND (t4.metadata ->> 'fk_cloned_from')::int = t3.pk_entity;

  /*
   * copy statements pointing to chunks, using the pk_entity of the above created, where fk_cloned_from
   * and add them to the project
   */
  INSERT INTO information.statement (fk_subject_info, fk_subject_data, fk_subject_tables_cell, fk_subject_tables_row, fk_property, fk_property_of_property, fk_object_info, fk_object_data, fk_object_tables_cell, fk_object_tables_row, metadata)
  -- select statements pointing to the new chunk's fk_cloned_from
  SELECT
    coalesce(t2.fk_subject_info, 0),
    t3.pk_entity AS fk_subject_data, -- pk of new chunk
    coalesce(t2.fk_subject_tables_cell, 0),
    coalesce(t2.fk_subject_tables_row, 0),
    coalesce(t2.fk_property, 0),
    coalesce(t2.fk_property_of_property, 0),
    coalesce(t2.fk_object_info, 0),
    coalesce(t2.fk_object_data, 0),
    coalesce(t2.fk_object_tables_cell, 0),
    coalesce(t2.fk_object_tables_row, 0),
    jsonb_build_object('fk_cloned_from', t2.pk_entity) -- keep track of original entity_asssociacion
  FROM
    projects.info_proj_rel t1,
    information.statement t2,
    data.chunk t3
  WHERE
    t1.fk_project = pk_sandbox_project
    AND t1.is_in_project = TRUE
    AND t1.fk_entity = t2.pk_entity
    AND t2.fk_subject_data = (t3.metadata ->> 'fk_cloned_from')::int
    AND t3.fk_namespace = pk_new_default_namespace;
  -- make sure this is a chunk of this new project's namespace
  /*
   * Add the statements pointing to data to the new project
   */
  INSERT INTO projects.info_proj_rel (fk_entity, fk_project, is_in_project)
  SELECT
    t1.pk_entity AS fk_entity,
    pk_new_project AS fk_project,
    TRUE AS is_in_project
  FROM
    information.statement t1,
    data.entity t2
  WHERE
    t1.fk_subject_data = t2.pk_entity
    AND t2.fk_namespace = pk_new_default_namespace;

  /*
   * Clone all entity_previews from sandbox project
   * so that warehouse for this project is ready instantly
   */
  INSERT INTO war.entity_preview (pk_entity, fk_project, project, fk_class, entity_type, class_label, entity_label, time_span, fk_type, type_label, full_text, ts_vector, first_second, last_second, tmsp_last_modification)
  SELECT
    pk_entity,
    pk_new_project AS fk_project,
    pk_new_project AS project,
    fk_class,
    entity_type,
    class_label,
    entity_label,
    time_span,
    fk_type,
    type_label,
    full_text,
    ts_vector,
    first_second,
    last_second,
    tmsp_last_modification
  FROM
    war.entity_preview
  WHERE
    fk_project = pk_sandbox_project
  ON CONFLICT ON CONSTRAINT war_entity_preview_unique
    DO NOTHING;

  /*
   * Clone analysis
   */
  INSERT INTO projects.analysis (fk_last_modifier, fk_project, fk_analysis_type, name, description, analysis_definition)
  SELECT
    account_id AS fk_last_modifier,
    pk_new_project AS fk_project,
    fk_analysis_type,
    name,
    description,
    analysis_definition
  FROM
    projects.analysis
  WHERE
    fk_project = pk_sandbox_project;
END;
$BODY$;

