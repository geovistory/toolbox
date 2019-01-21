'use strict'

var app = require('../../server/server');
var _ = require('lodash');


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
        if (newProjectPk !== cache.currentProjectPk) {
          socket.leave(cache.currentProjectPk);
          socket.join(newProjectPk);
          resetStreamedPks();
          cache.currentProjectPk = newProjectPk;
        }
      };


      // Get a entityPreview by pk_projekt and pk_entity and add pks (array of pk_entity) to streamedPks 
      socket.on('addToStrem', (data) => {
        let { pk_project, pks } = data;

        if (!pk_project) return console.warn('Please provide a pk_project');

        // verify that the socket is in the right room
        safeJoin(pk_project);

        if (pks && pks.length) {

          // extend the object of streamed pks
          pks.forEach(pk => extendStreamedPks(pk))

          console.log('request for EntityPreviews ' + JSON.stringify(pks) + ' by project ' + cache.currentProjectPk)

          // Query the entityPreview in DB
          WarEntityPreview.findComplex({ where: ['fk_project', '=', pk_project, 'AND', 'pk_entity', 'IN', pks] }, (err, projectItems) => {
            
            if(err) return new Error(err);

            if (projectItems) {

              // emit the ones found in Project
              projectItems.forEach(item => socket.emit('entityPreview', item))

              // query repo for the ones not (yet) in project
              const notInProject = _.difference(pks, projectItems.map(item => item.pk_entity))
              WarEntityPreview.findComplex({ where: ['fk_project', 'IS NULL', 'AND', 'pk_entity', 'IN', notInProject] }, (err, repoItems) => {

                // emit the ones found in Repo
                if (repoItems) repoItems.forEach(item => socket.emit('entityPreview', item))

              })
            }
          })
        }
      });

     const streamSub = WarEntityPreview.stream.subscribe(entityPreview => {
        // check if the changed entityPreview is in object of streamed pks 
        if (cache.streamedPks[entityPreview.pk_entity]) {
          socket
            .to(cache.currentProjectPk)
            .emit('entityPreview', entityPreview);
        }
      })

      // As soon as the client closes the project
      socket.on('leaveProjectRoom', () => {

        // leave the room
        socket.leave(cache.currentProjectPk)

        // reset cache
        cache.currentProjectPk = undefined;

      })

      // As soon as the connection is closed
      socket.on('disconnect', () => {

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

  })
}