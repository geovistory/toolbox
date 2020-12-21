-- 2
Update
    projects.info_proj_rel_vt t1
Set
    fk_entity = (t2.metadata ->> 'from_entity_association')::integer
From
    information.role t2
Where
    t2.metadata ->> 'from_entity_association' Is Not Null
    And t1.fk_entity = t2.pk_entity
Returning
    *;

Update
    projects.info_proj_rel t1
Set
    fk_entity = (t2.metadata ->> 'from_entity_association')::integer
From
    information.role t2
Where
    t2.metadata ->> 'from_entity_association' Is Not Null
    And t1.fk_entity = t2.pk_entity
Returning
    *;

