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

  Project.addEntity = function(pk_project, fk_entity, cb) {

    var params = [
      pk_project, // $1
      fk_entity // $2
    ];

    var sql_stmt = `
    INSERT INTO information.entity_project_rel (fk_project, fk_entity, in_project)
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


}