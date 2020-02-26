Drop Trigger last_modification_tmsp On war.enriched_node;

Alter Table war.enriched_node
    Drop Column tmsp_last_modification;

