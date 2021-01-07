/* Replace with your SQL commands */-- factoid_property_mapping
DROP TRIGGER versioning_trigger ON data.factoid_property_mapping ;
CREATE TRIGGER versioning_trigger 
    BEFORE INSERT OR DELETE OR UPDATE
    ON data.factoid_property_mapping 
    FOR EACH ROW
    EXECUTE PROCEDURE versioning('sys_period', 'data.factoid_role_mapping_vt', 'true');