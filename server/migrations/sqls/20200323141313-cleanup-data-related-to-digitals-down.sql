-- 3 and 2
-- no way back
-- 1

Alter Table data.digital DISABLE Trigger versioning_trigger;

Update
    data.digital
Set
    fk_system_type = Null
Where
    fk_system_type = 3286;

Alter Table data.digital ENABLE Trigger versioning_trigger;

