'use strict';

var app = require('../../server/server');
var _ = require('lodash');
var logSql = require('../../server/scripts/log-deserialized-sql');
const log = false;
var SqlWarSearchExisiting = require('../../dist/server/sql-builders/sql-war-search-existing')
  .SqlWarSearchExisiting;

module.exports = function (WarEntityPreview) {
  // the caches by project
  WarEntityPreview.cachesByProject = {};
  app.on('io-ready', (io) => {
    io.of('/WarEntityPreview').on('connection', (socket) => {
      if (log) console.log('new connection ' + socket.id);

      // Connection Cache
      const cache = {
        currentProjectPk: undefined, // the gevistory project
        streamedPks: {}, // the entityPreviews streamed
      };

      // Reset the set of streamed pks
      const resetStreamedPks = (pkEntity) => {
        cache.streamedPks = {};
      };

      // Extend the set of streamed pks
      const extendStreamedPks = (pkEntity) => {
        cache.streamedPks[pkEntity] = true;
      };

      // Manage the room (project) of the socket
      const safeJoin = (newProjectPk) => {
        newProjectPk = newProjectPk.toString();
        if (newProjectPk !== cache.currentProjectPk) {
          socket.leave(cache.currentProjectPk);

          if (log)
            console.log(socket.id + ' left project ' + cache.currentProjectPk);

          socket.join(newProjectPk);

          if (log) console.log(socket.id + ' joined project ' + newProjectPk);

          resetStreamedPks();
          cache.currentProjectPk = newProjectPk;

          // make this cache available on app scope
          WarEntityPreview.cachesByProject[newProjectPk] = cache;
        }
      };

      // emit entity preview
      const emitPreview = (entityPreview) => {
        socket.emit('entityPreview', entityPreview);

        // if (log)
        console.log(
          socket.id +
            ' emitted entityPreview: ' +
            entityPreview.pk_entity +
            ' ' +
            entityPreview.entity_label +
            ' for project ' +
            cache.currentProjectPk
        );
      };

      // Get a entityPreview by pk_projekt and pk_entity and add pks (array of pk_entity) to streamedPks
      socket.on('addToStream', (data) => {
        let { pk_project, pks } = data;

        if (!pk_project) return console.warn('Please provide a pk_project');

        // verify that the socket is in the right room
        safeJoin(pk_project);

        // sanitize the pks
        const sanitizedPks = [];
        for (let i = 0; i < pks.length; i++) {
          const pk = pks[i];
          if (typeof pk === 'number') {
            sanitizedPks.push(pk.toString());
          } else if (typeof pk === 'string') {
            sanitizedPks.push(pk);
          } else {
            console.warn('Please provide a proper pk_entity');
          }
        }

        if (sanitizedPks && sanitizedPks.length) {
          // extend the object of streamed sanitizedPks
          sanitizedPks.forEach((pk) => extendStreamedPks(pk));

          if (log)
            console.log(
              'request for EntityPreviews ' +
                JSON.stringify(sanitizedPks) +
                ' by project ' +
                cache.currentProjectPk
            );

          // Query the entityPreview in DB
          WarEntityPreview.findComplex(
            {
              where: [
                'fk_project',
                '=',
                pk_project,
                'AND',
                'pk_entity',
                'IN',
                sanitizedPks,
              ],
            },
            (err, projectItems) => {
              if (err) return new Error(err);

              if (projectItems) {
                // emit the ones found in Project
                projectItems.forEach((item) => emitPreview(item));

                // query repo for the ones not (yet) in project
                const notInProject = _.difference(
                  sanitizedPks,
                  projectItems.map((item) => item.pk_entity.toString())
                );
                if (notInProject.length) {
                  WarEntityPreview.findComplex(
                    {
                      where: [
                        'fk_project',
                        'IS NULL',
                        'AND',
                        'pk_entity',
                        'IN',
                        notInProject,
                      ],
                    },
                    (err, repoItems) => {
                      // emit the ones found in Repo
                      if (repoItems)
                        repoItems.forEach((item) => emitPreview(item));
                    }
                  );
                }
              }
            }
          );
        }
      });

      const streamSub = WarEntityPreview.stream.subscribe(
        (tsmpLastModification) => {
          if (cache.currentProjectPk) {
            const entityPks = Object.keys(cache.streamedPks);
            if (entityPks) {
              // Query entities modified and needed by current cache.
              WarEntityPreview.findComplex(
                {
                  where: [
                    'tmsp_last_modification',
                    '=',
                    tsmpLastModification,
                    'AND',
                    'fk_project',
                    '=',
                    cache.currentProjectPk,
                    'AND',
                    'pk_entity',
                    'IN',
                    entityPks,
                  ],
                },
                (err, projectItems) => {
                  if (err) return new Error(err);

                  if (projectItems) {
                    // emit the ones found in Project
                    projectItems.forEach((item) => emitPreview(item));

                    // query repo for the ones not (yet) in project
                    const notInProject = _.difference(
                      entityPks,
                      projectItems.map((item) => item.pk_entity.toString())
                    );
                    if (notInProject.length) {
                      WarEntityPreview.findComplex(
                        {
                          where: [
                            'tmsp_last_modification',
                            '=',
                            tsmpLastModification,
                            'AND',
                            'fk_project',
                            'IS NULL',
                            'AND',
                            'pk_entity',
                            'IN',
                            notInProject,
                          ],
                        },
                        (err, repoItems) => {
                          // emit the ones found in Repo
                          if (repoItems)
                            repoItems.forEach((item) => emitPreview(item));
                        }
                      );
                    }
                  }
                }
              );
            }
          }
        }
      );

      // As soon as the client closes the project
      socket.on('leaveProjectRoom', () => {
        // leave the room
        socket.leave(cache.currentProjectPk);

        if (log)
          console.log(socket.id + ' left project ' + cache.currentProjectPk);

        // reset cache
        cache.currentProjectPk = undefined;
      });

      // As soon as the connection is closed
      socket.on('disconnect', () => {
        if (log) console.log(socket.id + ' disconnected');

        // Unsubscribe the db listener
        streamSub.unsubscribe();
      });
    });
  });

  WarEntityPreview.search = function (
    projectId,
    searchString,
    pkClasses,
    entityType,
    limit,
    page,
    cb
  ) {
    // Check that limit does not exceed maximum
    if (limit > 200) {
      const err = {
        name: 'Max limit exceeded',
        status: 403,
        message: 'Max limit exceeded. The limit can not be bigger than 200.',
      };
      cb(err);
    }

    // set default if undefined
    var limit = limit ? limit : 10;

    var offset = limit * (page - 1);

    if (searchString) {
      var queryString = searchString
        .trim(' ')
        .split(' ')
        .map((word) => {
          return word + ':*';
        })
        .join(' & ');
    } else {
      var queryString = '';
    }

    var params = [];

    const addParam = (val) => {
      params.push(val);
      return '$' + params.length;
    };

    const addParams = (vals) => {
      return vals.map((val) => addParam(val)).join(',');
    };

    // // project filter
    // let whereProject;
    // if (projectId) {
    //   params.push(projectId);
    //   whereProject = 'AND fk_project = $' + params.length;
    // } else {
    //   whereProject = 'AND fk_project IS NULL';
    // }

    // data unit type filter
    // let whereEntityType = '';
    // if (entityType) {
    //   params.push(entityType);
    //   whereEntityType = 'AND entity_type = $' + params.length;
    // }

    // // class filter
    // let pkClassParamNrs;
    // if (pkClasses && pkClasses.length) {
    //   pkClassParamNrs = pkClasses
    //     .map((c, i) => '$' + (i + params.length + 1))
    //     .join(', ');
    //   params = [...params, ...pkClasses];
    // }

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
        from war.entity_preview,
        to_tsquery(${addParam(queryString)}) q
        WHERE 1=1
        ${
          queryString
            ? `AND (ts_vector @@ q OR pk_entity::text = ${addParam(
                searchString
              )})`
            : ''
        }
        ${
          projectId
            ? `AND fk_project = ${addParam(projectId)}`
            : `AND fk_project IS NULL`
        }
        ${!!entityType ? `AND entity_type = ${addParam(entityType)}` : ''}
        ${
          pkClasses && pkClasses.length
            ? `AND fk_class IN (${addParams(pkClasses)})`
            : ''
        }
        ORDER BY ts_rank(ts_vector, q) DESC, entity_label asc
        LIMIT ${addParam(limit)}
        OFFSET ${addParam(offset)};
        `;

    if (log) logSql(sql_stmt, params);

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
      data = resultObjects.map((searchHit) => {
        delete searchHit.total_count;
        return searchHit;
      });
    }

    if (!ctx.res._headerSent) {
      ctx.res.set('X-Total-Count', totalCount);

      ctx.result = {
        totalCount: totalCount,
        data: data,
      };
      next();
    } else {
      next();
    }
  });

  /**
   * Search for existing entities.
   * If not found for the given project, the repo version is returned
   */
  WarEntityPreview.searchExisting = function (
    pkProject,
    searchString,
    pkClasses,
    entityType,
    limit,
    page,
    cb
  ) {
    // Check that limit does not exceed maximum
    if (limit > 200) {
      const err = {
        name: 'Max limit exceeded',
        status: 403,
        message: 'Max limit exceeded. The limit can not be bigger than 200.',
      };
      cb(err);
    }
    const q = new SqlWarSearchExisiting(WarEntityPreview.app.models).create(
      pkProject,
      searchString,
      pkClasses,
      entityType,
      limit,
      page
    );
    const connector = WarEntityPreview.dataSource.connector;
    connector.execute(q.sql, q.params, (err, resultObjects) => {
      if (err) cb(err);
      else {
        cb(false, resultObjects[0].data);
      }
    });
  };

  /**
   * Search for existing entities.
   * If not found for the given project, the repo version is returned
   */
  WarEntityPreview.searchExistingWithRelatedStatement = function (
    pkProject,
    searchString,
    pkClasses,
    entityType,
    limit,
    page,
    relatedStatement,
    cb
  ) {
    // Check that limit does not exceed maximum
    if (limit > 200) {
      const err = {
        name: 'Max limit exceeded',
        status: 403,
        message: 'Max limit exceeded. The limit can not be bigger than 200.',
      };
      cb(err);
    }
    const q = new SqlWarSearchExisiting(WarEntityPreview.app.models).create(
      pkProject,
      searchString,
      pkClasses,
      entityType,
      limit,
      page,
      relatedStatement
    );
    const connector = WarEntityPreview.dataSource.connector;
    connector.execute(q.sql, q.params, (err, resultObjects) => {
      if (err) cb(err);
      else {
        cb(false, resultObjects[0].data);
      }
    });
  };

  WarEntityPreview.createAll = function (cb) {
    const sql_stmt = `
      SELECT war.warehouse_update_all();
    `;
    const connector = WarEntityPreview.dataSource.connector;

    var hrstart = process.hrtime();

    connector.execute(sql_stmt, [], (err, resultObjects) => {
      if (err) return cb(err);

      var hrend = process.hrtime(hrstart);
      cb(
        null,
        `All entity previews have been updated. Time spent: ${
          hrend[0]
        }s ${parseInt(hrend[1] / 1000000)}ms`
      );
    });
  };

  WarEntityPreview.paginatedListByPks = function (
    pkProject,
    pkEntities,
    limit,
    offset,
    cb
  ) {
    if (!limit) limit = 10;
    if (limit > 200) limit = 200;
    if (!offset) offset = 0;
    const params = [];
    const addParam = (param) => {
      params.push(param);
      return '$' + params.length;
    };
    const sql_stmt = `
      WITH tw1 AS (
        SELECT pk_entity, fk_project, fk_class, class_label, entity_label, time_span, entity_type
        FROM war.entity_preview
        WHERE pk_entity IN (${pkEntities.map((pk) => addParam(pk)).join(',')})
        AND fk_project = ${addParam(pkProject)}
        UNION
        SELECT pk_entity, fk_project, fk_class, class_label, entity_label, time_span, entity_type
        FROM war.entity_preview
        WHERE pk_entity IN (${pkEntities.map((pk) => addParam(pk)).join(',')})
        AND fk_project IS NULL
      ),
      tw2 AS (
        SELECT DISTINCT ON (pk_entity) *
        FROM tw1
        ORDER BY pk_entity, fk_project
      )
      SELECT *
      FROM tw2
      ORDER BY entity_label, class_label
      LIMIT ${addParam(limit)}
      OFFSET ${addParam(offset)}
    `;
    const connector = WarEntityPreview.dataSource.connector;

    connector.execute(sql_stmt, params, (err, resultObjects) => {
      if (err) return cb(err);
      cb(null, resultObjects);
    });
  };
};
