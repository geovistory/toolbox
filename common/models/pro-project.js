'use strict';

const Config = require('../config/Config');
var logSql = require('../../server/scripts/log-deserialized-sql');
var FlatObjectQueryBuilder = require('../classes/FlatObjectQueryBuilder');

module.exports = function(ProProject) {
  // Project.validatesUniquenessOf('name', {message: 'Project name already exists'});

  /**
   * Project.createWithLabelAndDescription -
   * - Create a new Project
   * - associate it with an account and
   * - add a Label and a Text Property
   * - add clone everything from
   *
   * @param  {integer} accountId Id of account to associate project with
   * @param  {string} fk_language: Id of language used for
   *                                 default language of the project
   *                                 language of the label
   *                                 language of the text property
   * @param  {string} label: Default name of the Project
   * @param  {string} text_property: Default description of the Project
   * @param  {type} cb        callback
   * @return {void}
   */
  ProProject.createWithLabelAndDescription = function(
    accountId,
    pkLanguage,
    label,
    description,
    cb
  ) {
    var params = [];

    const addParam = val => {
      params.push(val);
      return '$' + params.length;
    };

    let insertTextProperty = '';
    if (description) {
      insertTextProperty = `
      , insert_text_property AS (
        INSERT INTO projects.text_property (fk_project, fk_pro_project, string, fk_system_type, fk_language)
        SELECT
          pk_entity,
          pk_entity,
          ${addParam(description)},
          ${addParam(Config.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION)},
          ${addParam(pkLanguage)}
        FROM insert_project
      )`;
    }

    let sql_stmt = `
    WITH insert_project AS (
      INSERT INTO projects.project (fk_language)
      VALUES
      (${addParam(pkLanguage)})
      ON CONFLICT DO NOTHING
      RETURNING pk_entity
    ),
    insert_label AS (
      INSERT INTO projects.text_property (fk_project, fk_pro_project, string, fk_system_type, fk_language)
      SELECT
        pk_entity,
        pk_entity,
        ${addParam(label)},
        ${addParam(Config.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL)},
        ${addParam(pkLanguage)}
      FROM insert_project
      ON CONFLICT DO NOTHING
    )
    ${insertTextProperty},
    add_information_from_template_project AS (
      INSERT INTO projects.info_proj_rel (
          fk_project,
          fk_entity,
          fk_entity_version,
          fk_entity_version_concat,
          is_in_project,
          is_standard_in_project,
          calendar,
          ord_num_of_domain,
          ord_num_of_range,
          ord_num_of_text_property,
          entity_version
         )
      SELECT
        (SELECT pk_entity FROM insert_project) as fk_project,
        fk_entity,
        fk_entity_version,
        fk_entity_version_concat,
        is_in_project,
        is_standard_in_project,
        calendar,
        ord_num_of_domain,
        ord_num_of_range,
        ord_num_of_text_property,
        entity_version
      FROM projects.info_proj_rel
      WHERE fk_project = ${addParam(Config.PK_PROJECT_OF_TEMPLATE_PROJECT)}
      ON CONFLICT DO NOTHING
    ),
    add_dfh_classes AS (
      INSERT INTO projects.dfh_class_proj_rel (fk_project, fk_class, enabled_in_entities)
      SELECT
        (SELECT pk_entity FROM insert_project) as fk_project,
        fk_class,
        enabled_in_entities
      FROM projects.dfh_class_proj_rel
      WHERE fk_project = ${addParam(Config.PK_PROJECT_OF_TEMPLATE_PROJECT)}
      ON CONFLICT DO NOTHING
    ),
    add_dfh_profiles AS (
      INSERT INTO projects.dfh_profile_proj_rel (fk_project, fk_profile, enabled)
      SELECT
        (SELECT pk_entity FROM insert_project) as fk_project,
        fk_profile,
        enabled
      FROM projects.dfh_profile_proj_rel
      WHERE fk_project = ${addParam(Config.PK_PROJECT_OF_TEMPLATE_PROJECT)}
      ON CONFLICT DO NOTHING
    ),
    add_default_namespace AS (
      INSERT INTO data.namespace (fk_project, standard_label)
      VALUES (
        (SELECT pk_entity FROM insert_project),
        'Default Namespace'
      )
    )
    INSERT INTO public.account_project_rel (fk_project, account_id, role)
    SELECT pk_entity, ${addParam(accountId)}, 'owner' FROM insert_project
    `;

    logSql(sql_stmt, params);

    const connector = ProProject.dataSource.connector;
    connector.execute(sql_stmt, params, (err, result) => {
      var success = true;
      if (err) {
        success = false;
      }
      cb(err, success);
    });
  };

  ProProject.getBasics = function(pkProject, cb) {
    ProProject.findComplex(
      {
        where: ['pk_entity', '=', pkProject],
        include: {
          text_properties: {
            $relation: {
              name: 'text_properties',
              joinType: 'inner join',
              orderBy: [{ pk_entity: 'asc' }],
              where: [
                'fk_system_type',
                '=',
                Config.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL,
              ],
            },
          },
          default_language: {
            $relation: {
              name: 'default_language',
              joinType: 'inner join',
              orderBy: [{ pk_entity: 'asc' }],
            },
          },
        },
      },
      cb
    );
  };

  ProProject.ofAccount = function(accountId, ctx, cb) {
    const q = new FlatObjectQueryBuilder(ProProject.app.models);
    const params = [accountId];
    const sql = `
      SELECT ${q.createSelect('t1', 'ProProject')}
      FROM projects.project t1,
      public.account_project_rel t2
      WHERE t1.pk_entity = t2.fk_project
      AND t2.account_id = $1
    `;
    ProProject.dataSource.connector.execute(
      sql,
      params,
      (err, resultObjects) => {
        if (err) return cb(err, resultObjects);
        cb(false, resultObjects);
      }
    );
  };
};
