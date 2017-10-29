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

  Project.searchPersistentItems = function(projectId, searchString, page, cb) {

    // let filter = {
    //   where: {
    //     pk_project: projectId
    //   },
    //   include: {
    //     relation: "persistent_items",
    //     scope: {
    //       skip: 0,
    //       limit: 5
    //       // order: "tmsp_last_modification DESC"
    //       // order: "notes DESC"
    //     },
    //   }
    // }
    //
    // if(searchString) {
    //   filter.include.scope.where = {
    //     notes: {
    //       "regexp": "/"+searchString+"/i"
    //     }
    //   }
    // }
    //
    //
    // Project.find(filter, (err, resultObjects) => {
    //   cb(err, resultObjects[0]);
    // });

    var limit = 10;
    var offset = limit * (page-1);

    var params = [
      projectId, // $1
      searchString ? '%' + searchString + '%' : '%%',
      limit,
      offset
    ];

    var sql_stmt = `
    SELECT
    pi.notes,
    pi.pk_persistent_item,
    pi.pk_entity,
    pi.fk_class
    FROM information.persistent_item AS pi
    INNER JOIN information.entity_project_rel AS epr ON epr.fk_entity=pi.pk_entity
    WHERE epr.fk_project IN ($1) AND pi.notes iLike $2
    ORDER BY pi.tmsp_last_modification DESC
    LIMIT $3
    OFFSET $4
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
      cb(err, persistentItems);
    });
  };


  Project.afterRemote('searchPersistentItems', function (ctx, resultObjects, next) {

    var params = [
      ctx.args.projectId, // $1
      ctx.args.searchString ? '%' + ctx.args.searchString + '%' : '%%'
    ];

    const count_stmt = `
    SELECT
    count(pi.pk_persistent_item)
    FROM information.persistent_item AS pi
    INNER JOIN information.entity_project_rel AS epr ON epr.fk_entity=pi.pk_entity
    WHERE epr.fk_project IN ($1) AND pi.notes iLike $2
    `;


    if (!ctx.res._headerSent) {
      Project.dataSource.connector.execute(count_stmt, params, (err, countResult) => {
        ctx.res.set('X-Total-Count', countResult[0].count);

        ctx.result = {
          'totalCount': countResult[0].count,
          'data': resultObjects
        }
        next();
      });
    } else {
      next();
    }

  })
}