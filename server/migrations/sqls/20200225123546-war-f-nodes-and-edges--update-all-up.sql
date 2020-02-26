Create Or Replace Function war.nodes_and_edges__update_all ()
    Returns void
    Language 'sql'
    Cost 100 Volatile
    As $BODY$
    Truncate war.edge;

Insert Into war.edge
Select
    *
From
    war.edges__create_all ();

Truncate war.enriched_node;

Insert Into war.enriched_node
Select
    *
From
    war.enriched_nodes__create_all ();

$BODY$;

