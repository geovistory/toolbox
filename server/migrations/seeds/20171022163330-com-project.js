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

  -- Project Galilée, owned by pinco

  WITH insert_project AS (
    INSERT INTO commons.project (fk_language, notes)
    VALUES
    ('fra', 'Francesco Seed Project')
    ON CONFLICT DO NOTHING
    RETURNING pk_entity, pk_project
  ),
  insert_label AS (
    INSERT INTO commons.label (label, fk_entity, fk_system_type, fk_language, notes)
    SELECT 'Galilée', pk_entity, 1, 'fra', 'Sample note' FROM insert_project
    ON CONFLICT DO NOTHING
  ),
  insert_text_property AS (
    INSERT INTO commons.text_property (text_property, text_property_xml, fk_entity, fk_system_type, fk_language, notes)
    SELECT  'Lorem ipsum dolor sit amet, pariatur.
    Excepteur sint occaecat cupidatat non proident,
    sunt in culpa qui officia deserunt mollit anim id est laborum.', null, pk_entity, 1, 'fra', 'Sample note' FROM insert_project
  )
  INSERT INTO public.account_project_rel (fk_project, account_id, role)
  SELECT insert_project.pk_project, (SELECT id from public.account where username = 'pinco'), 'owner' FROM insert_project;



  -- Project Senatoren, owned by Jonas

  WITH insert_project AS (
    INSERT INTO commons.project (fk_language, notes)
    VALUES
    ('deu', 'Jonas Seed Project')
    ON CONFLICT DO NOTHING
    RETURNING pk_entity, pk_project
  ),
  insert_label AS (
    INSERT INTO commons.label (label, fk_entity, fk_system_type, fk_language, notes)
    SELECT 'Senatoren', pk_entity, 1, 'fra', 'Sample note' FROM insert_project
    ON CONFLICT DO NOTHING
  ),
  insert_text_property AS (
    INSERT INTO commons.text_property (text_property, text_property_xml, fk_entity, fk_system_type, fk_language, notes)
    SELECT  'Lorem ipsum dolor sit amet, pariatur.
    Excepteur sint occaecat cupidatat non proident,
    sunt in culpa qui officia deserunt mollit anim id est laborum.', null, pk_entity, 1, 'fra', 'Sample note' FROM insert_project
  )
  INSERT INTO public.account_project_rel (fk_project, account_id, role)
  SELECT insert_project.pk_project, (SELECT id from public.account where username = 'Jonas'), 'owner' FROM insert_project;



  `;
  console.log(sql);

  db.runSql(sql, callback);

};

exports.down = function(db, callback) {
  const sql = `
  TRUNCATE commons.project CASCADE;
  `;

  db.runSql(sql, callback);
};

exports._meta = {
  "version": 1
};
