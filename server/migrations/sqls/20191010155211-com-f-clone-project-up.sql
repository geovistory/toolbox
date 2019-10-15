-- 1
ALTER TABLE projects.project
  ADD COLUMN fk_cloned_from_project INTEGER REFERENCES projects.project (pk_entity);

-- 2
ALTER TABLE projects.query
  ADD COLUMN fk_cloned_from_query INTEGER REFERENCES projects.query (pk_entity);

-- 3
ALTER TABLE projects.query_vt
  ADD COLUMN fk_cloned_from_query INTEGER;

-- 4
CREATE OR REPLACE FUNCTION commons.clone_sandbox_project (account_id integer)
  RETURNS void
  LANGUAGE 'plpgsql'
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
  VALUES (fk_project_default_language, pk_sandbox_project) ON CONFLICT DO NOTHING
RETURNING
  pk_entity INTO pk_new_project;

  /*
   * add label of project
   */
  INSERT INTO projects.text_property (fk_entity, string, fk_system_type, fk_language)
  VALUES (pk_new_project, project_label, fk_system_type__project_label, fk_project_default_language);

  /*
   * add description of project
   */
  INSERT INTO projects.text_property (fk_entity, string, fk_system_type, fk_language)
  VALUES (pk_new_project, project_description, fk_system_type__project_description, fk_project_default_language);

  /*
   * add dfh to project
   */
  INSERT INTO projects.dfh_class_proj_rel (fk_project, fk_entity, enabled_in_entities)
