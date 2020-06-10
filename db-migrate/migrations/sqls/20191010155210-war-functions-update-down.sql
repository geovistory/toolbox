-- 6
CREATE OR REPLACE FUNCTION warehouse.entity_preview_update_queue_worker ()
  RETURNS boolean
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE
  AS $BODY$
BEGIN
  /*
   * Check if we have at least one record in the update queue
   */
  IF (
    SELECT
      EXISTS (
      SELECT
        *
      FROM
        warehouse.entity_preview_update_queue)) THEN
    /**********
     * Creates a temp table useful for later steps.
     *
     * takes only the latest item for each pk_entity and project.
     * this helps to skip unneeded intermediate updates. For example:
     * Those update requests:
     * - entity 207386, project 24, is_in_project true, ord_num 4
     * - entity 207386, project 24, is_in_project false, ord_num 3
     * - entity 207386, project 82, is_in_project true, ord_num 2
     * - entity 207386, project 24, is_in_project true, ord_num 1
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
    DROP TABLE IF EXISTS tmp_update_queue_table;
    CREATE TEMP TABLE tmp_update_queue_table AS SELECT DISTINCT ON (t1.fk_project, t1.pk_entity)
      t1.fk_project,
      t1.pk_entity,
      t3.is_in_project,
      t1.ord_num
    FROM
      warehouse.entity_preview_update_queue t1
      INNER JOIN (
        SELECT
          pk_entity
        FROM
          information.persistent_item
      UNION
      SELECT
        pk_entity
      FROM
        information.temporal_entity) t2 ON t1.pk_entity = t2.pk_entity
      INNER JOIN projects.info_proj_rel t3 ON t3.fk_entity = t1.pk_entity
        AND t3.fk_project = t1.fk_project
      ORDER BY
        t1.fk_project,
        t1.pk_entity,
        t1.ord_num DESC;

    /**********
     * Group the remaining update request by is_in_project and fk_projects and
     * Perform the updates on entity_preview_non_recursive
     ***********/
    /*
     * Perform the updates on entity_preview_non_recursive
     */
    PERFORM
      CASE WHEN t1.is_in_project = TRUE THEN
        warehouse.entity_preview_non_recursive__upsert (t1.pk_entities,
          t1.fk_project)
      WHEN t1.is_in_project = FALSE THEN
        warehouse.entity_preview_non_recursive__delete (t1.pk_entities,
          t1.fk_project)
      END
    FROM (
      /*
       * Group the remaining update request by is_in_project and fk_projects
       */
      SELECT
        is_in_project,
        fk_project,
        array_agg(pk_entity) pk_entities --, count(pk_entity)
      FROM
        tmp_update_queue_table
      GROUP BY
        fk_project,
        is_in_project) t1;

    /**********
     * Cleanup queue by deleting all rows with ord_num smaller than the
     * highest ord_num considered when creating the updates
     **********/
    DELETE FROM warehouse.entity_preview_update_queue
    WHERE ord_num <= (
        SELECT
          max(ord_num) max_ord_num
        FROM
          tmp_update_queue_table);

    /********
     * reset serial if queue is empty.
     * this prevents from exceeding maximum of integer / serial
     *********/
    IF (
      SELECT
        EXISTS (
        SELECT
          *
        FROM
          warehouse.entity_preview_update_queue) = FALSE) THEN
      PERFORM
        setval('warehouse.entity_preview_update_queue_ord_num_seq', 1);
    END IF;

    /******
     * Return true if there has been at least one update on entity_preview_non_recursive
     *******/
    RETURN (
      SELECT
        EXISTS (
          SELECT
            *
          FROM
            tmp_update_queue_table));
  ELSE
    /*
     * Return false if we had no record in the update queue
     */
    RETURN FALSE;
  END IF;
END;
$BODY$;

-- 5


-- 4
CREATE OR REPLACE FUNCTION warehouse.after_info_proj_rel_upsert ()
  RETURNS TRIGGER
  LANGUAGE 'plpgsql'
  COST 100 VOLATILE NOT LEAKPROOF
  AS $BODY$
