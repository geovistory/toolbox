'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  const sql = `

      INSERT INTO commons.class_field (label, description)
      VALUES 
      ('Short Title', 'Short Title for a class instance (without time information.)'),
      ('Exact Reference', 'Exact reference for a F2 Expression (e.g Page "2").)'),
      ('Entity Definition', 'Entity Definition. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.');

      DELETE FROM information.text_property WHERE fk_system_type = 179;

      ALTER TABLE information.text_property
      ADD COLUMN fk_class_field INTEGER REFERENCES commons.class_field (pk_entity);

      ALTER TABLE information.text_property_vt
      ADD COLUMN fk_class_field INTEGER;

      ALTER TABLE information.text_property
      DROP CONSTRAINT IF EXISTS text_property_fk_system_type_constraint;

      ALTER TABLE information.text_property
      DROP CONSTRAINT IF EXISTS text_property_fk_system_type_fkey;

      ALTER TABLE information.text_property DROP CONSTRAINT text_property_identity_unique;
      
      DROP VIEW information.v_text_property;

      DROP FUNCTION information.v_text_property_find_or_create();

      ALTER TABLE information.text_property
      DROP COLUMN fk_system_type;

      ALTER TABLE information.text_property
      ADD CONSTRAINT text_property_identity_unique UNIQUE (fk_class_field, fk_language, fk_concerned_entity, text_property_quill_doc);

      ALTER TABLE information.text_property_vt
      DROP COLUMN fk_system_type;

      DELETE FROM commons.system_type WHERE notes = 'Entity Definition Text Property. Given that in many cases appellations are not sufficient for an unambiguous identification of resources, these text properties provide definitions in text form.';


      CREATE OR REPLACE VIEW information.v_text_property AS
      SELECT * FROM information.text_property;

        CREATE FUNCTION information.v_text_property_find_or_create()
            RETURNS trigger
            LANGUAGE 'plpgsql'
            COST 100
            VOLATILE NOT LEAKPROOF 
        AS $BODY$

            DECLARE
              resulting_pk integer;
              resulting_row information.v_text_property;
            BEGIN

              -- RAISE INFO 'input values: %', NEW;
                
              ------ if existing, store in result -----
              SELECT pk_entity FROM INTO resulting_pk information.text_property
                WHERE              
                    text_property_quill_doc::jsonb = NEW.text_property_quill_doc::jsonb
                    AND fk_class_field = NEW.fk_class_field
                    AND fk_concerned_entity = NEW.fk_concerned_entity
                    AND fk_language = NEW.fk_language;

                    -- RAISE INFO 'result of select: %', resulting_pk;

              ------- if not existing, insert and store in result -----
                IF NOT FOUND THEN
                  
                      -- RAISE INFO 'Not found, creating new...';
                
                    WITH _insert AS (
                        INSERT INTO information.text_property (
                          text_property_quill_doc, 
                          fk_class_field,
                          fk_concerned_entity,
                          fk_language
                        ) 
                        VALUES (
                          NEW.text_property_quill_doc::jsonb, 
                          NEW.fk_class_field,
                          NEW.fk_concerned_entity,
                          NEW.fk_language
                        )
                        -- return all fields of the new row
                        RETURNING *
                        ) 
                    SELECT pk_entity FROM INTO resulting_pk _insert;
                
                      -- RAISE INFO 'result of insert: %', resulting_pk;
              END IF;

            SELECT * FROM INTO resulting_row information.v_text_property
            WHERE pk_entity = resulting_pk;

            RETURN resulting_row;
              END;
              
        $BODY$;



      CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_text_property
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_text_property_find_or_create();
      `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `

      ALTER TABLE information.text_property
      ADD COLUMN fk_system_type INTEGER REFERENCES commons.system_type (pk_entity);

      ALTER TABLE information.text_property_vt
      ADD COLUMN fk_system_type INTEGER;

      ALTER TABLE information.text_property
      DROP CONSTRAINT text_property_fk_class_field_fkey;

      ALTER TABLE information.text_property DROP CONSTRAINT text_property_identity_unique;
      
      DROP VIEW information.v_text_property;

      DROP FUNCTION information.v_text_property_find_or_create();

      ALTER TABLE information.text_property
      DROP COLUMN fk_class_field;

      ALTER TABLE information.text_property
      ADD CONSTRAINT text_property_identity_unique UNIQUE (fk_system_type, fk_language, fk_concerned_entity, text_property_quill_doc);

      ALTER TABLE information.text_property_vt
      DROP COLUMN fk_class_field;

      CREATE OR REPLACE VIEW information.v_text_property AS
      SELECT * FROM information.text_property;

        CREATE FUNCTION information.v_text_property_find_or_create()
            RETURNS trigger
            LANGUAGE 'plpgsql'
            COST 100
            VOLATILE NOT LEAKPROOF 
        AS $BODY$

            DECLARE
              resulting_pk integer;
              resulting_row information.v_text_property;
            BEGIN

              -- RAISE INFO 'input values: %', NEW;
                
              ------ if existing, store in result -----
              SELECT pk_entity FROM INTO resulting_pk information.text_property
                WHERE              
                    text_property_quill_doc::jsonb = NEW.text_property_quill_doc::jsonb
                    AND fk_system_type = NEW.fk_system_type
                    AND fk_concerned_entity = NEW.fk_concerned_entity
                    AND fk_language = NEW.fk_language;

                    -- RAISE INFO 'result of select: %', resulting_pk;

              ------- if not existing, insert and store in result -----
                IF NOT FOUND THEN
                  
                      -- RAISE INFO 'Not found, creating new...';
                
                    WITH _insert AS (
                        INSERT INTO information.text_property (
                          text_property_quill_doc, 
                          fk_system_type,
                          fk_concerned_entity,
                          fk_language
                        ) 
                        VALUES (
                          NEW.text_property_quill_doc::jsonb, 
                          NEW.fk_system_type,
                          NEW.fk_concerned_entity,
                          NEW.fk_language
                        )
                        -- return all fields of the new row
                        RETURNING *
                        ) 
                    SELECT pk_entity FROM INTO resulting_pk _insert;
                
                      -- RAISE INFO 'result of insert: %', resulting_pk;
              END IF;

            SELECT * FROM INTO resulting_row information.v_text_property
            WHERE pk_entity = resulting_pk;

            RETURN resulting_row;
              END;
              
        $BODY$;



      CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_text_property
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_text_property_find_or_create();

  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
