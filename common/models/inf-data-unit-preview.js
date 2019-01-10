'use strict'

var app = require('../../server/server');

module.exports = function (InfDataUnitPreview) {

  const dataUnitPreviews = {
    '25972': { hello: 'I am DataUnit Preview 25972' },
    '25973': { hello: 'I am DataUnit Preview 25973' },
    '25974': { hello: 'I am DataUnit Preview 25974' },
    '25975': { hello: 'I am DataUnit Preview 25975' },
  };


  app.on('io-ready', (io) => {
    io.of('/InfDataUnitPreview').on('connection', (socket) => {
      console.log('new connection ' + socket.id)

      // Connection Cache
      const cache = {
        currentProjectPk: undefined, // the gevistory project
        streamedPks: {} // the dataUnitPreviews streamed
      }

      // Reset streamedPks Cache
      const resetStreamedPks = pkEntity => {
        cache.streamedPks = {};
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

      // Manage the set of streamed pks
      const extendStreamedPks = pkEntity => {
        cache.streamedPks[pkEntity] = true;
      }

      // Get a dataUnitPreview by pk_projekt and pk_entity and add pks (array of pk_entity) to streamedPks 
      socket.on('addToStrem', (data) => {
        let { pk_project, pks } = data;

        if (!pk_project) return console.warn('Please provide a pk_project');

        // verify that the socket is in the right room
        safeJoin(pk_project);

        if (pks && pks.length) {

          // extend the object of streamed pks
          pks.forEach(pk => extendStreamedPks(pk))

          console.log('request for DataUnitPreviews ' + JSON.stringify(pks) + ' by project ' + cache.currentProjectPk)

          // TODO: query and emit the dataUnitPreview in DB
          pks.forEach(pk => socket.emit('preview', dataUnitPreviews[pk]))
        }
      });


      // Emit DB updates on data_unit_preview to the clients
      // TODO: Replace this function with the Subscription to the Postgres Listener
      const dbListener = setInterval(() => {
        console.log('update from postgres for project ' + cache.currentProjectPk +
          ' connection ' + socket.id +
          ' is connected ' + socket.connected +
          ' streaming ' + JSON.stringify(cache.streamedPks)
        )

        const pk_entity = '25972'; // TODO delete 

        // check if the changed dataUnitPreview is in object of streamed pks 
        if (cache.streamedPks[pk_entity]) {
          socket
            // .to(cache.currentProjectPk)
            .emit('preview', {
              proj: cache.currentProjectPk,
              du: dataUnitPreviews[pk_entity]
            });
        }
      }, 2000)


      // As soon as the connection is closed
      socket.on('disconnect', () => {

        // Unsubscribe the db listener 
        dbListener.close()
        
      })
    })
  })



  InfDataUnitPreview.search = function (projectId, searchString, pkClasses, entityType, limit, page, cb) {

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
        pk_type,
        time_span,
        ts_headline(full_text, q) as full_text_headline,
        ts_headline(class_label, q) as class_label_headline,
        ts_headline(entity_label, q) as entity_label_headline,
        ts_headline(type_label, q) as type_label_headline,
        count(pk_entity) OVER() AS total_count
        from information.vm_data_unit_preview,
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

    const connector = InfDataUnitPreview.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      cb(err, resultObjects);
    });
  };


  InfDataUnitPreview.afterRemote('search', function (ctx, resultObjects, next) {

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