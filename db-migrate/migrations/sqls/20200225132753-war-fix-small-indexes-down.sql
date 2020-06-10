-- enriched node
Create Index enriched_node_full_text_idx On war.enriched_node Using btree (full_text Collate pg_catalog. "default" Asc NULLS Last) Tablespace pg_default;

Create Index enriched_node_own_entity_label_idx1 On war.enriched_node Using btree (own_entity_label Collate pg_catalog. "default" Asc NULLS Last) Tablespace pg_default;

Create Index enriched_node_own_entity_label_idx On war.enriched_node Using btree (own_entity_label Collate pg_catalog. "default" Asc NULLS Last) Tablespace pg_default;

Create Index enriched_node_own_full_text_idx On war.enriched_node Using btree (own_full_text Collate pg_catalog. "default" Asc NULLS Last) Tablespace pg_default;

-- entity preview
Create Index entity_preview_full_text_idx On war.entity_preview Using btree (full_text Collate pg_catalog. "default" Asc NULLS Last) Tablespace pg_default;

