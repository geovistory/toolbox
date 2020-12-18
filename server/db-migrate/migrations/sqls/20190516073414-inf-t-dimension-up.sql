-- 1
CREATE TABLE information.dimension (
    fk_class INTEGER NOT NULL REFERENCES data_for_history.class (dfh_pk_class),
    fk_measurement_unit INTEGER NOT NULL REFERENCES information.persistent_item (pk_entity),
    numeric_value NUMERIC NOT NULL
) 
INHERITS (
    information.entity
);

SELECT
    commons.init_entity_child_table ('information.dimension');

DROP TRIGGER create_entity_version_key ON information.dimension;
DROP TRIGGER update_entity_version_key ON information.dimension;

-- 2
CREATE VIEW information.v_dimension AS 
SELECT * FROM information.dimension;
