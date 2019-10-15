-- 1
CREATE TABLE warehouse.entity_preview_non_recursive_updates (
  pk_entity serial,
  tmsp_update_begin timestamp without time zone,
  tmsp_update_end timestamp without time zone
);

-- 2
DROP TABLE warehouse.entity_preview_update_queue;

-- 3
DROP TRIGGER after_epr_upsert ON projects.info_proj_rel;

CREATE TRIGGER after_epr_upsert
  AFTER INSERT
  OR UPDATE ON projects.info_proj_rel
  FOR EACH STATEMENT
  EXECUTE PROCEDURE warehouse.after_info_proj_rel_upsert ();

-- 4
CREATE OR REPLACE FUNCTION warehouse.after_info_proj_rel_upsert ()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  AS $BODY$
BEGIN
  PERFORM
    pg_notify('queue_updated', 'true');
  RETURN NEW;
END;
$BODY$;

-- 5
CREATE OR REPLACE FUNCTION warehouse.do_updates_for_time_after (tmsp timestamp)
  RETURNS void
  LANGUAGE 'sql'
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

-- 6
CREATE OR REPLACE FUNCTION warehouse.entity_preview_update_queue_worker ()
  RETURNS boolean
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
DECLARE
  last_warehouse_update timestamp without time zone;
  last_project_modification timestamp without time zone;
  pk_update bigint;
  -- pk_entity of the update done by this function
BEGIN
  /*
   * Get the timestamp of the last warehouse.entity_preview_non_recursive update
   */
  SELECT
    tmsp_update_begin INTO last_warehouse_update
  FROM
    warehouse.entity_preview_non_recursive_updates
  ORDER BY
    pk_entity DESC
  LIMIT 1;
  -- set very early default
  IF last_warehouse_update IS NULL THEN
    last_warehouse_update = '1970-01-01 00:00:00.000000'::timestamp;
  END IF;

  /*
   * Get the timestamp of the last rojects.info_proj_rel modification
   */
  SELECT
    tmsp_last_modification::timestamp INTO last_project_modification
  FROM
    projects.info_proj_rel
  ORDER BY
    tmsp_last_modification DESC
  LIMIT 1;

  /*
   * Check if we need an update, i.e:
   * if last modification is newer than last update of warehouse
   */
  IF (last_project_modification > last_warehouse_update) THEN
    /*
     * Create a new record for this update.
     * the function now() is equivalent to transaction_timestamp() and
     * returns the start time of the current transaction.
     */
    INSERT INTO warehouse.entity_preview_non_recursive_updates (tmsp_update_begin)
    VALUES (now()::timestamp)
  RETURNING
    pk_entity INTO pk_update;

    /*****
     * Perform the updates
     ******/
    PERFORM
      warehouse.do_updates_for_time_after (last_warehouse_update);

    /**********
     * Store the timestamp of after the update so that we have a log of the execution time
     * clock_timestamp() returns the actual current time,
     * and therefore its value changes even within a single SQL command.
     **********/
    UPDATE
      warehouse.entity_preview_non_recursive_updates
    SET
      tmsp_update_end = clock_timestamp()::timestamp;

    /******
     * Return true for indicating that tehere has been an update
     *******/
    RETURN TRUE;
  ELSE
    /*
     * Return false for indicating that there has been no update
     */
    RETURN FALSE;
  END IF;
END;
$BODY$;

