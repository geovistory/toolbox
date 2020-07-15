-- Adds existence time property set to all te-ents for PK_UI_CONTEXT_DATAUNITS_EDITABLE 
Insert Into projects.class_field_config ( fk_app_context, fk_class_for_class_field, fk_class_field)
    (
    Select Distinct 45, dfh_pk_class, 48 from data_for_history.class as c
    inner join data_for_history.class_profile_view cpv on c.dfh_pk_class = cpv.dfh_fk_class
    left join projects.class_field_config ctxt on ctxt.fk_class_for_class_field = cpv.dfh_fk_class
    Where dfh_fk_system_type = 9 -- te ent
          AND ctxt.fk_app_context != 45
    );
    
-- Adds existence time property set to all te-ents for PK_UI_CONTEXT_DATAUNITS_CREATE
Insert Into projects.class_field_config ( fk_app_context, fk_class_for_class_field, fk_class_field)
    (
    Select Distinct 46, dfh_pk_class, 48 from data_for_history.class as c
    inner join data_for_history.class_profile_view cpv on c.dfh_pk_class = cpv.dfh_fk_class
    left join projects.class_field_config ctxt on ctxt.fk_class_for_class_field = cpv.dfh_fk_class
    Where dfh_fk_system_type = 9 -- te ent
      AND ctxt.fk_app_context != 46
    )    
    
-- Adds existence time property set to all te-ents for PK_UI_CONTEXT_ADD
Insert Into projects.class_field_config ( fk_app_context, fk_class_for_class_field, fk_class_field)
    (
    Select Distinct 47, dfh_pk_class, 48 from data_for_history.class as c
    inner join data_for_history.class_profile_view cpv on c.dfh_pk_class = cpv.dfh_fk_class
    left join projects.class_field_config ctxt on ctxt.fk_class_for_class_field = cpv.dfh_fk_class
    Where dfh_fk_system_type = 9 -- te ent
      AND ctxt.fk_app_context != 47
    )    
    

