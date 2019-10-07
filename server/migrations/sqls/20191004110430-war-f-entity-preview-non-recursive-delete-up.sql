-- 1
CREATE OR REPLACE FUNCTION warehouse.entity_preview_non_recursive__delete(param_pk_entities integer[], param_fk_project integer)
returns void
AS $$

  /**
  * Delete the entity previews of the entities with given param_pk_entities
  * for the given param_fk_project
  */
  DELETE FROM  warehouse.entity_preview_non_recursive
  WHERE pk_entity = ANY(param_pk_entities)
  AND fk_project IS NOT DISTINCT FROM param_fk_project;

  /**
  * Clean up the repo
  * Delete repo entity_previews if the entity is removed from all projects
  */
  DELETE FROM  warehouse.entity_preview_non_recursive
  WHERE pk_entity IN (
    -- find entities that are in no project anymore
    SELECT pk_entity
    FROM warehouse.entity_preview_non_recursive
    WHERE pk_entity = ANY(param_pk_entities)
    EXCEPT
    SELECT pk_entity
    FROM warehouse.entity_preview_non_recursive
    WHERE pk_entity = ANY(param_pk_entities)
    AND fk_project IS NOT NULL
  )
  AND fk_project IS NULL;


$$ LANGUAGE SQL;
