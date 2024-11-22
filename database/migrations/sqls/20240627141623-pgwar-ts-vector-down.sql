-- Down migration script

-- Drop the trigger if
DROP TRIGGER on_upsert_entity_preview_set_ts_vector ON pgwar.entity_preview;

-- Drop the function if
DROP FUNCTION pgwar.entity_preview_ts_vector();
