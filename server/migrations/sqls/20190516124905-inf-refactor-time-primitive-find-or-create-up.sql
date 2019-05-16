CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_time_primitive
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_time_primitive_find_or_create();

