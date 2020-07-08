-- 4
DROP TRIGGER on_insert ON information.v_property_of_property;

-- 3
DROP FUNCTION information.v_property_of_property_find_or_create();

-- 2
DROP VIEW information.v_property_of_property;

-- 1
DROP TABLE IF EXISTS information.property_of_property;
DROP TABLE IF EXISTS information.property_of_property_vt;