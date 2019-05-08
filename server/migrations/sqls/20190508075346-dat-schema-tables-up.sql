------------------------------------------------------------------------------------------------------------
-- 1. CREATE Table Chunk
------------------------------------------------------------------------------------------------------------
ALTER TABLE commons.text ADD CONSTRAINT text_version_unique UNIQUE (pk_text, entity_version);

CREATE TABLE data.chunk
(
    fk_text INT,
    fk_entity_version INT,
    CONSTRAINT text_fkey FOREIGN KEY (fk_text, fk_entity_version) REFERENCES commons.text (pk_text, entity_version) 
)
INHERITS (data.entity);

SELECT commons.init_entity_child_table('data.chunk');
SELECT commons.make_versioned_table_child_of_text('data.chunk');

------------------------------------------------------------------------------------------------------------
-- 2. CREATE Table Row
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.row
  (
    fk_digital INTEGER NOT NULL REFERENCES data.digital (pk_entity)
  )
  INHERITS (data.entity);
  
  SELECT commons.init_entity_child_table('data.row');


------------------------------------------------------------------------------------------------------------
-- 3. TABLE data.column (including *_vt)
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.column
  (
    fk_digital INTEGER NOT NULL REFERENCES data.digital (pk_entity),
    fk_data_type INTEGER NOT NULL REFERENCES system.system_type (pk_entity),
    fk_meta_data INTEGER NOT NULL REFERENCES system.system_type (pk_entity)
  )
  INHERITS (data.entity);
  
  SELECT commons.init_entity_child_table('data.column');


------------------------------------------------------------------------------------------------------------
-- 4. TABLE data.cell (including *_vt)
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.cell
  (
    fk_column INTEGER NOT NULL REFERENCES data.column (pk_entity),
    fk_row INTEGER NOT NULL REFERENCES data.row (pk_entity)
  )
  INHERITS (data.entity);
  
  SELECT commons.init_entity_child_table('data.cell');
  SELECT commons.make_versioned_table_child_of_text('data.cell');

------------------------------------------------------------------------------------------------------------
-- 5. TABLE data.factoid_class_digital_rel (including *_vt)
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.factoid_class_digital_rel
  (
    fk_digital INTEGER NOT NULL REFERENCES data.digital (pk_entity),
    fk_class INTEGER NOT NULL REFERENCES data_for_history.class (dfh_pk_class)
  )
  INHERITS (data.entity);
  
  SELECT commons.init_entity_child_table('data.factoid_class_digital_rel');

  
------------------------------------------------------------------------------------------------------------
-- 6. TABLE data.value_association_columns_rel (including *_vt)
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.value_association_columns_rel
  (
    fk_property INTEGER NOT NULL REFERENCES data_for_history.property (dfh_pk_property),
    fk_domain_column INTEGER NOT NULL REFERENCES data.column (pk_entity),
    fk_range_column INTEGER NOT NULL REFERENCES data.column (pk_entity),
    fk_factoid_class_digital_rel INTEGER NOT NULL REFERENCES data.factoid_class_digital_rel (pk_entity)
  )
  INHERITS (data.entity);
  
  SELECT commons.init_entity_child_table('data.value_association_columns_rel');



------------------------------------------------------------------------------------------------------------
-- 7. TABLE data.class_column_rel (including *_vt)
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.class_column_rel
  (
    fk_class INTEGER NOT NULL REFERENCES data_for_history.class (dfh_pk_class),
    fk_column INTEGER NOT NULL REFERENCES data.column (pk_entity)
  )
  INHERITS (data.entity);
  
  SELECT commons.init_entity_child_table('data.class_column_rel');


------------------------------------------------------------------------------------------------------------
-- 8. TABLE data.factoid_property_column_rel (including *_vt)
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.factoid_property_column_rel
  (
    fk_property INTEGER NOT NULL REFERENCES data_for_history.property (dfh_pk_property),
    fk_column INTEGER NOT NULL REFERENCES data.column (pk_entity),
    fk_factoid_class_digital_rel INTEGER NOT NULL REFERENCES data.factoid_class_digital_rel (pk_entity)
  )
  INHERITS (data.entity);
  
  SELECT commons.init_entity_child_table('data.factoid_property_column_rel');


