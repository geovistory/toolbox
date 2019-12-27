-- 1
-- Paste the war schema here
-- 2

Drop Trigger after_epr_upsert On projects.info_proj_rel;

Create Trigger after_epr_upsert
    After Insert
    Or Update On projects.info_proj_rel For Each STATEMENT
    Execute Procedure war.after_info_proj_rel_upsert ();

-- 3 Triggers for notifying need for updating class labels
Create Trigger after_api_class_upsert
    After Insert
    Or Update On data_for_history.api_class For Each STATEMENT
    Execute Procedure war.notify__need_to_check_class_labels ();

Create Trigger after_update_or_insert_of_class_label
    After Insert
    Or Update On projects.text_property For Each Row
    When (new.fk_dfh_class Is Not Null)
    Execute Procedure war.notify__need_to_check_class_labels ();

