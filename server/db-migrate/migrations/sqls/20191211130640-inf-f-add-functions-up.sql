-- 1
Create Or Replace View system.v_auto_add_properties As
Select
    p.dfh_has_domain As fk_class,
    p.fk_property dfh_pk_property,
    p.dfh_range_instances_max_quantifier As max_quantifier
From
    data_for_history.v_property p
    Join projects.class_field_config ctxt On p.fk_property = ctxt.fk_property
Where
    ctxt.fk_app_context = 45
    And ctxt.ord_num Is Not Null
    And ctxt.property_is_outgoing = True
Union
Select
    p.dfh_has_range As fk_class,
    p.fk_property dfh_pk_property,
    p.dfh_domain_instances_max_quantifier As max_quantifier
From
    data_for_history.v_property p
    Join projects.class_field_config ctxt On p.fk_property = ctxt.fk_property
Where
    ctxt.fk_app_context = 45
    And ctxt.ord_num Is Not Null
    And ctxt.property_is_outgoing = False
Union
Select
    ctxt.fk_class_for_class_field As fk_class,
    psprel.fk_property As dfh_pk_property,
    p.dfh_domain_instances_max_quantifier As max_quantifier
From
    data_for_history.v_property p
    Join system.class_field_property_rel psprel On psprel.fk_property = p.fk_property
    Join projects.class_field_config ctxt On psprel.fk_class_field = ctxt.fk_class_field
Where
    ctxt.fk_app_context = 45
    And ctxt.ord_num Is Not Null
    And psprel.property_is_outgoing = False
Union
Select
    ctxt.fk_class_for_class_field As fk_class,
    psprel.fk_property As dfh_pk_property,
    p.dfh_range_instances_max_quantifier As max_quantifier
From
    data_for_history.v_property p
    Join system.class_field_property_rel psprel On psprel.fk_property = p.fk_property
    Join projects.class_field_config ctxt On psprel.fk_class_field = ctxt.fk_class_field
Where
    ctxt.fk_app_context = 45
    And ctxt.ord_num Is Not Null
    And psprel.property_is_outgoing = True;

