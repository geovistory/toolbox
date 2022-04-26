CREATE INDEX entity_preview_full_text ON war.entity_preview USING GIN (ts_vector);

