-- 1 disable triggers for timestamps and versionsioning (to keep history clean)
Drop Trigger last_modification_tmsp On projects.info_proj_rel;

Drop Trigger on_upsert On projects.info_proj_rel;

Drop Trigger update_entity_version_key On projects.info_proj_rel;

Drop Trigger versioning_trigger On projects.info_proj_rel;

-- 2 update data
Update
    projects.info_proj_rel_vt t1
Set
    fk_entity = t2.pk_entity
From
    information.role t2
Where
    t1.fk_entity = (t2.metadata ->> 'from_entity_association')::integer
Returning
    *;

Update
    projects.info_proj_rel t1
Set
    fk_entity = t2.pk_entity
From
    information.role t2
Where
    t1.fk_entity = (t2.metadata ->> 'from_entity_association')::integer
Returning
    *;

-- 3 add triggers again
Create Trigger last_modification_tmsp
    Before Insert Or Update On projects.info_proj_rel For Each Row
    Execute Procedure commons.tmsp_last_modification ();

Create Trigger on_upsert
    Before Insert Or Update On projects.info_proj_rel For Each Row
    Execute Procedure commons.evpr_fk_entity_fk_entity_version ();

Create Trigger update_entity_version_key
    Before Update On projects.info_proj_rel For Each Row
    Execute Procedure commons.update_entity_version_key ();

Create Trigger versioning_trigger
    Before Insert Or Delete Or Update On projects.info_proj_rel For Each Row
    Execute Procedure public.versioning ('sys_period', 'projects.info_proj_rel_vt', 'true');

