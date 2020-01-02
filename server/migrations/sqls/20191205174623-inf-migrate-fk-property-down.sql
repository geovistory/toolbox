-- 3
Update
    information.role t1
Set
    fk_property = t2.fk_property
From
    information._backup_role t2
Where
    t1.pk_entity = t2.pk_entity
    And t1.fk_property != t2.fk_property;

-- 2
Alter Table information.role
    Add Constraint role_fk_property_fkey Foreign Key (fk_property) References data_for_history.property (dfh_pk_property) Match SIMPLE On
    Update
        No ACTION On Delete No ACTION;

-- 1
Drop Table information._backup_role;

