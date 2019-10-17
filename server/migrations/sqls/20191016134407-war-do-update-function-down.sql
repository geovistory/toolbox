
CREATE OR REPLACE FUNCTION warehouse.do_updates_for_time_after(
	tmsp timestamp without time zone)
    RETURNS void
    LANGUAGE 'sql'

    COST 100
    VOLATILE
AS $BODY$
  WITH tw1 AS (
    /**********
     * Selects the info_proj_rel that need to be updated.
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
    SELECT DISTINCT ON (t1.fk_project,
      t1.fk_entity)
      t1.fk_project,
      t1.fk_entity,
      t1.is_in_project,
      t1.tmsp_last_modification
    FROM
      projects.info_proj_rel t1,
      (
        SELECT
          pk_entity
        FROM
          information.persistent_item
        UNION
        SELECT
          pk_entity
        FROM
          information.temporal_entity) t2
      WHERE
        t1.tmsp_last_modification::timestamp >= tmsp
        AND t1.fk_entity = t2.pk_entity
      ORDER BY
        t1.fk_project,
        t1.fk_entity,
        t1.tmsp_last_modification DESC
),
tw2 AS (
  /**********
   * Group the remaining update request by is_in_project and fk_projects
   ***********/
  SELECT
    is_in_project,
    fk_project,
    array_agg(fk_entity) pk_entities --, count(pk_entity)
  FROM
    tw1
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
  tw2 t1;

$BODY$;
