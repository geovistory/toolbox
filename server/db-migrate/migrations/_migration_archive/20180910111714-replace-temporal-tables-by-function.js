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


const tablesWithVersioningTrigger = [
  'commons.label',
  'commons.project',
  'commons.system_type',
  'commons.text_property',
  'commons.ui_context',
  'commons.ui_context_config',
  'commons.property_set',
  'data_for_history.class_profile_view',
  'data_for_history.class',
  'data_for_history.label',
  'data_for_history.text_property',
  'data_for_history.property',
  'data_for_history.profile',
  'data_for_history.property_profile_view',
  'data_for_history.associates_system_type',
  'data_for_history.system_type',
  'information.entity_version_project_rel',
  'information.appellation',
  'information.entity_association',
  'information.language',
  'information.persistent_item',
  'information.role',
  'information.sourcing',
  'information.temporal_entity',
  'information.text_property',
  'information.chunk',
  'information.digital_object',
  'information.place',
  'information.time_primitive'
]


function createTriggersSql() {

  return tablesWithVersioningTrigger.map(tablename => `
  DROP TRIGGER IF EXISTS versioning_trigger
  ON ${tablename};

  CREATE TRIGGER versioning_trigger
  BEFORE INSERT OR DELETE OR UPDATE 
  ON ${tablename}
  FOR EACH ROW
  EXECUTE PROCEDURE public.versioning('sys_period', '${tablename}_vt', 'true');
  
  `
  ).join('');

}

/**
 * Source of this SQL:
 * https://github.com/nearform/temporal_tables/blob/master/versioning_function.sql
 */

