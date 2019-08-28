-- 1
ALTER TABLE information.entity_association ADD COLUMN fk_cell_domain BIGINT;
ALTER TABLE information.entity_association ADD COLUMN fk_cell_range BIGINT;


ALTER TABLE data.data_association ADD COLUMN fk_info_domain BIGINT;
ALTER TABLE data.data_association ADD COLUMN fk_info_range BIGINT;
ALTER TABLE data.data_association ADD COLUMN fk_cell_domain BIGINT;
ALTER TABLE data.data_association ADD COLUMN fk_cell_range BIGINT;




CREATE INDEX entity_association_fk_cell_domain_idx
    ON information.entity_association USING btree
    (fk_cell_domain);
CREATE INDEX entity_association_fk_cell_range_idx
    ON information.entity_association USING btree
    (fk_cell_range);


CREATE INDEX data_association_fk_info_domain_idx
    ON data.data_association USING btree
    (fk_info_domain);
CREATE INDEX data_association_fk_info_range_idx
    ON data.data_association USING btree
    (fk_info_range);

CREATE INDEX data_association_fk_cell_domain_idx
  ON data.data_association  USING btree(fk_cell_domain);
CREATE INDEX data_association_fk_cell_range_idx
  ON data.data_association  USING btree(fk_cell_range);
