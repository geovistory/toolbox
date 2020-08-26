-- 1
Create Or Replace Function commons.notify_modification_trigger ()
    Returns Trigger
    As $trigger$
Begin
    -- Notify the channel, e.g.: "modified_projects_text_property"
    Perform
        pg_notify('modified_' || TG_TABLE_SCHEMA || '_' || TG_TABLE_NAME, now()::text);
    Return NEW;
End;
$trigger$
Language plpgsql;

-- 2
Create Trigger notify_modification
    After Insert Or Update Or Delete On projects.project
    For Each STATEMENT
    Execute Procedure commons.notify_modification_trigger ();

-- 3
Create Trigger notify_modification
    After Insert Or Update Or Delete On projects.text_property
    For Each STATEMENT
    Execute Procedure commons.notify_modification_trigger ();

-- 4
Create Trigger notify_modification
    After Insert Or Update Or Delete On information.statement
    For Each STATEMENT
    Execute Procedure commons.notify_modification_trigger ();

-- 5
Create Trigger notify_modification
    After Insert Or Update Or Delete On information.persistent_item
    For Each STATEMENT
    Execute Procedure commons.notify_modification_trigger ();

-- 6
Create Trigger notify_modification
    After Insert Or Update Or Delete On information.temporal_entity
    For Each STATEMENT
    Execute Procedure commons.notify_modification_trigger ();

-- 7
Create Trigger notify_modification
    After Insert Or Update Or Delete On projects.info_proj_rel
    For Each STATEMENT
    Execute Procedure commons.notify_modification_trigger ();

-- 8
Create Trigger notify_modification
    After Insert Or Update Or Delete On data_for_history.api_class
    For Each STATEMENT
    Execute Procedure commons.notify_modification_trigger ();

-- 9
Create Trigger notify_modification
    After Insert Or Update Or Delete On projects.dfh_profile_proj_rel
    For Each STATEMENT
    Execute Procedure commons.notify_modification_trigger ();