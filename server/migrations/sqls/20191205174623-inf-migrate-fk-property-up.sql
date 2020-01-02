-- 1
Create Table information._backup_role As
Select
    *
From
    information.role;

-- 2
Alter Table information.role
    Drop Constraint role_fk_property_fkey;

-- 3
With tw1 As (
    Select
        t1.pk_entity,
        t1.fk_property,
        t2.fk_property As new_fk_property
    From
        information.role t1,
        data_for_history.v_property t2
    Where
        t1.fk_property = t2.dfh_pk_property
        And t2.fk_property != t1.fk_property
    Order By
        t1.fk_property Desc)
Update
    information.role t1
Set
    fk_property = t2.new_fk_property
From
    tw1 t2
Where
    t1.pk_entity = t2.pk_entity;