------------------------------------------------------------------------------------------------------------
-- 9. TABLE data.factoid (including *_vt)
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.factoid
  (
    fk_class INTEGER NOT NULL REFERENCES data_for_history.class (dfh_pk_class)
  )
  INHERITS (data.entity);
  
  SELECT commons.init_entity_child_table('data.factoid');

  
------------------------------------------------------------------------------------------------------------
-- 10. TABLE data.factoid_role (including *_vt)
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.factoid_role
  (
    fk_property INTEGER NOT NULL REFERENCES data_for_history.property (dfh_pk_property),
    fk_domain_factoid INTEGER NOT NULL REFERENCES data.factoid (pk_entity),
    fk_range_cell INTEGER REFERENCES data.cell (pk_entity),
    fk_range_chunk INTEGER REFERENCES data.chunk (pk_entity)
  )
  INHERITS (data.entity);
  
  SELECT commons.init_entity_child_table('data.factoid_role');


------------------------------------------------------------------------------------------------------------
-- 11. TABLE data.values_association (including *_vt)
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.values_association
  (
    fk_property INTEGER NOT NULL REFERENCES data_for_history.property (dfh_pk_property),
    fk_domain_cell INTEGER REFERENCES data.cell (pk_entity),
    fk_range_cell INTEGER REFERENCES data.cell (pk_entity),
    fk_domain_chunk INTEGER REFERENCES data.chunk (pk_entity),
    fk_range_chunk INTEGER REFERENCES data.chunk (pk_entity)
  )
  INHERITS (data.entity);
  
  SELECT commons.init_entity_child_table('data.values_association');

------------------------------------------------------------------------------------------------------------
-- 12. TABLE data.data_info_association (including *_vt)
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.data_info_association
  (
    fk_property INTEGER NOT NULL REFERENCES data_for_history.property (dfh_pk_property),
    fk_data_domain INTEGER, -- REFERENCES data.entity (pk_entity), -- Not possible to reference parent
    fk_data_range INTEGER, -- REFERENCES data.entity (pk_entity),
    fk_info_domain INTEGER, -- REFERENCES information.entity (pk_entity)
    fk_info_range INTEGER -- REFERENCES information.entity (pk_entity)
  )
  INHERITS (data.entity);
  
  SELECT commons.init_entity_child_table('data.data_info_association');

------------------------------------------------------------------------------------------------------------
-- 13. TABLE data.avatar (including *_vt)
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.avatar
  (
    fk_class INTEGER NOT NULL REFERENCES data_for_history.class (dfh_pk_class)
  )
  INHERITS (data.entity);
  
  SELECT commons.init_entity_child_table('data.avatar');


------------------------------------------------------------------------------------------------------------
-- 14. TABLE data.text_property (including *_vt)
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.text_property
  (
    fk_system_type INTEGER NOT NULL REFERENCES system.system_type (pk_entity),
    fk_language INTEGER NOT NULL REFERENCES information.language (pk_entity)
  )
  INHERITS (data.entity);
  
  SELECT commons.init_entity_child_table('data.text_property');
  SELECT commons.make_versioned_table_child_of_text('data.text_property');

------------------------------------------------------------------------------------------------------------
-- 15. TABLE data.namespace (including *_vt)
------------------------------------------------------------------------------------------------------------

  CREATE TABLE data.namespace
  (
    fk_root_namespace INTEGER,
    fk_project INTEGER REFERENCES projects.project (pk_entity),
    standard_label TEXT
  )
  INHERITS (data.entity);
  
  SELECT commons.init_entity_child_table('data.namespace');

ALTER TABLE data.namespace ADD FOREIGN KEY (fk_root_namespace) REFERENCES data.namespace (pk_entity);
ALTER TABLE data.entity ADD FOREIGN KEY (fk_namespace) REFERENCES data.namespace (pk_entity);