'use strict'

var app = require('../../server/server');
var _ = require('lodash');
var logSql = require("../../server/scripts/log-deserialized-sql");


module.exports = function (WarEntityPreview) {

  app.on('io-ready', (io) => {
    io.of('/WarEntityPreview').on('connection', (socket) => {
      console.log('new connection ' + socket.id)

      // Connection Cache
      const cache = {
        currentProjectPk: undefined, // the gevistory project
        streamedPks: {} // the entityPreviews streamed
      }

      // Reset the set of streamed pks
      const resetStreamedPks = pkEntity => {
        cache.streamedPks = {};
      }

      // Extend the set of streamed pks
      const extendStreamedPks = pkEntity => {
        cache.streamedPks[pkEntity] = true;
      }

      // Manage the room (project) of the socket
      const safeJoin = newProjectPk => {
        newProjectPk = newProjectPk.toString()
        if (newProjectPk !== cache.currentProjectPk) {
          socket.leave(cache.currentProjectPk);

          console.log(socket.id + ' left project ' + cache.currentProjectPk)

          socket.join(newProjectPk);

          console.log(socket.id + ' joined project ' + newProjectPk)

          resetStreamedPks();
          cache.currentProjectPk = newProjectPk;
        }
      };

      // emit entity preview
      const emitPreview = (entityPreview) => {
        socket.emit('entityPreview', entityPreview);

        console.log(socket.id + ' emitted entityPreview: ' + entityPreview.pk_entity + ' ' + entityPreview.entity_label + ' for project ' + cache.currentProjectPk)
      }

      // Get a entityPreview by pk_projekt and pk_entity and add pks (array of pk_entity) to streamedPks
      socket.on('addToStrem', (data) => {
        let { pk_project, pks } = data;

        if (!pk_project) return console.warn('Please provide a pk_project');

        // verify that the socket is in the right room
        safeJoin(pk_project);

        if (pks && pks.length) {

          // extend the object of streamed pks
          pks = pks.map(pk => pk.toString());
          pks.forEach(pk => extendStreamedPks(pk))

          console.log('request for EntityPreviews ' + JSON.stringify(pks) + ' by project ' + cache.currentProjectPk)

          // Query the entityPreview in DB
          WarEntityPreview.findComplex({ where: ['fk_project', '=', pk_project, 'AND', 'pk_entity', 'IN', pks] }, (err, projectItems) => {

            if (err) return new Error(err);

            if (projectItems) {

              // emit the ones found in Project
              projectItems.forEach(item => emitPreview(item))

              // query repo for the ones not (yet) in project
              const notInProject = _.difference(pks, projectItems.map(item => item.pk_entity.toString()))
              if (notInProject.length) {
                WarEntityPreview.findComplex({ where: ['fk_project', 'IS NULL', 'AND', 'pk_entity', 'IN', notInProject] }, (err, repoItems) => {

                  // emit the ones found in Repo
                  if (repoItems) repoItems.forEach(item => emitPreview(item))

                })
              }

            }
          })
        }
      });

      const streamSub = WarEntityPreview.stream.subscribe(entityPreview => {
        // check if the changed entityPreview is in object of streamed pks
        if (
          cache.streamedPks[entityPreview.pk_entity] &&
          entityPreview.fk_project == cache.currentProjectPk
        ) {
          emitPreview(entityPreview)
        }
      })

      // As soon as the client closes the project
      socket.on('leaveProjectRoom', () => {

        // leave the room
        socket.leave(cache.currentProjectPk)

        console.log(socket.id + ' left project ' + cache.currentProjectPk)

        // reset cache
        cache.currentProjectPk = undefined;

      })

      // As soon as the connection is closed
      socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected')

        // Unsubscribe the db listener
        streamSub.unsubscribe()

      })
    })
  })



  WarEntityPreview.search = function (projectId, searchString, pkClasses, entityType, limit, page, cb) {

    // Check that limit does not exceed maximum
    if (limit > 200) {
      const err = {
        'name': 'Max limit exceeded',
        'status': 403,
        'message': 'Max limit exceeded. The limit can not be bigger than 200.'
      }
      cb(err);
    }

    // set default if undefined
    var limit = limit ? limit : 10;

    var offset = limit * (page - 1);

    if (searchString) {
      var queryString = searchString.trim(' ').split(' ').map(word => {
        return word + ':*'
      }).join(' & ');
    } else {
      var queryString = '';
    }


    var params = [
      queryString,
      limit,
      offset
    ];

    // project filter
    let whereProject;
    if (projectId) {
      params.push(projectId)
      whereProject = 'AND fk_project = $' + params.length;
    } else {
      whereProject = 'AND fk_project IS NULL';
    };

    // data unit type filter
    let whereEntityType = '';
    if (entityType) {
      params.push(entityType)
      whereEntityType = 'AND entity_type = $' + params.length;
    };

    // class filter
    let pkClassParamNrs;
    if (pkClasses && pkClasses.length) {
      pkClassParamNrs = pkClasses.map((c, i) => '$' + (i + params.length + 1)).join(', ');
      params = [...params, ...pkClasses]
    }

    var sql_stmt = `
        select
        fk_project,
        pk_entity,
        fk_class,
        entity_label,
        class_label,
        entity_type,
        type_label,
        fk_type,
        time_span,
        ts_headline(full_text, q) as full_text_headline,
        ts_headline(class_label, q) as class_label_headline,
        ts_headline(entity_label, q) as entity_label_headline,
        ts_headline(type_label, q) as type_label_headline,
        count(pk_entity) OVER() AS total_count
        from warehouse.entity_preview,
        to_tsquery($1) q
        WHERE 1=1
        ` + (queryString === '' ? '' : 'AND ts_vector @@ q') + `
        ${whereProject}
        ${whereEntityType}
        ` + ((pkClasses && pkClasses.length) ? `AND fk_class IN (${pkClassParamNrs})` : '') + `

        ORDER BY ts_rank(ts_vector, q) DESC, entity_label asc
        LIMIT $2
        OFFSET $3;
        `;

    const connector = WarEntityPreview.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      cb(err, resultObjects);
    });
  };


  WarEntityPreview.afterRemote('search', function (ctx, resultObjects, next) {

    var totalCount = 0;
    if (resultObjects.length > 0) {
      totalCount = resultObjects[0].total_count;
    }

    // remove column total_count from all resultObjects
    var data = [];
    if (resultObjects) {
      data = resultObjects.map(searchHit => {
        delete searchHit.total_count;
        return searchHit;
      })
    }

    if (!ctx.res._headerSent) {

      ctx.res.set('X-Total-Count', totalCount);

      ctx.result = {
        'totalCount': totalCount,
        'data': data
      }
      next();

    } else {
      next();
    }

  });

  /**
   * Search for existing entities.
   * If not found for the given project, the repo version is returned
   */
  WarEntityPreview.searchExisting = function (projectId, searchString, pkClasses, entityType, limit, page, cb) {

    // Check that limit does not exceed maximum
    if (limit > 200) {
      const err = {
        'name': 'Max limit exceeded',
        'status': 403,
        'message': 'Max limit exceeded. The limit can not be bigger than 200.'
      }
      cb(err);
    }

    // set default if undefined
    var limit = limit ? limit : 10;

    var offset = limit * (page - 1);

    if (searchString) {
      var queryString = searchString.trim(' ').replace('\n', '').split(' ').map(word => {
        return `'${word}':*`.toLowerCase()
      }).join(' & ');
    } else {
      var queryString = '';
    }


    var params = [
      queryString,
      limit,
      offset,
      projectId
    ];

    // project filter
    let whereProject;

    // data unit type filter
    let whereEntityType = '';
    if (entityType) {
      params.push(entityType)
      whereEntityType = 'AND entity_type = $' + params.length;
    };

    // class filter
    let pkClassParamNrs;
    if (pkClasses && pkClasses.length) {
      pkClassParamNrs = pkClasses.map((c, i) => '$' + (i + params.length + 1)).join(', ');
      params = [...params, ...pkClasses]
    }

    var sql_stmt = `
      WITH
      tw1 AS (
        SELECT $1::tsquery q
      ),
      tw2 AS ( select
        fk_project,
        project,
        pk_entity,
        fk_class,
        entity_label,
        class_label,
        entity_type,
        type_label,
        fk_type,
        time_span,
        ts_headline(full_text, tw1.q) as full_text_headline,
        ts_headline(class_label, tw1.q) as class_label_headline,
        ts_headline(entity_label, tw1.q) as entity_label_headline,
        ts_headline(type_label, tw1.q) as type_label_headline,
        ROW_NUMBER () OVER (
            PARTITION BY pk_entity
            ORDER BY project DESC
            ) as rank
        from
          warehouse.entity_preview,
          tw1
        WHERE 1=1
        ` + (queryString === '' ? '' : 'AND ts_vector @@ tw1.q') + `
        AND (fk_project = $4 OR fk_project IS NULL)
        ${whereEntityType}
        ` + ((pkClasses && pkClasses.length) ? `AND fk_class IN (${pkClassParamNrs})` : '') + `
        ORDER BY ts_rank(ts_vector, tw1.q) DESC, entity_label asc
      )
      SELECT
        tw2.fk_project,
        tw2.project,
        tw2.pk_entity,
        tw2.fk_class,
        tw2.entity_label,
        tw2.class_label,
        tw2.entity_type,
        tw2.type_label,
        tw2.fk_type,
        tw2.time_span,
        tw2.full_text_headline,
        tw2.class_label_headline,
        tw2.entity_label_headline,
        tw2.type_label_headline,
        count(tw2.pk_entity) OVER() AS total_count,
        to_json(array_agg(epr.fk_project)) projects
      FROM tw2
      JOIN (
        SELECT fk_project, fk_entity
        FROM projects.info_proj_rel
        WHERE is_in_project = true
      ) epr ON epr.fk_entity = tw2.pk_entity
      WHERE rank = 1
      GROUP BY
        tw2.fk_project,
        tw2.project,
        tw2.pk_entity,
        tw2.fk_class,
        tw2.entity_label,
        tw2.class_label,
        tw2.entity_type,
        tw2.type_label,
        tw2.fk_type,
        tw2.time_span,
        tw2.full_text_headline,
        tw2.class_label_headline,
        tw2.entity_label_headline,
        tw2.type_label_headline
      LIMIT $2
      OFFSET $3;
    `

    //  sql_stmt = `
    //   SELECT $$ 'eins):*' & 'zweiss:*' $$::tsquery q;
    // `
    // params = []

    logSql(sql_stmt, params);


    const connector = WarEntityPreview.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      cb(err, resultObjects);
    });
  };


  WarEntityPreview.afterRemote('searchExisting', function (ctx, resultObjects, next) {

    var totalCount = 0;
    if (resultObjects.length > 0) {
      totalCount = resultObjects[0].total_count;
    }

    // remove column total_count from all resultObjects
    var data = [];
    if (resultObjects) {
      data = resultObjects.map(searchHit => {
        delete searchHit.total_count;
        return searchHit;
      })
    }

    if (!ctx.res._headerSent) {

      ctx.res.set('X-Total-Count', totalCount);

      ctx.result = {
        'totalCount': totalCount,
        'data': data
      }
      next();

    } else {
      next();
    }

  });


  /**
   * Internal function to create the include property of
   * a filter object for findComplex()
   *
   * Usage: add the returned object to the include property of a persistent item relation
   * of findComplex() filter, e.g.:
   * {
   *    ...
   *    include: InfPersistentItem.getIncludeObject(true, 123)
   * }
   *
   * @param ofProject {boolean}
   * @param project {number}
   * @returns include object of findComplex filter
   */
  WarEntityPreview.getTeEnIncludeObject = function (ofProject, pkProject) {

    let projectJoin = {};

    // if a pkProject is provided, create the relation
    if (pkProject) {
      // get the join object. If ofProject is false, the join will be a left join.
      projectJoin = {
        "entity_version_project_rels": WarEntityPreview.app.models.ProInfoProjRel.getJoinObject(ofProject, pkProject)
      }
    }


    return {
      "te_roles": {
        "$relation": {
          "name": "te_roles",
          "joinType": "inner join",
          "orderBy": [{
            "pk_entity": "asc"
          }]
        },
        ...projectJoin,
        "appellation": {
          "$relation": {
            "name": "appellation",
            "joinType": "left join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          }
        },
        "language": {
          "$relation": {
            "name": "language",
            "joinType": "left join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          }
        },
        "time_primitive": {
          "$relation": {
            "name": "time_primitive",
            "joinType": "left join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          }
        },
        "place": {
          "$relation": {
            "name": "place",
            "joinType": "left join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          }
        }
      }
    }
  }


  WarEntityPreview.createAll = function (cb) {
    const sql_stmt = `
      SELECT warehouse.entity_preview_non_recursive__refresh();
      SELECT warehouse.entity_preview__update_all();
    `
    const connector = WarEntityPreview.dataSource.connector;

    var hrstart = process.hrtime()

    connector.execute(sql_stmt, [], (err, resultObjects) => {
      if (err) return cb(err);

      var hrend = process.hrtime(hrstart);
      cb(null, `All entity previews have been updated. Time spent: ${hrend[0]}s ${parseInt(hrend[1] / 1000000)}ms`)

    });

  }

}
