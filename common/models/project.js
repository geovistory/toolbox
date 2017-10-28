'use strict';

module.exports = function(Project) {

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
  Project.createWithLabelAndDescription = function(accountId, pkLanguage, label, textProperty, cb) {

    var params = [
      accountId,
      pkLanguage,
      label
    ];

    console.log(params);

    let sql_stmt = `
    WITH insert_project AS (
      INSERT INTO commons.project (fk_language)
      VALUES
      ($2)
      ON CONFLICT DO NOTHING
      RETURNING pk_entity, pk_project
    ),
    insert_label AS (
      INSERT INTO commons.label (label, fk_entity, fk_system_type, fk_language)
      SELECT $3, pk_entity, 1, $2 FROM insert_project
      ON CONFLICT DO NOTHING
    )
    INSERT INTO public.account_project_rel (fk_project, account_id, role)
    SELECT pk_project, $1, 'owner' FROM insert_project
    `;

    if(textProperty){

      params.push(textProperty);

      sql_stmt = `
      WITH insert_project AS (
        INSERT INTO commons.project (fk_language)
        VALUES
        ($2)
        ON CONFLICT DO NOTHING
        RETURNING pk_entity, pk_project
      ),
      insert_label AS (
        INSERT INTO commons.label (label, fk_entity, fk_system_type, fk_language)
        SELECT $3, pk_entity, 1, $2 FROM insert_project
        ON CONFLICT DO NOTHING
      ),
      insert_text_property AS (
        INSERT INTO commons.text_property (text_property, text_property_xml, fk_entity, fk_system_type, fk_language, notes)
        SELECT  $4, null, pk_entity, 1, 'fra', 'Sample note' FROM insert_project
      )
      INSERT INTO public.account_project_rel (fk_project, account_id, role)
      SELECT pk_project, $1, 'owner' FROM insert_project
      `;

    }

    const connector = Project.dataSource.connector;
    connector.execute(sql_stmt, params, (err, result) => {
      var success = true;
      if (err){
        success = false;
      }
      cb(err, success);
    });
  };

  Project.addEntity = function(projectId, entitySemkey, cb) {

    var params = [
      projectId, // $1
      entitySemkey // $2
    ];

    var sql_stmt = `
    INSERT INTO public.entity_project_rel (fk_project, fk_semkey, in_project)
    VALUES ($1, $2, true);
    `;

    const connector = Project.dataSource.connector;
    connector.execute(sql_stmt, params, (err, result) => {
      var success = true;
      if (err){
        success = false;
      }
      cb(err, success);
    });
  };

  Project.listPersistentItems = function(projectIds, cb) {

    var params = [
      projectIds // $1
    ];

    var sql_stmt = `
    SELECT
    pi.fk_system_type,
    pi.id_importation_integer,
    pi.id_importation_varchar,
    pi.pk_persistent_item,
    pi.notes,
    pi.semkey_peit,
    pi.sys_period,
    pi.tmsp_creation,
    pi.tmsp_last_modification
    FROM geovistory.persistent_item AS pi
    INNER JOIN public.entity_project_rel AS epr ON epr.fk_semkey=pi.semkey_peit
    WHERE epr.fk_project IN ($1)
    ORDER BY lower(epr.sys_period) DESC;
    `;

    const connector = Project.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      var persistentItems = [];

      if (resultObjects){
        persistentItems = resultObjects.map(persistentItemRaw => {
          const persistentItemData = connector.fromRow('PersistentItem', persistentItemRaw)
          return new Project.app.models.PersistentItem(persistentItemData);
        })
      }

      cb(null, persistentItems);
    });
  };

}