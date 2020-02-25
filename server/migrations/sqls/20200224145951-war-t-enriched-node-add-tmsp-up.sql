Alter Table war.enriched_node
    Add Column tmsp_last_modification timestamp With time zone;

Create Trigger last_modification_tmsp
    Before Insert Or Update On war.enriched_node
    For Each Row
    Execute Procedure commons.tmsp_last_modification ();

