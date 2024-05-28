-- 1
DROP FUNCTION war.entity_preview__add_missing ();

-- 2
DROP FUNCTION war.entity_preview__remove_superfluous ();

-- 3
DROP FUNCTION war.entity_preview__update_modified ();

-- 4
DROP FUNCTION war.entity_preview__update_all ();

-- 5
DROP FUNCTION war.entity_preview__update_class_labels ();

-- 6
DROP FUNCTION war.nodes_and_edges__update_all ();

-- 7
DROP FUNCTION war.updater ();

-- 8
DROP FUNCTION war.warehouse_update_all ();

-- 9
DROP FUNCTION war.do_updates_for_difference_since(timestamp without time zone);
