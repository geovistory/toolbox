-- 1
CREATE OR REPLACE FUNCTION warehouse.entity_preview_non_recursive__upsert(param_pk_entities integer[], param_fk_project integer)
returns void
AS $$

  /**
  * UPSERT the entity previews of the entities with given param_pk_entities
  * for the given param_fk_project and the repo version (fk_project = NULL)
  */
  INSERT INTO
  warehouse.entity_preview_non_recursive
  (
    SELECT * FROM warehouse.entity_preview_non_recursive__create(param_pk_entities)
    WHERE fk_project IS NULL OR fk_project = param_fk_project
  )
  ON CONFLICT (pk_entity, COALESCE(fk_project, 0))
    DO UPDATE
      SET
        fk_class = EXCLUDED.fk_class,
        table_name = EXCLUDED.table_name,
        class_label = EXCLUDED.class_label,
        own_full_text = EXCLUDED.own_full_text,
        own_entity_label = EXCLUDED.own_entity_label,
        time_span = EXCLUDED.time_span,
        related_full_texts = EXCLUDED.related_full_texts,
        fk_entity_label = EXCLUDED.fk_entity_label,
        fk_type = EXCLUDED.fk_type;

$$ LANGUAGE SQL;
