
CREATE OR REPLACE VIEW warehouse.v_entity_preview_non_recursive AS
 SELECT  DISTINCT ON ( t1.pk_entity, t1.fk_project)
    t1.pk_entity,
    t1.fk_project,
    t1.project,
    t1.fk_class,
    t1.table_name,
    t1.entity_type,
    t2.class_label,
    t3.entity_label,
    t4.time_span,
    t5.own_full_text,
    t6.fk_entity_label,
    t7.fk_type,
    t8.related_full_texts
   FROM warehouse.v_entities t1
     LEFT JOIN warehouse.class_preview t2 ON t2.dfh_pk_class = t1.fk_class
     LEFT JOIN warehouse.v_own_entity_label t3 ON t1.pk_entity = t3.pk_entity AND NOT t1.fk_project IS DISTINCT FROM t3.fk_project
     LEFT JOIN warehouse.v_te_en_time_span_per_project_and_repo t4 ON t1.pk_entity = t4.fk_temporal_entity AND NOT t1.fk_project IS DISTINCT FROM t4.fk_project
     LEFT JOIN warehouse.v_own_full_text t5 ON t1.pk_entity = t5.pk_entity AND NOT t1.fk_project IS DISTINCT FROM t5.fk_project
     LEFT JOIN warehouse.v_fk_entity_label t6 ON t1.pk_entity = t6.pk_entity AND NOT t1.fk_project IS DISTINCT FROM t6.fk_project
     LEFT JOIN warehouse.v_fk_type t7 ON t1.pk_entity = t7.pk_entity AND NOT t1.fk_project IS DISTINCT FROM t7.fk_project
     LEFT JOIN warehouse.v_related_full_texts t8 ON t1.pk_entity = t8.pk_entity AND NOT t1.fk_project IS DISTINCT FROM t8.fk_project;
