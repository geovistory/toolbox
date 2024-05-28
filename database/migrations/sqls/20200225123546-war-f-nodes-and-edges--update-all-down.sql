Create Or Replace Function war.nodes_and_edges__update_all ()
    Returns void
    Language 'sql'
    Cost 100 Volatile
    As $BODY$
    Delete From war.node;

Delete From war.edge;

Delete From war.enriched_node;

Insert Into war.node
Select
    *
From
    war.nodes__create_all ();

Insert Into war.edge
Select
    *
From
    war.edges__create_all ();

Insert Into war.enriched_node
Select
    *
From
    war.enriched_nodes__create_all ();

$BODY$;

