'use strict'
module.exports = function (InfDataUnitPreview) {

    InfDataUnitPreview.search = function (projectId, searchString, pkClasses, limit, page, cb) {

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

        if(projectId) params.push(projectId);

        let pkClassParamNrs;
        if(pkClasses && pkClasses.length){
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
        ` +
        (queryString === '' ? '' : 'AND ts_vector @@ q') +
        `
        ` +
        (projectId ? 'AND fk_project = $4' : 'AND fk_project IS NULL') +
        `
        ` +
        ((pkClasses && pkClasses.length) ? `AND fk_class IN (${pkClassParamNrs})` : '') +
        `
        --AND entity_type = 'peIt'
        ORDER BY ts_rank(ts_vector, q) DESC, entity_label
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