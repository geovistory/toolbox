-- 1
CREATE OR REPLACE FUNCTION warehouse.entity_preview_non_recursive__refresh()
returns void
AS $$

    DELETE FROM warehouse.entity_preview_non_recursive;
    INSERT INTO warehouse.entity_preview_non_recursive
    SELECT * FROM warehouse.entity_preview_non_recursive__create_all();

$$ LANGUAGE SQL;
