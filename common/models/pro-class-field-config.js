/* eslint-disable camelcase */
'use strict';
var FlatObjectQueryBuilder = require('../classes/FlatObjectQueryBuilder');

module.exports = function(ProClassFieldConfig) {
  ProClassFieldConfig.ofProject = function(pkProject, ctx, cb) {
    const q = new FlatObjectQueryBuilder(ProClassFieldConfig.app.models);

    const sql = `
    WITH tw1 AS (
      SELECT * FROM
      projects.class_field_config
      WHERE fk_project = 375669 -- Default Configuration Project
      UNION ALL
      SELECT * FROM
      projects.class_field_config
      WHERE fk_project = $1
    )
    SELECT
    -- DISTINCT ON (
    --    tw1.fk_app_context,
    --    tw1.fk_property,
    --    tw1.property_is_outgoing,
    --    tw1.fk_class_field,
    --    tw1.fk_class_for_class_field
    --   )
    ${q.createSelect('tw1', 'ProClassFieldConfig')}
      FROM
      tw1
    WHERE
      tw1.ord_num IS NOT NULL
      ORDER BY
       tw1.fk_app_context,
       tw1.fk_property,
       tw1.property_is_outgoing,
       tw1.fk_class_field,
       tw1.fk_class_for_class_field,
       tw1.ord_num,
       tw1.fk_project;
    `;

    ProClassFieldConfig.dataSource.connector.execute(
      sql,
      [pkProject],
      (err, resultObjects) => {
        if (err) return cb(err, resultObjects);
        cb(false, resultObjects);
      }
    );
  };

  ProClassFieldConfig.bulkDelete = function(pks, ctx, cb) {
    const promiseArray = pks.map(pk => ProClassFieldConfig.deleteById(pk));
    return Promise.map(promiseArray, promise => promise);
  };

  ProClassFieldConfig.bulkUpsert = function(fkProject, items) {
    return new Promise((resolve, reject) => {
      const promiseArray = items.map(item => {
        item.fk_project = fkProject;

        return ProClassFieldConfig.upsert(item);
      });

      Promise.all(promiseArray)
        .catch(err => reject(err))
        .then(res => {
          if (!res || !res.length) return reject('No item upserted');
          ProClassFieldConfig.findComplex(
            {
              where: ['pk_entity', 'IN', res.map(item => item.pk_entity)],
            },
            (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }
          );
        });
    });
  };

  ProClassFieldConfig.on('attached', function() {
    ProClassFieldConfig.patchOrCreate = function(data, cxt, cb) {
      var sql;
      var params = [];
      function addParam(val) {
        params.push(val);
        return '$' + params.length;
      }
      if (data.pk_entity) {
        sql = `
          UPDATE projects.class_field_config
          SET
            fk_app_context = ${addParam(data['fk_app_context'])},
            fk_class_field = ${addParam(data['fk_class_field'])},
            fk_class_for_class_field = ${addParam(
              data['fk_class_for_class_field']
            )},
            fk_project = ${addParam(data['fk_project'])},
            fk_property = ${addParam(data['fk_property'])},
            ord_num = ${addParam(data['ord_num'])},
            property_is_outgoing = ${addParam(data['property_is_outgoing'])}
          WHERE pk_entity = ${addParam(data['pk_entity'])}
          RETURNING *;
        `;
      } else {
        sql = `
        INSERT INTO projects.class_field_config (
          fk_app_context,
          fk_class_field,
          fk_class_for_class_field,
          fk_project,
          fk_property,
          fk_domain_class,
          fk_range_class,
          ord_num,
          property_is_outgoing
        ) VALUES (
          ${addParam(data['fk_app_context'])},
          ${addParam(data['fk_class_field'])},
          ${addParam(data['fk_class_for_class_field'])},
          ${addParam(data['fk_project'])},
          ${addParam(data['fk_property'])},
          ${addParam(data['ord_num'])},
          ${addParam(data['property_is_outgoing'])}
        )


      `;
      }

      ProClassFieldConfig.dataSource.connector.execute(
        sql,
        params,
        (err, resultObjects) => {
          if (err) return cb(err, resultObjects);
          cb(false, resultObjects);
        }
      );
    };
  });
};