DECLARE
  _table_name VARCHAR;
  _fk_project INT;
  _fk_entity INT;
  _fk_temporal_entity INT;
  _fk_info_domain INT;
  _fk_info_range INT;
  _domain_is_in_project BOOLEAN;
  _range_is_in_project BOOLEAN;
  _BOOL BOOLEAN;
  _result JSONB;
  _new_label TEXT;
BEGIN
  _fk_project = NEW.fk_project;
  -- find the table name of the affected table
  SELECT
    table_name INTO _table_name
  FROM
    information.entity e
  WHERE
    e.pk_entity = NEW.fk_entity;

  /******************************************************************
   * text_property
   ******************************************************************/
  IF (
    SELECT
      _table_name = 'text_property') THEN
    SELECT
      t.fk_concerned_entity INTO _fk_entity
    FROM
      information.text_property t
    WHERE
      t.pk_entity = NEW.fk_entity;

    /**
     * Add concerned entity to the update queue
     */
    INSERT INTO warehouse.entity_preview_update_queue (fk_project, pk_entity)
    VALUES (_fk_project, _fk_entity) ON CONFLICT DO NOTHING;
    PERFORM
      pg_notify('queue_updated', 'true');

    /******************************************************************
     * role
     ******************************************************************/
  ELSIF (
      SELECT
        _table_name = 'role') THEN
    SELECT
      r.fk_entity INTO _fk_entity
    FROM
      information.role r
    WHERE
      r.pk_entity = NEW.fk_entity;
    SELECT
      r.fk_temporal_entity INTO _fk_temporal_entity
    FROM
      information.role r
    WHERE
      r.pk_entity = NEW.fk_entity;

    /**
     * Add domain and range entities to the update queue
     */
    INSERT INTO warehouse.entity_preview_update_queue (fk_project, pk_entity)
    VALUES (_fk_project, _fk_entity), (_fk_project, _fk_temporal_entity) ON CONFLICT DO NOTHING;
    PERFORM
      pg_notify('queue_updated', 'true');

    /******************************************************************
     * entity_association
     ******************************************************************/
  ELSIF (
      SELECT
        _table_name = 'entity_association') THEN
    SELECT
      ea.fk_info_domain INTO _fk_info_domain
    FROM
      information.entity_association ea
    WHERE
      ea.pk_entity = NEW.fk_entity;
    SELECT
      ea.fk_info_range INTO _fk_info_range
    FROM
      information.entity_association ea
    WHERE
      ea.pk_entity = NEW.fk_entity;

    /**
     * Add domain and range entities to the update queue
     */
    INSERT INTO warehouse.entity_preview_update_queue (fk_project, pk_entity)
    VALUES (_fk_project, _fk_info_domain), (_fk_project, _fk_info_range) ON CONFLICT DO NOTHING;
    PERFORM
      pg_notify('queue_updated', 'true');

    /******************************************************************
     * temporal_entity   or   persistent_item
     ******************************************************************/
  ELSIF (
      SELECT
        _table_name IN ('temporal_entity',
          'persistent_item')) THEN
    /**
     * Add entity to the update queue
     */
    INSERT INTO warehouse.entity_preview_update_queue (fk_project, pk_entity)
    VALUES (_fk_project, NEW.fk_entity) ON CONFLICT DO NOTHING;
    PERFORM
      pg_notify('queue_updated', 'true');
  END IF;
  RETURN NEW;
END;
$BODY$;

-- 3
DROP TRIGGER after_epr_upsert ON projects.info_proj_rel;

CREATE TRIGGER after_epr_upsert
  AFTER INSERT
  OR UPDATE ON projects.info_proj_rel
  FOR EACH ROW
  EXECUTE PROCEDURE warehouse.after_info_proj_rel_upsert ();

-- 2
CREATE TABLE warehouse.entity_preview_update_queue (
  fk_project integer NOT NULL,
  pk_entity integer NOT NULL,
  ord_num SERIAL);
-- 1
DROP TABLE warehouse.entity_preview_non_recursive_updates;

