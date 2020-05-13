-- 1
CREATE VIEW system.v_has_type_preview AS (
  SELECT
    ctp.pk_entity,
    cpre1.dfh_pk_class AS pk_typed_class,
    cpre1.class_label AS typed_class_label,
    p.dfh_pk_property,
    concat_ws(': ', p.dfh_identifier_in_namespace, p.dfh_standard_label) property_label,
    cpre2.dfh_pk_class AS pk_type_class,
    cpre2.class_label AS type_class_label
  FROM
    system.class_has_type_property ctp
    JOIN data_for_history.property p ON p.dfh_pk_property = ctp.fk_property
    JOIN information.v_class_preview cpre1 ON cpre1.dfh_pk_class = ctp.fk_class
    JOIN information.v_class_preview cpre2 ON cpre2.dfh_pk_class = p.dfh_has_range)
