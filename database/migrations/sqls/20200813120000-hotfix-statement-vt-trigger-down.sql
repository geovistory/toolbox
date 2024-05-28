/* Replace with your SQL commands */
/* Replace with your SQL commands */
DROP TRIGGER  versioning_trigger ON information.statement;

CREATE TRIGGER versioning_trigger
    BEFORE INSERT OR DELETE OR UPDATE 
    ON information.statement
    FOR EACH ROW
    EXECUTE PROCEDURE public.versioning('sys_period', 'information.role_vt', 'true');