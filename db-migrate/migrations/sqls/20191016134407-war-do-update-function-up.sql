
CREATE OR REPLACE FUNCTION warehouse.do_updates_for_time_after(
	tmsp timestamp without time zone)
    RETURNS void
    LANGUAGE 'sql'

    COST 100
    VOLATILE
AS $BODY$
/**********
* Selects the pk_entities that need to be updated.
*
* takes only the latest item for each pk_entity and project.
* this helps to skip unneeded intermediate updates. For example:
* Those update requests:
* - entity 207386, project 24, is_in_project true
* - entity 207386, project 24, is_in_project false
* - entity 207386, project 82, is_in_project true
* - entity 207386, project 24, is_in_project true
*
* is reduced to the latest ones per project and entity:
* - entity 207386, project 24, is_in_project true
* - entity 207386, project 82, is_in_project true
*
* also takes only pk_entity of persistent_item or temporal_entity
* by joining a union of information.persistent_item and information.temporal_entity
*
* also takes only pk_entity of items that have a info_proj_rel.
* this excludes entities that are related by project's properties (roles) but are not in project
* themselfes.
***********/
WITH tw1 AS (
	SELECT t1.fk_entity, t1.fk_project, t1.tmsp_last_modification::timestamp
	FROM
	projects.info_proj_rel t1
	WHERE
	t1.tmsp_last_modification::timestamp >= tmsp
),
-- select fk_entity and fk_project of all affected persistent_items and temporal_entities
tw2 AS (
	-- persistent_items where info_proj_rel changed
	SELECT t1.pk_entity as fk_entity, t2.fk_project, t2.tmsp_last_modification
	FROM information.persistent_item t1, tw1 t2
	WHERE t1.pk_entity = t2.fk_entity
	UNION ALL
	-- temporal_entities where info_proj_rel changed
	SELECT t1.pk_entity as fk_entity, t2.fk_project, t2.tmsp_last_modification
	FROM information.temporal_entity t1, tw1 t2
	WHERE t1.pk_entity = t2.fk_entity
	UNION ALL
	-- domain entities of roles where info_proj_rel changed
	SELECT t1.fk_temporal_entity as fk_entity, t2.fk_project, t2.tmsp_last_modification
	FROM information.role t1, tw1 t2
	WHERE t1.pk_entity = t2.fk_entity
	UNION ALL
	-- range entities of roles where info_proj_rel changed
	SELECT t1.fk_entity as fk_entity, t2.fk_project, t2.tmsp_last_modification
	FROM information.role t1, tw1 t2
	WHERE t1.pk_entity = t2.fk_entity
	UNION ALL
	-- domain entities of entity_associations where info_proj_rel changed
	SELECT t1.fk_info_domain as fk_entity, t2.fk_project, t2.tmsp_last_modification
	FROM information.entity_association t1, tw1 t2
	WHERE t1.pk_entity = t2.fk_entity
	UNION ALL
	-- range entities of entity_associations where info_proj_rel changed
	SELECT t1.fk_info_range as fk_entity, t2.fk_project, t2.tmsp_last_modification
	FROM information.entity_association t1, tw1 t2
	WHERE t1.pk_entity = t2.fk_entity
	UNION ALL
	-- concerned entities of text_properties where info_proj_rel changed
	SELECT t1.fk_concerned_entity as fk_entity, t2.fk_project, t2.tmsp_last_modification
	FROM information.text_property t1, tw1 t2
	WHERE t1.pk_entity = t2.fk_entity
),
tw3 AS (
	SELECT DISTINCT ON (t1.fk_project,  t1.fk_entity)
		t1.fk_project,
		t1.fk_entity,
		t2.is_in_project,
		t1.tmsp_last_modification
	FROM
		tw2 t1,
		projects.info_proj_rel t2
	WHERE
		t1.fk_entity = t2.fk_entity
	AND
		t1.fk_project = t2.fk_project
	ORDER BY
		t1.fk_project,
		t1.fk_entity,
		t1.tmsp_last_modification DESC
),
tw4 AS (
  /**********
   * Group the remaining update request by is_in_project and fk_projects
   ***********/
  SELECT
    is_in_project,
    fk_project,
    array_agg(fk_entity) pk_entities --, count(pk_entity)
  FROM
    tw3
  GROUP BY
    fk_project,
    is_in_project)
/*******
 * Perform the updates on entity_preview_non_recursive
 *******/
SELECT
  CASE WHEN t1.is_in_project = TRUE THEN
    warehouse.entity_preview_non_recursive__upsert (t1.pk_entities,
      t1.fk_project)
  WHEN t1.is_in_project = FALSE THEN
    warehouse.entity_preview_non_recursive__delete (t1.pk_entities,
      t1.fk_project)
  END
FROM
  tw4 t1;

$BODY$;
