-- 3
Drop Trigger creation_tmsp On information.role;

Drop Trigger last_modification_tmsp On information.role;

-- 2
Delete From information.role
Where metadata ->> 'from_entity_association' Is Not Null;

-- 1
Create Trigger creation_tmsp
    Before Insert On information.role For Each Row
    Execute Procedure commons.tmsp_creation ();

Create Trigger last_modification_tmsp
    Before Insert Or Update On information.role For Each Row
    Execute Procedure commons.tmsp_last_modification ();

