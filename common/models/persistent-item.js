'use strict';

module.exports = function(PersistentItem) {

  PersistentItem.createItem = function(projectId, data, cb) {

    var params = [
      projectId, // $1
      data.notes // $2
    ];

    var sql_stmt = `
    WITH ins1 AS (
      INSERT INTO geovistory.persistent_item (notes)
      VALUES ($2)
      ON CONFLICT DO NOTHING
      RETURNING semkey_peit
    )
    INSERT INTO public.entity_project_rel (fk_semkey,fk_project,in_project)
    SELECT semkey_peit, $1, true FROM ins1;
    `;

    const connector = PersistentItem.dataSource.connector;
    connector.execute(sql_stmt, params, (err, result) => {
      var success = true;
      if (err){
        success = false;
      }
      cb(err, success);
    });
  };

};
