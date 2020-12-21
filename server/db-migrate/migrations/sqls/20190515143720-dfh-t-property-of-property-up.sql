CREATE TABLE data_for_history.property_of_property (
    dfh_pk_property_of_property integer NOT NULL,
    dfh_identifier_in_namespace text,
    dfh_has_property_domain integer,
    dfh_has_class_range integer,
    dfh_creation_time timestamp without time zone,
    dfh_modification_time timestamp without time zone,
    dfh_standard_label character varying (500),
    dfh_domain_instances_min_quantifier smallint,
    dfh_domain_instances_max_quantifier smallint,
    dfh_range_instances_min_quantifier smallint,
    dfh_range_instances_max_quantifier smallint,
    dfh_fk_property_of_property_of_origin integer,
    CONSTRAINT unique_dfh_pk_property_of_property UNIQUE (dfh_pk_property_of_property))
INHERITS (
    data_for_history.entity
);

SELECT
    commons.init_entity_child_table ('data_for_history.property_of_property');

