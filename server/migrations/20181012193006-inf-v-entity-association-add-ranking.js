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
  -- drop view v_entity_association
  DROP VIEW IF EXISTS information.v_entity_association;

  -- add view v_entity_association
	CREATE OR REPLACE VIEW information.v_entity_association AS
	WITH ea_project_count AS (
		SELECT 
			ea.pk_entity,
			ea.fk_property,
			ea.fk_domain_entity,
			ea.fk_range_entity,
			ea.notes,
			ea.tmsp_creation,
			ea.tmsp_last_modification,
			ea.sys_period,
			COALESCE(count(*) FILTER (where epr.is_in_project = true),0) AS is_in_project_count
		FROM information.entity_association as ea
		LEFT JOIN information.entity_version_project_rel as epr on epr.fk_entity = ea.pk_entity
		GROUP BY 
			ea.pk_entity,
			ea.fk_property,
			ea.fk_domain_entity,
			ea.fk_range_entity,
			ea.notes,
			ea.tmsp_creation,
			ea.tmsp_last_modification,
			ea.sys_period
	)
	 SELECT 
        ea.*,	
       
        --make a ranking for each property and domain_entity
        ROW_NUMBER() OVER(PARTITION BY ea.fk_domain_entity, ea.fk_property ORDER BY ea.is_in_project_count DESC, ea.tmsp_creation DESC) AS rank_for_domain,
        p.dfh_range_instances_max_quantifier as range_max_quantifier,
      
        --make a ranking for each property and pe_it
        ROW_NUMBER() OVER(PARTITION BY ea.fk_range_entity, ea.fk_property ORDER BY ea.is_in_project_count DESC, ea.tmsp_creation DESC) AS rank_for_range,
        p.dfh_domain_instances_max_quantifier as domain_max_quantifier
		
    from ea_project_count as ea
    inner join data_for_history.property as p
    on ea.fk_property = p.dfh_pk_property;
    
    
  COMMENT ON VIEW information.v_entity_association IS 'If rank_for_domain is bigger than range_max_quantifier, the entity association can be considered a repo-wide alternative from the perspective of the domain entity.
    
  If rank_for_range is bigger than domain_max_quantifier, the entity association can be considered a repo-wide alternative from the perspective of the range entity.';



  -- create v_entity_association_find_or_create
    CREATE OR REPLACE FUNCTION information.v_entity_association_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
	  resulting_pk integer;
    resulting_row information.v_entity_association;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT pk_entity FROM INTO resulting_pk information.entity_association
        WHERE              
            fk_domain_entity = NEW.fk_domain_entity
            AND fk_range_entity = NEW.fk_range_entity
            AND fk_property = NEW.fk_property;

            -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.entity_association (
                    fk_domain_entity, 
                    fk_range_entity,
                    fk_property
                ) 
                VALUES (
                    NEW.fk_domain_entity, 
                    NEW.fk_range_entity,
                    NEW.fk_property
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT pk_entity FROM INTO resulting_pk _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

  	SELECT * FROM INTO resulting_row information.v_entity_association
  	WHERE pk_entity = resulting_pk;
	  
    RETURN resulting_row;
      END;
      $BODY$;

      -- add trigger on insert to execute v_entity_association_find_or_create

    CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_entity_association
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_entity_association_find_or_create();
   `
  db.runSql(sql, callback)

};

exports.down = function (db, callback) {
  const sql = `
   -- drop view v_entity_association
    DROP VIEW IF EXISTS information.v_entity_association;
 
  -- revert previous view v_entity_association
  

  -- add view v_entity_association
    CREATE OR REPLACE VIEW information.v_entity_association AS
    SELECT * FROM information.entity_association;

  -- create v_entity_association_find_or_create
    CREATE OR REPLACE FUNCTION information.v_entity_association_find_or_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    AS $BODY$
    DECLARE
      resulting_row information.entity_association;
    BEGIN

      -- RAISE INFO 'input values: %', NEW;
        
      ------ if existing, store in result -----
      SELECT * FROM INTO resulting_row information.entity_association
        WHERE              
            fk_domain_entity = NEW.fk_domain_entity
            AND fk_range_entity = NEW.fk_range_entity
            AND fk_property = NEW.fk_property;

            -- RAISE INFO 'result of select: %', resulting_row;

      ------- if not existing, insert and store in result -----
        IF NOT FOUND THEN
          
              -- RAISE INFO 'Not found, creating new...';
        
            WITH _insert AS (
                INSERT INTO information.entity_association (
                    fk_domain_entity, 
                    fk_range_entity,
                    fk_property
                ) 
                VALUES (
                    NEW.fk_domain_entity, 
                    NEW.fk_range_entity,
                    NEW.fk_property
                )
                -- return all fields of the new row
                RETURNING *
                ) 
            SELECT * FROM INTO resulting_row _insert;
        
              -- RAISE INFO 'result of insert: %', resulting_row;
      END IF;

    RETURN resulting_row;
      END;
      $BODY$;


  -- add trigger on insert to execute v_entity_association_find_or_create

    CREATE TRIGGER on_insert
      INSTEAD OF INSERT
      ON information.v_entity_association
      FOR EACH ROW
      EXECUTE PROCEDURE information.v_entity_association_find_or_create();
      
  `
  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};
