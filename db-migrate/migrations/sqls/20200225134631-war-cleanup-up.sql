-- 1
Drop Function war.nodes__create_all ();

-- 2
Drop Function war.nodes__create_some (integer[], integer);

-- 3
Drop Function war.nodes__upsert_some (integer[], integer);

-- 4
Drop Function war.nodes__delete_some (integer[], integer);

-- 5
Drop Function war.edges__delete_some (integer[], integer);

-- 6
Select
    war.warehouse_update_all ();

