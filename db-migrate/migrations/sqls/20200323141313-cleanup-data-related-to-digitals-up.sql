-- 1
Alter Table data.digital DISABLE Trigger versioning_trigger;

Update
    data.digital
Set
    fk_system_type = 3286
Where
    fk_system_type Is Null;

Alter Table data.digital ENABLE Trigger versioning_trigger;

-- 2
-- remove inherited fk_property for 'is part of – geovP6'

Update
    information.role
Set
    fk_property = 1317
Where
    fk_property = 1328;

-- 3
-- remove inherited fk_property for 'is reproduction of – geovP1'

Update
    information.role
Set
    fk_property = 1216
Where
    fk_property = 1329;

