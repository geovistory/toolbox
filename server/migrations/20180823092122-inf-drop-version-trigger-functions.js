'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};


exports.up = function(db, callback) {
  const sql = `
  
  DROP FUNCTION information.v_appellation_version_insert();
  DROP FUNCTION information.v_language_version_insert();
  DROP FUNCTION information.v_persistent_item_version_insert();
  DROP FUNCTION information.v_role_version_insert();
  DROP FUNCTION information.v_temporal_entity_version_insert();
  `
  db.runSql(sql, callback)

};

exports.down = function(db, callback) {
  const sql = `

  CREATE FUNCTION information.v_appellation_version_insert()
  RETURNS trigger
  LANGUAGE 'plpgsql'
AS $BODY$

  DECLARE
  result text;
  BEGIN
  -- if there is a pk_entity, update the existing entity
  IF (NEW.pk_entity IS NOT NULL) THEN

  UPDATE information.appellation SET
  appellation_label = NEW.appellation_label,
  fk_class = NEW.fk_class,
  notes = NEW.notes
  WHERE pk_entity = NEW.pk_entity
  RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

  -- else if there is no pk_entity, insert a new entity
  ELSE

  INSERT INTO information.appellation (notes, fk_class, appellation_label)
  VALUES(NEW.notes, NEW.fk_class, NEW.appellation_label)
  RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

  END IF;

  -- in both cases return the pk_entity_version_concat, so that one can query the new version in the view
  NEW.pk_entity_version_concat = result;

  RETURN NEW;
  END;

  
$BODY$;





CREATE FUNCTION information.v_language_version_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$

    DECLARE
    result text;
    BEGIN
    -- if there is a pk_entity, update the existing entity
    IF (NEW.pk_entity IS NOT NULL) THEN

    UPDATE information.language SET
    notes = NEW.notes,
    fk_class = NEW.fk_class,
    lang_type = NEW.lang_type,
    scope = NEW.scope,
    iso6392b = NEW.iso6392b,
    iso6392t = NEW.iso6392t,
    iso6391 = NEW.iso6391
    WHERE pk_entity = NEW.pk_entity
    RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

    -- else if there is no pk_entity, insert a new entity
    ELSE

    INSERT INTO information.language (
      pk_language,
      notes,
      fk_class,
      lang_type,
      scope,
      iso6392b,
      iso6392t,
      iso6391
    )
    VALUES(
      NEW.pk_language,
      NEW.notes,
      NEW.fk_class,
      NEW.lang_type,
      NEW.scope,
      NEW.iso6392b,
      NEW.iso6392t,
      NEW.iso6391
    )
    RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

    END IF;

    -- in both cases return the pk_entity_version_concat, so that one can query the new version in the view
    NEW.pk_entity_version_concat = result;

    RETURN NEW;
    END;

    
$BODY$;

  

CREATE FUNCTION information.v_persistent_item_version_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$

    DECLARE
    result text;
    BEGIN
    -- if there is a pk_entity, update the existing entity
    IF (NEW.pk_entity IS NOT NULL) THEN

    UPDATE information.persistent_item SET
    fk_class = NEW.fk_class,
    notes = NEW.notes
    WHERE pk_entity = NEW.pk_entity
    RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

    -- else if there is no pk_entity, insert a new entity
    ELSE

    INSERT INTO information.persistent_item (notes, fk_class)
    VALUES(NEW.notes, NEW.fk_class)
    RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

    END IF;

    -- in both cases return the pk_entity_version_concat, so that one can query the new version in the view
    NEW.pk_entity_version_concat = result;

    RETURN NEW;
    END;

    
$BODY$;



CREATE FUNCTION information.v_role_version_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$

    DECLARE
    result text;
    BEGIN
    -- if there is a pk_entity, update the existing entity
    IF (NEW.pk_entity IS NOT NULL) THEN

    UPDATE information.role SET
    notes = NEW.notes,
    fk_property = NEW.fk_property,
    fk_entity = NEW.fk_entity,
    fk_temporal_entity = NEW.fk_temporal_entity
    WHERE pk_entity = NEW.pk_entity
    RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

    -- else if there is no pk_entity, insert a new entity
    ELSE

    INSERT INTO information.role (notes, fk_property, fk_entity, fk_temporal_entity)
    VALUES(NEW.notes, NEW.fk_property, NEW.fk_entity, NEW.fk_temporal_entity)
    RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

    END IF;

    -- in both cases return the pk_entity_version_concat, so that one can query the new version in the view
    NEW.pk_entity_version_concat = result;

    RETURN NEW;
    END;

    
$BODY$;



CREATE FUNCTION information.v_temporal_entity_version_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$

    DECLARE
    result text;
    BEGIN
    -- if there is a pk_entity, update the existing entity
    IF (NEW.pk_entity IS NOT NULL) THEN

    UPDATE information.temporal_entity SET
    notes = NEW.notes,
    fk_class = NEW.fk_class
    WHERE pk_entity = NEW.pk_entity
    RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

    -- else if there is no pk_entity, insert a new entity
    ELSE

    INSERT INTO information.temporal_entity (notes, fk_class)
    VALUES(NEW.notes, NEW.fk_class)
    RETURNING concat(pk_entity || '_' || entity_version)::text as pk_entity_version_concat INTO result;

    END IF;

    -- in both cases return the pk_entity_version_concat, so that one can query the new version in the view
    NEW.pk_entity_version_concat = result;

    RETURN NEW;
    END;

    
$BODY$;
  `
  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
