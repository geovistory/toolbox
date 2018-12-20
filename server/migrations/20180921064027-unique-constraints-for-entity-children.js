'use strict';
/**
 * This Migration adds unique constraints for pk_entity to all tables that inherit from
 * an entity table. 
 * 
 * This is useful, since it will allow to add foreign key referencing on those
 * pk_entity cols.  
 * 
 * For getting all tables that inherit from an entity table, run this query:
 * 
 *    SELECT cn.nspname AS schema_child, c.relname AS child, pn.nspname AS schema_parent, p.relname AS parent
 *    FROM pg_inherits 
 *    JOIN pg_class AS c ON (inhrelid=c.oid)
 *    JOIN pg_class as p ON (inhparent=p.oid)
 *    JOIN pg_namespace pn ON pn.oid = p.relnamespace
 *    JOIN pg_namespace cn ON cn.oid = c.relnamespace
 *    WHERE p.relname = 'entity' 
 * 
 * 
 */

var dbm;
var type;
var seed;

const tables = [
  'commons.label',
  'commons.project',
  'commons.property_set',
  'commons.system_type',
  'commons.text_property',
  'commons.ui_context',
  'commons.ui_context_config',
  'data_for_history.associates_system_type',
  'data_for_history.class',
  'data_for_history.class_profile_view',
  'data_for_history.label',
  'data_for_history.profile',
  'data_for_history.property',
  'data_for_history.property_profile_view',
  'data_for_history.system_type',
  'data_for_history.text_property',
  'information.appellation',
  'information.chunk',
  'information.digital_object',
  'information.entity_association',
  'information.entity_version_project_rel',
  'information.language',
  'information.persistent_item',
  'information.place',
  'information.role',
  'information.sourcing',
  'information.temporal_entity',
  'information.text_property',
  'information.time_primitive'
]

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

  const sql = tables.map(tname => (
    `ALTER TABLE ${tname} ADD CONSTRAINT ${tname.replace('.','_')}_pk_entity_unique UNIQUE (pk_entity);
    `
  )).join('');



  db.runSql(sql, callback)
};

exports.down = function (db, callback) {
  const sql = tables.map(tname => (
    `ALTER TABLE ${tname} DROP CONSTRAINT ${tname.replace('.','_')}_pk_entity_unique;
    `
  )).join('');

  db.runSql(sql, callback)
};

exports._meta = {
  "version": 1
};
