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