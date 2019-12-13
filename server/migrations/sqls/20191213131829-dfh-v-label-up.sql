Create Or Replace View data_for_history.v_label As
/*
 * Language Dependent Texts from table api_profile
 */
Select Distinct On (label,
    Language)
    'label' As Type,
    t1.dfh_profile_label As label,
    t1.dfh_profile_label_language As
    Language,
    t1.dfh_pk_profile As fk_profile,
    NULL::INT As fk_project,
    NULL::INT As fk_property,
    NULL::INT As fk_class
From
    data_for_history.api_profile t1
Union
Select Distinct On (label,
    Language)
    'definition' As Type,
    t1.dfh_profile_definition As label,
    t1.dfh_profile_definition_language As
    Language,
    t1.dfh_pk_profile As dfh_fk_profile,
    NULL::INT As fk_project,
    NULL::INT As fk_property,
    NULL::INT As fk_class
From
    data_for_history.api_profile t1
Union
Select Distinct On (label,
    Language)
    'label' As Type,
    t1.dfh_project_label As label,
    t1.dfh_project_label_language As
    Language,
    NULL::INT As dfh_fk_project,
    t1.dfh_owned_by_project As fk_project,
    NULL::INT As fk_property,
    NULL::INT As fk_class
From
    data_for_history.api_profile t1
    /*
     * Language Dependent Texts from table api_property
     */
Union
Select Distinct On (label,
    Language)
    'label' As Type,
    t1.dfh_property_label As label,
    t1.dfh_property_label_language As
    Language,
    NULL::INT As dfh_fk_project,
    NULL::INT As fk_project,
    t1.dfh_pk_property As fk_property,
    NULL::INT As fk_class
From
    data_for_history.api_property t1
Union
Select Distinct On (label,
    Language)
    'scope_note' As Type,
    t1.dfh_property_scope_note As label,
    t1.dfh_property_scope_note_language As
    Language,
    NULL::INT As dfh_fk_project,
    NULL::INT As fk_project,
    t1.dfh_pk_property As fk_property,
    NULL::INT As fk_class
From
    data_for_history.api_property t1
    /*
     * Language Dependent Texts from table api_property
     */
Union
Select Distinct On (label,
    Language)
    'label' As Type,
    t1.dfh_class_label As label,
    t1.dfh_class_label_language As
    Language,
    NULL::INT As dfh_fk_project,
    NULL::INT As fk_project,
    NULL::INT As fk_property,
    t1.dfh_pk_class As fk_class
From
    data_for_history.api_class t1
Union
Select Distinct On (label,
    Language)
    'scope_note' As Type,
    t1.dfh_class_scope_note As label,
    t1.dfh_class_scope_note_language As
    Language,
    NULL::INT As dfh_fk_project,
    NULL::INT As fk_project,
    NULL::INT As fk_property,
    t1.dfh_pk_class As fk_class
From
    data_for_history.api_class t1;

