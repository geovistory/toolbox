'use strict';

module.exports = function(Project) {

  // Project.validatesUniquenessOf('name', {message: 'Project name already exists'});

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