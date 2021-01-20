DROP FUNCTION war.enriched_nodes__create_all ();

DROP FUNCTION war.enriched_nodes__create_some (integer[], integer);

DROP FUNCTION war.enriched_nodes__enrich ();
DROP FUNCTION war.enriched_nodes__enrich_entity_label();
 DROP FUNCTION war.enriched_nodes__enrich_full_text();
 DROP FUNCTION war.enriched_nodes__enrich_some(war.node_id[]);
DROP FUNCTION war.enriched_nodes__enrich_type_label();
DROP FUNCTION war.enriched_nodes__upsert_some(integer[], integer);
DROP TABLE war.enriched_node;

