-- 1
ALTER TABLE data.entity ADD COLUMN id_for_import INT;

ALTER TABLE data.avatar_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.cell_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.chunk_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.class_column_mapping_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.column_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.data_association_mapping_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.data_association_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.digital_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.factoid_mapping_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.factoid_role_mapping_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.factoid_role_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.factoid_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.namespace_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.property_of_property_mapping_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.property_of_property_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.row_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.text_property_vt ADD COLUMN id_for_import INT;
ALTER TABLE data.values_association_vt ADD COLUMN id_for_import INT;


-- 2
ALTER TABLE data.entity ADD COLUMN id_for_import_txt TEXT;

ALTER TABLE data.avatar_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.cell_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.chunk_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.class_column_mapping_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.column_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.data_association_mapping_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.data_association_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.digital_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.factoid_mapping_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.factoid_role_mapping_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.factoid_role_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.factoid_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.namespace_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.property_of_property_mapping_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.property_of_property_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.row_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.text_property_vt ADD COLUMN id_for_import_txt TEXT;
ALTER TABLE data.values_association_vt ADD COLUMN id_for_import_txt TEXT;

-- 3
ALTER TABLE data.entity ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);

ALTER TABLE data.avatar_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.cell_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.chunk_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.class_column_mapping_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.column_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.data_association_mapping_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.data_association_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.digital_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.factoid_mapping_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.factoid_role_mapping_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.factoid_role_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.factoid_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.namespace_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.property_of_property_mapping_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.property_of_property_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.row_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.text_property_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.values_association_vt ADD COLUMN fk_publication_status INTEGER REFERENCES system.system_type (pk_entity);

-- 4
ALTER TABLE data.entity ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);

ALTER TABLE data.avatar_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.cell_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.chunk_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.class_column_mapping_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.column_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.data_association_mapping_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.data_association_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.digital_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.factoid_mapping_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.factoid_role_mapping_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.factoid_role_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.factoid_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.namespace_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.property_of_property_mapping_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.property_of_property_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.row_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.text_property_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
ALTER TABLE data.values_association_vt ADD COLUMN fk_license INTEGER REFERENCES system.system_type (pk_entity);
