'use strict';

const Config = require('../config/Config');

module.exports = function (ProProject) {

  // Project.validatesUniquenessOf('name', {message: 'Project name already exists'});


  /**
  * Project.createWithLabelAndDescription -
  * Create a new Project, associate it with an account and add a Label and a
  * Text Property.
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
  ProProject.createWithLabelAndDescription = function (accountId, pkLanguage, label, description, cb) {

    var params = [];

    const addParam = (val) => {
      params.push(val);
      return '$' + params.length;
    }



    let insertTextProperty = '';
    if (description) {

      insertTextProperty = `
      , insert_text_property AS (
        INSERT INTO projects.text_property (fk_entity, string, fk_system_type, fk_language)
        SELECT  
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
      INSERT INTO projects.text_property (fk_entity, string, fk_system_type, fk_language)
      SELECT 
        pk_entity, 
        ${addParam(label)},
        ${addParam(Config.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION)}, 
        ${addParam(pkLanguage)}
      FROM insert_project
      ON CONFLICT DO NOTHING
    )
    ${insertTextProperty},
    add_information_from_template_project AS (
      INSERT INTO projects.info_proj_rel (fk_project, fk_entity, fk_entity_version, fk_entity_version_concat, is_in_project, is_standard_in_project, calendar, ord_num, entity_version)
      SELECT 
        (SELECT pk_entity FROM insert_project) as fk_project,
        fk_entity,
        fk_entity_version,
        fk_entity_version_concat,
        is_in_project,
        is_standard_in_project,
        calendar,
        ord_num, 
        entity_version
      FROM projects.info_proj_rel
      WHERE fk_project = ${addParam(Config.PK_PROJECT_OF_TEMPLATE_PROJECT)}        
      ON CONFLICT DO NOTHING
    ),
    add_data_for_history_from_template_project AS (
      INSERT INTO projects.dfh_class_proj_rel (fk_project, fk_entity, enabled_in_entities)
      SELECT 
        (SELECT pk_entity FROM insert_project) as fk_project,
        fk_entity,
        enabled_in_entities
      FROM projects.dfh_class_proj_rel
      WHERE fk_project = ${addParam(Config.PK_PROJECT_OF_TEMPLATE_PROJECT)}
      ON CONFLICT DO NOTHING
    )
    INSERT INTO public.account_project_rel (fk_project, account_id, role)
    SELECT pk_entity, ${addParam(accountId)}, 'owner' FROM insert_project
    `;


    const connector = ProProject.dataSource.connector;
    connector.execute(sql_stmt, params, (err, result) => {
      var success = true;
      if (err) {
        success = false;
      }
      cb(err, success);
    });
  };

  // Project.addEntity = function(pk_project, fk_entity, cb) {

  //   var params = [
  //     pk_project, // $1
  //     fk_entity // $2
  //   ];

  //   var sql_stmt = `
  //   INSERT INTO information.entity_project_rel (fk_project, fk_entity, in_project)
  //   VALUES ($1, $2, true);
  //   `;

  //   const connector = Project.dataSource.connector;
  //   connector.execute(sql_stmt, params, (err, result) => {
  //     var success = true;
  //     if (err){
  //       success = false;
  //     }
  //     cb(err, success);
  //   });
  // };


  ProProject.getBasics = function (pkProject, cb) {
    ProProject.findComplex({
      'where': ['pk_entity', '=', pkProject],
      'include': {
        'text_properties': {
          '$relation': {
            'name': 'text_properties',
            'joinType': 'inner join',
            'orderBy': [{ 'pk_entity': 'asc' }],
            'where': ['fk_system_type', '=', Config.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL],
          }
        },
        'default_language': {
          '$relation': {
            'name': 'default_language',
            'joinType': 'inner join',
            'orderBy': [{ 'pk_entity': 'asc' }]
          }
        }
      }
    }, cb)
  }

  /**
   * Gets the reference model of the project:
   * - DfhClasses available for project, including
   *    - Ingoing and Outgoing DfhProperties available for project, including
   *        - Boolean that indicates
   *    
   */
  ProProject.getReferenceModel = function (pkProject, cb) {

    // shortcut as long as no epr for classes in use
    const DfhClass = ProProject.app.models.DfhClass;

    const propertiesSelect = {
      include: [
        "dfh_pk_property",
        "dfh_identifier_in_namespace",
        "dfh_has_domain",
        "dfh_has_range",
        "dfh_fk_property_of_origin",
        "dfh_domain_instances_min_quantifier",
        "dfh_domain_instances_max_quantifier",
        "dfh_range_instances_min_quantifier",
        "dfh_range_instances_max_quantifier",
        "identity_defining"
      ]
    };

    const property_profile_view = {
      "$relation": {
        "name": "property_profile_view",
        "joinType": "inner join",
        // "where": [
        //   "removed_from_api", "=", "false"
        // ],
        select: false
      }
    };


    const labels = {
      "$relation": {
        "name": "labels",
        "joinType": "left join",
        select: { include: ["dfh_label", "com_fk_system_type"] },
        "where": [
          "com_fk_system_type", "IN", [
            Config.PROPERTY_LABEL_SG,
            Config.PROPERTY_LABEL_PL,
            Config.PROPERTY_LABEL_INVERSED_SG,
            Config.PROPERTY_LABEL_INVERSED_PL
          ]
        ]
      }
    };



    const class_field_config = (isOutgoing) => {
      return {
        "$relation": {
          "name": "class_field_config",
          "joinType": "left join",
          "where": [
            "property_is_outgoing", "=", JSON.stringify(isOutgoing)
          ],
        }
      }
    }

    const filter = {
      select: {
        include: ["pk_entity", "dfh_pk_class", "dfh_identifier_in_namespace", "dfh_standard_label"]
      },
      "include": {
        proj_rels: {
          "$relation": {
            "name": "proj_rels",
            "joinType": "left join",
            // select: { include: ["is_in_project"] },
            "orderBy": [{ "pk_entity": "asc" }],
            where: ['fk_project', '=', pkProject]
          }
        },
        labels: {
          "$relation": {
            "name": "labels",
            "joinType": "left join",
            select: { include: ["dfh_label", "inf_fk_language", "pk_entity", "com_fk_system_type"] },
            "where": [
              "com_fk_system_type", "IN", [Config.CLASS_LABEL]
            ]
          }
        },
        "class_profile_view": {
          "$relation": {
            "name": "class_profile_view",
            "joinType": "inner join",
            "where": [
              //              "dfh_profile_association_type", "=", "selected" // TODO: Check if app still works correctly 
              "removed_from_api", "=", "false"
            ],
            select: { include: ["dfh_fk_system_type", "dfh_type_label", "dfh_profile_association_type", "dfh_fk_profile", "dfh_profile_label"] }
          }
        },
        "text_properties": {
          "$relation": {
            "name": "text_properties",
            "joinType": "left join",
            select: { include: ["dfh_text_property", "dfh_language_iso_code"] }
          }
        },
        "ingoing_properties": {
          "$relation": {
            "name": "ingoing_properties",
            "joinType": "left join",
            select: propertiesSelect,
          },
          property_profile_view,
          class_field_config: class_field_config(false),
          labels,
        },
        "outgoing_properties": {
          "$relation": {
            "name": "outgoing_properties",
            "joinType": "left join",
            select: propertiesSelect,
          },
          property_profile_view,
          class_field_config: class_field_config(true),
          labels
        },
        "class_field_configs": {
          "$relation": {
            "name": "class_field_configs",
            "joinType": "left join"
          },
          class_field: {
            $relation: {
              name: "class_field",
              joinType: "left join",
              "orderBy": [{ "pk_entity": "asc" }]
            }
          }
        }
      }
    }

    return DfhClass.findComplex(filter, cb);

  }




}