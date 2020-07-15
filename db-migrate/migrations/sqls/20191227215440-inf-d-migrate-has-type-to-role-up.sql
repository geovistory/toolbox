-- create all the hasType roles, with former pk_entity of entity_association in notes
Insert Into information.role (fk_property, fk_temporal_entity, fk_entity, notes)
Select
    t1.fk_property,
    t1.fk_info_domain,
    t1.fk_info_range,
    t1.pk_entity::text
From
    information.entity_association t1,
    system.class_has_type_property t2
Where
    t1.fk_property = t2.fk_property;

-- update all the info_proj_rels to point to new role
Update
    projects.info_proj_rel t0
Set
    fk_entity = t1.pk_entity
From
    information.role t1,
    system.class_has_type_property t2
Where
    t0.fk_entity = t1.notes::int
    And t1.fk_property = t2.fk_property;

-- delete the entity_associations
Delete From information.entity_association
Where pk_entity In (
        Select
            t1.pk_entity
        From
            information.entity_association t1,
            system.class_has_type_property t2
        Where
            t1.fk_property = t2.fk_property)
