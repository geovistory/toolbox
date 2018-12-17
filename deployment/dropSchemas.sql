
--SET search_path = _global, pg_catalog;

CREATE OR REPLACE FUNCTION drop_all () 
   RETURNS VOID  AS
   $$
   DECLARE rec RECORD; 
   BEGIN
       -- Get all the schemas
        FOR rec IN
        select schema_name
        from information_schema.schemata

         -- You can exclude the schema which you don't want to drop by adding another condition here
         where schema_name !~* 'information_schema|pg_catalog' 
           LOOP
             EXECUTE 'DROP SCHEMA ' || rec.schema_name || ' CASCADE'; 
           END LOOP; 
           RETURN; 
   END;
   $$ LANGUAGE plpgsql;

select drop_all();