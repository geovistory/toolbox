-- 1 DROP triggers of warehouse.entity_preview
DROP TRIGGER after_update_on_entity_preview__entity_label ON warehouse.entity_preview;

DROP TRIGGER after_update_on_entity_preview__fk_entity_label ON warehouse.entity_preview;

DROP TRIGGER after_update_on_entity_preview__fk_type ON warehouse.entity_preview;

DROP TRIGGER after_update_on_entity_preview__own_full_text ON warehouse.entity_preview;

DROP TRIGGER before_update_on_entity_preview__own_full_text_or_related_full_ ON warehouse.entity_preview;


-- 2 DROP warehouse trigger functions
DROP FUNCTION warehouse.entity_preview__update_dependent_entity_labels();

DROP FUNCTION warehouse.entity_preview__get_entity_label();

DROP FUNCTION warehouse.entity_preview__get_type_label();

DROP FUNCTION warehouse.entity_preview__update_dependent_related_full_texts();

DROP FUNCTION warehouse.entity_preview__concat_full_text();


-- 3 DROP warehouse functions
DROP FUNCTION warehouse.entity_preview__create(integer, integer);

DROP FUNCTION warehouse.entity_preview__create_fk_entity_label(integer, integer);

DROP FUNCTION warehouse.entity_preview__create_fk_type(integer, integer);

DROP FUNCTION warehouse.entity_preview__create_related_full_texts(integer, integer);

DROP FUNCTION warehouse.entity_preview__fill_dependent_class_labels(integer, text);

DROP FUNCTION warehouse.entity_preview__fill_dependent_entity_labels(integer, integer);

DROP FUNCTION warehouse.entity_preview__fill_dependent_related_full_texts(integer, integer);

DROP FUNCTION warehouse.entity_preview__fill_dependent_type_labels(integer, integer);

DROP FUNCTION warehouse.entity_preview__fill_own_entity_label(integer, integer);

DROP FUNCTION warehouse.entity_preview__fill_own_full_text(integer, integer);

DROP FUNCTION warehouse.entity_preview__fill_time_span(integer, integer);


-- 4 DROP warehouse views
DROP VIEW warehouse.v_entity_preview;

DROP VIEW warehouse.v_entity_preview_non_recursive;

DROP VIEW warehouse.v_entities;

DROP VIEW warehouse.v_fk_type;

DROP VIEW warehouse.v_fk_entity_label;

DROP VIEW warehouse.v_own_entity_label;

DROP VIEW warehouse.v_own_full_text;

DROP VIEW warehouse.v_related_full_texts;

DROP VIEW warehouse.v_te_en_time_span_per_project_and_repo;

DROP VIEW warehouse.v_text_properties_per_project_and_repo;
