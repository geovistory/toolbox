-- Adds existence time property set to all te-ents
Insert Into commons.property_set_class_rel (fk_class, fk_property_set)
    (
    Select Distinct dfh_pk_class, 110 from data_for_history.class as c
    inner join data_for_history.class_profile_view cpv on c.dfh_pk_class = cpv.dfh_fk_class
    left join commons.property_set_class_rel psr on psr.fk_class = cpv.dfh_fk_class
    Where dfh_fk_system_type = 9 -- te ent
	And psr.pk_entity is null
    )
    