SELECT
  pk_new_project AS fk_project,
  fk_entity,
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
   * add all information to project except for entity_associations referencing to data
   */
  WITH tw1 AS (
    /*
     * select all info_proj_rel of sandbox except those that are
     * referencing an entity_association associating entities in data schema
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
      information.entity_association t2
    WHERE
      fk_project = pk_sandbox_project
      AND t1.fk_entity = t2.pk_entity
      AND (t2.fk_cell_domain IS NOT NULL
        OR t2.fk_cell_range IS NOT NULL
        OR t2.fk_data_domain IS NOT NULL
        OR t2.fk_data_range IS NOT NULL))
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
   * copy entity_associations pointing to digitals, using the pk_entity of the above created, where fk_cloned_from
   * and add them to the project
   */
  INSERT INTO information.entity_association (fk_data_domain, fk_data_range, fk_info_domain, fk_info_range, fk_property, fk_cell_domain, fk_cell_range, metadata)
  -- select entity_associations pointing to the new digital's fk_cloned_from
  SELECT
    t3.pk_entity AS fk_data_domain, -- pk of new digital
    t2.fk_data_range,
    t2.fk_info_domain,
    t2.fk_info_range,
    t2.fk_property,
    t2.fk_cell_domain,
    t2.fk_cell_range,
    jsonb_build_object('fk_cloned_from', t2.pk_entity) -- keep track of original entity_asssociacion
  FROM
    projects.info_proj_rel t1,
    information.entity_association t2,
    data.digital t3
  WHERE
    fk_project = pk_sandbox_project
    AND t1.is_in_project = TRUE
    AND t1.fk_entity = t2.pk_entity
    AND t2.fk_data_domain = (t3.metadata ->> 'fk_cloned_from')::int
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
    t4.entity_version,
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
    AND t3.entity_version = t2.fk_entity_version
    AND (t4.metadata ->> 'fk_cloned_from')::int = t3.pk_entity;

  /*
   * copy entity_associations pointing to chunks, using the pk_entity of the above created, where fk_cloned_from
   * and add them to the project
   */
  INSERT INTO information.entity_association (fk_data_domain, fk_data_range, fk_info_domain, fk_info_range, fk_property, fk_cell_domain, fk_cell_range, metadata)
  -- select entity_associations pointing to the new chunk's fk_cloned_from
  SELECT
    t3.pk_entity AS fk_data_domain, -- pk of new digital
    t2.fk_data_range,
    t2.fk_info_domain,
    t2.fk_info_range,
    t2.fk_property,
    t2.fk_cell_domain,
    t2.fk_cell_range,
    jsonb_build_object('fk_cloned_from', t2.pk_entity) -- keep track of original entity_asssociacion
  FROM
    projects.info_proj_rel t1,
    information.entity_association t2,
    data.chunk t3
  WHERE
    t1.fk_project = pk_sandbox_project
    AND t1.is_in_project = TRUE
    AND t1.fk_entity = t2.pk_entity
    AND t2.fk_data_domain = (t3.metadata ->> 'fk_cloned_from')::int
    AND t3.fk_namespace = pk_new_default_namespace;
  -- make sure this is a chunk of this new project's namespace
  /*
   * Add the entity_associations pointing to data to the new project
   */
  INSERT INTO projects.info_proj_rel (fk_entity, fk_project, is_in_project)
SELECT
  t1.pk_entity AS fk_entity,
  pk_new_project AS fk_project,
  TRUE AS is_in_project
FROM
  information.entity_association t1,
  data.entity t2
WHERE
  t1.fk_data_domain = t2.pk_entity
  AND t2.fk_namespace = pk_new_default_namespace;

  /*
   * Clone all entity_preview_non_recursive from sandbox project
   * so that warehouse for this project is ready instantly
   */
  INSERT INTO warehouse.entity_preview_non_recursive (pk_entity, fk_class, fk_project, table_name, class_label, own_full_text, own_entity_label, time_span, related_full_texts, fk_entity_label, fk_type)
SELECT
  pk_entity,
  fk_class,
  pk_new_project AS fk_project,
  table_name,
  class_label,
  own_full_text,
  own_entity_label,
  time_span,
  related_full_texts,
  fk_entity_label,
  fk_type
FROM
  warehouse.entity_preview_non_recursive
WHERE
  fk_project = pk_sandbox_project ON CONFLICT (pk_entity, COALESCE(fk_project, 0))
  DO NOTHING;

  /*
   * Clone all entity_previews from sandbox project
   * so that warehouse for this project is ready instantly
   */
  INSERT INTO warehouse.entity_preview (pk_entity, fk_project, project, fk_class, entity_type, class_label, entity_label, time_span, own_full_text, fk_entity_label, fk_type, related_full_texts, full_text, ts_vector)
SELECT
  pk_entity,
  pk_new_project AS fk_project,
  pk_new_project AS project,
  fk_class,
  entity_type,
  class_label,
  entity_label,
  time_span,
  own_full_text,
  fk_entity_label,
  fk_type,
  related_full_texts,
  full_text,
  ts_vector
FROM
  warehouse.entity_preview
WHERE
  fk_project = pk_sandbox_project ON CONFLICT ON CONSTRAINT entity_preview_unique DO NOTHING;

  /*
   * Clone query
   */
  INSERT INTO projects.query (fk_last_modifier, name, description, query, fk_project, fk_cloned_from_query)
SELECT
  account_id AS fk_last_modifier,
  name,
  description,
  query,
  pk_new_project AS fk_project,
  pk_entity
FROM
  projects.query
WHERE
  fk_project = pk_sandbox_project;

  /*
   * Clone visual
   */
  INSERT INTO projects.visual (fk_last_modifier, name, description, visual, fk_project)
  WITH tw1 AS (
    -- unnest all queryLayers
    SELECT
      pk_entity,
      visual,
      jsonb_array_elements(visual -> 'settings' -> 'queryLayers') AS layer
    FROM
      projects.visual
    WHERE
      fk_project = pk_sandbox_project),
    tw2 AS (
      -- replace the pk of original query with pk of new query and set queryVersion=1
      SELECT
        t1.pk_entity,
        t1.visual,
        jsonb_set(jsonb_set(t1.layer, '{queryPk}', t2.pk_entity::text::jsonb), '{queryVersion}', '1'::jsonb) AS modified_layer
      FROM
        tw1 t1,
        projects.query t2
      WHERE
        t2.fk_project = pk_new_project
      AND
        t2.fk_cloned_from_query = (t1.layer ->> 'queryPk')::integer
        ),
      tw3 AS (
        -- aggregate modified query layers and insert them into the visuals object
        SELECT
          t1.pk_entity,
          jsonb_set(t1.visual, '{settings,queryLayers}', jsonb_agg(t1.modified_layer)) AS modified_visual
        FROM
          tw2 t1
        GROUP BY
          t1.pk_entity,
          t1.visual
)
      SELECT
        account_id AS fk_last_modifier,
        t2.name,
        t2.description,
        t1.modified_visual AS visual,
        pk_new_project AS fk_project
      FROM
        tw3 t1,
        projects.visual t2
      WHERE
        t1.pk_entity = t2.pk_entity;
END;
$BODY$;

