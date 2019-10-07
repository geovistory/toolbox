-- data operation, no way back
-- initializes all entity_previews via migration to avoid a period without entity_previews on production
-- this will take some time (minutes)
SELECT warehouse.entity_preview_non_recursive__refresh();
SELECT warehouse.entity_preview__update_all();
