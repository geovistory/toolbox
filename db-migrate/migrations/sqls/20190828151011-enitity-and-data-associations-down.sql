-- 1
DROP INDEX information.entity_association_fk_cell_domain_idx;
DROP INDEX information.entity_association_fk_cell_range_idx;

DROP INDEX data.data_association_fk_info_domain_idx;
DROP INDEX data.data_association_fk_info_range_idx;

DROP INDEX data.data_association_fk_cell_domain_idx;
DROP INDEX data.data_association_fk_cell_range_idx;

ALTER TABLE information.entity_association DROP COLUMN fk_cell_domain;
ALTER TABLE information.entity_association DROP COLUMN fk_cell_range;


ALTER TABLE data.data_association DROP COLUMN fk_info_domain;
ALTER TABLE data.data_association DROP COLUMN fk_info_range;
ALTER TABLE data.data_association DROP COLUMN fk_cell_domain;
ALTER TABLE data.data_association DROP COLUMN fk_cell_range;


