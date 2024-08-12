CREATE INDEX IF NOT EXISTS project_statements_fk_subject_info_idx
    ON pgwar.project_statements USING btree
    (fk_subject_info ASC NULLS LAST);
    
CREATE INDEX IF NOT EXISTS project_statements_fk_object_info_idx
    ON pgwar.project_statements USING btree
    (fk_object_info ASC NULLS LAST);
    
CREATE INDEX IF NOT EXISTS community_statements_fk_subject_info_idx
    ON pgwar.community_statements USING btree
    (fk_subject_info ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS community_statements_fk_object_info_idx
    ON pgwar.community_statements USING btree
    (fk_object_info ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS project_statements_outgoing_order_idx
    ON pgwar.project_statements USING btree
    (ord_num_of_range ASC NULLS LAST, tmsp_last_modification DESC NULLS FIRST);

CREATE INDEX IF NOT EXISTS community_statements_fk_property_idx
    ON pgwar.community_statements USING btree
    (fk_property ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS project_statements_fk_property_idx
    ON pgwar.project_statements USING btree
    (fk_property ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS entity_preview_fk_class_idx
    ON pgwar.entity_preview USING btree
    (fk_class ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS entity_preview_entity_label_idx
    ON pgwar.entity_preview USING btree
    (entity_label ASC NULLS LAST);

CREATE INDEX IF NOT EXISTS idx_tmsp_last_dfh_update
    ON data_for_history.api_property USING btree
        (tmsp_last_dfh_update DESC NULLS LAST)
    TABLESPACE pg_default;