exports.up = function (db, callback) {
  const sql = ` 
 
  -- Remove extension temporal_tables

  DROP EXTENSION IF EXISTS temporal_tables CASCADE;

  --- Create the nwe versioning() function (schema public)

  CREATE OR REPLACE FUNCTION versioning()
  RETURNS TRIGGER AS $$
  DECLARE
    sys_period text;
    history_table text;
    manipulate jsonb;
    commonColumns text[];
    time_stamp_to_use timestamptz := current_timestamp;
    range_lower timestamptz;
    transaction_info txid_snapshot;
    existing_range tstzrange;
    holder record;
    holder2 record;
    pg_version integer;
  BEGIN
    -- version 0.2.0
  
    IF TG_WHEN != 'BEFORE' OR TG_LEVEL != 'ROW' THEN
      RAISE TRIGGER_PROTOCOL_VIOLATED USING
      MESSAGE = 'function "versioning" must be fired BEFORE ROW';
    END IF;
  
    IF TG_OP != 'INSERT' AND TG_OP != 'UPDATE' AND TG_OP != 'DELETE' THEN
      RAISE TRIGGER_PROTOCOL_VIOLATED USING
      MESSAGE = 'function "versioning" must be fired for INSERT or UPDATE or DELETE';
    END IF;
  
    IF TG_NARGS != 3 THEN
      RAISE INVALID_PARAMETER_VALUE USING
      MESSAGE = 'wrong number of parameters for function "versioning"',
      HINT = 'expected 3 parameters but got ' || TG_NARGS;
    END IF;
  
    sys_period := TG_ARGV[0];
    history_table := TG_ARGV[1];
  
    -- check if sys_period exists on original table
    SELECT atttypid, attndims INTO holder FROM pg_attribute WHERE attrelid = TG_RELID AND attname = sys_period AND NOT attisdropped;
    IF NOT FOUND THEN
      RAISE 'column "%" of relation "%" does not exist', sys_period, TG_TABLE_NAME USING
      ERRCODE = 'undefined_column';
    END IF;
    IF holder.atttypid != to_regtype('tstzrange') THEN
      IF holder.attndims > 0 THEN
        RAISE 'system period column "%" of relation "%" is not a range but an array', sys_period, TG_TABLE_NAME USING
        ERRCODE = 'datatype_mismatch';
      END IF;
  
      SELECT rngsubtype INTO holder2 FROM pg_range WHERE rngtypid = holder.atttypid;
      IF FOUND THEN
        RAISE 'system period column "%" of relation "%" is not a range of timestamp with timezone but of type %', sys_period, TG_TABLE_NAME, format_type(holder2.rngsubtype, null) USING
        ERRCODE = 'datatype_mismatch';
      END IF;
  
      RAISE 'system period column "%" of relation "%" is not a range but type %', sys_period, TG_TABLE_NAME, format_type(holder.atttypid, null) USING
      ERRCODE = 'datatype_mismatch';
    END IF;
  
    IF TG_OP = 'UPDATE' OR TG_OP = 'DELETE' THEN
      -- Ignore rows already modified in this transaction
      transaction_info := txid_current_snapshot();
      IF OLD.xmin::text >= (txid_snapshot_xmin(transaction_info) % (2^32)::bigint)::text
      AND OLD.xmin::text <= (txid_snapshot_xmax(transaction_info) % (2^32)::bigint)::text THEN
        IF TG_OP = 'DELETE' THEN
          RETURN OLD;
        END IF;
  
        RETURN NEW;
      END IF;
  
      SELECT current_setting('server_version_num')::integer
      INTO pg_version;
  
      -- to support postgres < 9.6
      IF pg_version < 90600 THEN
        -- check if history table exits
        IF to_regclass(history_table::cstring) IS NULL THEN
          RAISE 'relation "%" does not exist', history_table;
        END IF;
      ELSE
        IF to_regclass(history_table) IS NULL THEN
          RAISE 'relation "%" does not exist', history_table;
        END IF;
      END IF;
  
      -- check if history table has sys_period
      IF NOT EXISTS(SELECT * FROM pg_attribute WHERE attrelid = history_table::regclass AND attname = sys_period AND NOT attisdropped) THEN
        RAISE 'history relation "%" does not contain system period column "%"', history_table, sys_period USING
        HINT = 'history relation must contain system period column with the same name and data type as the versioned one';
      END IF;
  
      EXECUTE format('SELECT $1.%I', sys_period) USING OLD INTO existing_range;
  
      IF existing_range IS NULL THEN
        RAISE 'system period column "%" of relation "%" must not be null', sys_period, TG_TABLE_NAME USING
        ERRCODE = 'null_value_not_allowed';
      END IF;
  
      IF isempty(existing_range) OR NOT upper_inf(existing_range) THEN
        RAISE 'system period column "%" of relation "%" contains invalid value', sys_period, TG_TABLE_NAME USING
        ERRCODE = 'data_exception',
        DETAIL = 'valid ranges must be non-empty and unbounded on the high side';
      END IF;
  
      IF TG_ARGV[2] = 'true' THEN
        -- mitigate update conflicts
        range_lower := lower(existing_range);
        IF range_lower >= time_stamp_to_use THEN
          time_stamp_to_use := range_lower + interval '1 microseconds';
        END IF;
      END IF;
  
      WITH history AS
        (SELECT attname, atttypid
        FROM   pg_attribute
        WHERE  attrelid = history_table::regclass
        AND    attnum > 0
        AND    NOT attisdropped),
        main AS
        (SELECT attname, atttypid
        FROM   pg_attribute
        WHERE  attrelid = TG_RELID
        AND    attnum > 0
        AND    NOT attisdropped)
      SELECT
        history.attname AS history_name,
        main.attname AS main_name,
        history.atttypid AS history_type,
        main.atttypid AS main_type
      INTO holder
        FROM history
        INNER JOIN main
        ON history.attname = main.attname
      WHERE
        history.atttypid != main.atttypid;
  
      IF FOUND THEN
        RAISE 'column "%" of relation "%" is of type % but column "%" of history relation "%" is of type %',
          holder.main_name, TG_TABLE_NAME, format_type(holder.main_type, null), holder.history_name, history_table, format_type(holder.history_type, null)
        USING ERRCODE = 'datatype_mismatch';
      END IF;
  
      WITH history AS
        (SELECT attname
        FROM   pg_attribute
        WHERE  attrelid = history_table::regclass
        AND    attnum > 0
        AND    NOT attisdropped),
        main AS
        (SELECT attname
        FROM   pg_attribute
        WHERE  attrelid = TG_RELID
        AND    attnum > 0
        AND    NOT attisdropped)
      SELECT array_agg(quote_ident(history.attname)) INTO commonColumns
        FROM history
        INNER JOIN main
        ON history.attname = main.attname
        AND history.attname != sys_period;
  
      EXECUTE ('INSERT INTO ' ||
        CASE split_part(history_table, '.', 2)
        WHEN '' THEN
          quote_ident(history_table)
        ELSE
          quote_ident(split_part(history_table, '.', 1)) || '.' || quote_ident(split_part(history_table, '.', 2))
        END ||
        '(' ||
        array_to_string(commonColumns , ',') ||
        ',' ||
        quote_ident(sys_period) ||
        ') VALUES ($1.' ||
        array_to_string(commonColumns, ',$1.') ||
        ',tstzrange($2, $3, ''[)''))')
         USING OLD, range_lower, time_stamp_to_use;
    END IF;
  
    IF TG_OP = 'UPDATE' OR TG_OP = 'INSERT' THEN
      manipulate := jsonb_set('{}'::jsonb, ('{' || sys_period || '}')::text[], to_jsonb(tstzrange(time_stamp_to_use, null, '[)')));
  
      RETURN jsonb_populate_record(NEW, manipulate);
    END IF;
  
    RETURN OLD;
  END;
  $$ LANGUAGE plpgsql;



  -- Add triggers  
  ` + createTriggersSql();


  db.runSql(sql, callback)

};



function dropTriggersSql() {

  return tablesWithVersioningTrigger.map(tablename => `
  DROP TRIGGER versioning_trigger  ON ${tablename};
  `
  ).join('');

}

exports.down = function (db, callback) {
  const sql = `
  -- Drop Sql versioning function
   DROP FUNCTION public.versioning() CASCADE;

  -- Add extension temporal_tables 
    CREATE EXTENSION IF NOT EXISTS temporal_tables WITH SCHEMA public;
    COMMENT ON EXTENSION temporal_tables IS 'temporal tables';
  
  `
  + createTriggersSql();


  db.runSql(sql, callback)
};


exports._meta = {
  "version": 1
};


