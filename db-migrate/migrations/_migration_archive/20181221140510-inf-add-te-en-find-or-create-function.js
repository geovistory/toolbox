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

  ------------------------------------------------------------------------------------------------------------
  -- Function to check if a teEn with identity defining roles exists
  ------------------------------------------------------------------------------------------------------------

  --DROP FUNCTION information.temporal_entity_find_or_create(integer, jsonb);
  CREATE OR REPLACE FUNCTION information.temporal_entity_find_or_create(
    param_fk_class integer,
    param_roles jsonb)
      RETURNS information.temporal_entity
      LANGUAGE 'plpgsql'
      COST 100
      VOLATILE NOT LEAKPROOF 
  AS $BODY$
  
      DECLARE
        resulting_row information.temporal_entity;
      BEGIN
  
        -- RAISE INFO 'input values: %', NEW;
          
        ------ if existing, store in result -----
      WITH existing_te_ens as (
        select fk_temporal_entity, array_agg(jsonb_build_object('fk_property',fk_property, 'fk_entity', fk_entity)) identity_defining_roles
        from information.role as r
        join data_for_history.property as p on p.dfh_pk_property = r.fk_property AND p.identity_defining = true
        group by fk_temporal_entity
      ), 
      new_te_en as (
        SELECT array_agg(a.elements::jsonb) roles															  
         FROM 
          (select 1 x, jsonb_array_elements_text(param_roles) elements) as a
        Group by a.x															   
      )
      select teEn.* 
      from INTO resulting_row existing_te_ens 
      -- Here we check if the roles for the new TeEn do completele contain all the identity defining roles of an existing TeEn
      join new_te_en on new_te_en.roles @> existing_te_ens.identity_defining_roles
      join information.temporal_entity as teEn on teEn.pk_entity = existing_te_ens.fk_temporal_entity
      where teEn.fk_class = param_fk_class;
                           
  
      -- RAISE EXCEPTION 'resulting_row: %', resulting_row;
  
  
      -- RAISE INFO 'result of select: %', resulting_row;
  
        ------- if not existing, insert and store in result -----
          IF NOT FOUND THEN
            
                -- RAISE INFO 'Not found, creating new...';
          
              WITH _insert AS (
                  INSERT INTO information.temporal_entity (
                      fk_class
                  ) 
                  VALUES (
                      param_fk_class
                  )
                  -- return all fields of the new row
                  RETURNING *
                  ) 
              SELECT * FROM INTO resulting_row _insert;
          
                -- RAISE INFO 'result of insert: %', resulting_row  -- ;
        END IF;
  
   
     RETURN resulting_row;
        END;
        
  $BODY$;

  `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
  DROP FUNCTION information.temporal_entity_find_or_create(integer, jsonb);
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};



