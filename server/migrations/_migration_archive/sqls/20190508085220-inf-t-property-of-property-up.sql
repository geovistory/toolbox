------------------------------------------------------------------------------------------------------------
-- 1. TABLE information.property_of_property (including *_vt)
------------------------------------------------------------------------------------------------------------
  CREATE TABLE information.property_of_property
  (
    fk_property INTEGER REFERENCES data_for_history.property (dfh_pk_property),
    provisional_property varchar,
    fk_role INTEGER REFERENCES information.role (pk_entity),
    fk_entity_association INTEGER REFERENCES information.entity_association (pk_entity),
    fk_range_entity INTEGER NOT NULL,
    entity_version INTEGER
  )
  INHERITS (information.entity);
  
  SELECT commons.init_entity_child_table('information.property_of_property');


------------------------------------------------------------------------------------------------------------
-- 2. VIEW information.v_property_of_property
------------------------------------------------------------------------------------------------------------
CREATE VIEW information.v_property_of_property AS
 SELECT * FROM information.property_of_property;


------------------------------------------------------------------------------------------------------------
-- 3. FUNCTION information.v_property_of_property_find_or_create
------------------------------------------------------------------------------------------------------------
CREATE FUNCTION information.v_property_of_property_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$
    DECLARE
      resulting_pk integer;
      resulting_row information.v_property_of_property;
    BEGIN

       RAISE INFO ' input values
       NEW.fk_property: %,
       NEW.provisional_property: %
       NEW.fk_role: %
       NEW.fk_entity_association: %
       NEW.fk_range_entity: %
       ', 
        NEW.fk_property,
        NEW.provisional_property,
        NEW.fk_role,
        NEW.fk_entity_association,
        NEW.fk_range_entity;
        
      ------ if existing, store in result -----
      SELECT pk_entity FROM INTO resulting_pk information.property_of_property
        WHERE fk_property IS NOT DISTINCT FROM NEW.fk_property
        AND provisional_property IS NOT DISTINCT FROM NEW.provisional_property
        AND fk_role IS NOT DISTINCT FROM NEW.fk_role
        AND fk_entity_association IS NOT DISTINCT FROM NEW.fk_entity_association
        AND fk_range_entity IS NOT DISTINCT FROM NEW.fk_range_entity;

        RAISE INFO 'resulting_pk: %', resulting_pk;


      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
            RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.property_of_property (
                    fk_property, 
                    provisional_property,
                    fk_role,
                    fk_entity_association,
                    fk_range_entity
                ) 
                VALUES (
                    NEW.fk_property, 
                    NEW.provisional_property,
                    NEW.fk_role,
                    NEW.fk_entity_association,
                    NEW.fk_range_entity
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT pk_entity FROM INTO resulting_pk _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

      SELECT * FROM INTO resulting_row information.v_property_of_property
      WHERE pk_entity = resulting_pk;

    RETURN resulting_row;
      END;
      $BODY$;

------------------------------------------------------------------------------------------------------------
-- 4. TRIGGER  v_property_of_property on_insert
------------------------------------------------------------------------------------------------------------
CREATE TRIGGER on_insert
    INSTEAD OF INSERT
    ON information.v_property_of_property
    FOR EACH ROW
    EXECUTE PROCEDURE information.v_property_of_property_find_or_create();
