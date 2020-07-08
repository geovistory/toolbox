-- 2
ALTER TABLE warehouse.entity_preview
  DISABLE TRIGGER USER;

-- 1
DROP TRIGGER before_update_on_entity_preview__related_full_texts ON warehouse.entity_preview;

CREATE TRIGGER before_update_on_entity_preview__related_full_texts
    BEFORE UPDATE OF related_full_texts
    ON warehouse.entity_preview
    FOR EACH ROW
    EXECUTE PROCEDURE warehouse.entity_preview__concat_full_text();
