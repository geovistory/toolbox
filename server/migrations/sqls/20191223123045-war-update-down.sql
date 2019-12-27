-- 3
Drop Trigger after_api_class_upsert On data_for_history.api_class;

Drop Trigger after_update_or_insert_of_class_label On projects.text_property;

-- 2
Drop Trigger after_epr_upsert On projects.info_proj_rel;

Create Trigger after_epr_upsert
    After Insert
    Or Update On projects.info_proj_rel For Each STATEMENT
    Execute Procedure warehouse.after_info_proj_rel_upsert ();

-- 1
-- DROP SCHEMA war
