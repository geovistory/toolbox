'use strict';
const Config = require('../../common/config/Config');
var FlatObjectQueryBuilder = require('../classes/FlatObjectQueryBuilder');

module.exports = function(ProTextProperty) {
  /**
   * Gets all labels of the project and the default configuration project
   *
   * @param fkProject the pk of the project that is requesting the default labels
   *
   * TODO: filter the labels of the default project according to the needs of the requesting project
   * (e.g. only the labels of properties and classes of the ontome profiles activated by the project)
   */
  ProTextProperty.ofProject = function(fkProject, ctx, cb) {
    const q = new FlatObjectQueryBuilder(ProTextProperty.app.models);
    const params = [fkProject];
    const sql = `
      WITH tw1 AS (
        SELECT ${q.createSelect('t1', 'ProTextProperty')}
        FROM projects.text_property t1
        WHERE fk_project = $1
        UNION ALL
        SELECT ${q.createSelect('t1', 'ProTextProperty')}
        FROM projects.text_property t1
        WHERE fk_project = 375669
      ),
      tw2 AS (
        SELECT
          ${q.createSelect('t1', 'InfLanguage')}
        FROM
          tw1
        CROSS JOIN
          information.v_language t1
        WHERE t1.pk_entity = tw1.fk_language
      ),
      text_property AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${q.createBuildObject('t1', 'ProTextProperty')} as objects
          FROM (
            SELECT * FROM tw1
          ) AS t1
        ) as t1
        GROUP BY true
      ),
      language AS (
        SELECT json_agg(t1.objects) as json
        FROM (
          select distinct on (t1.pk_entity)
          ${q.createBuildObject('t1', 'InfLanguage')} as objects
          FROM (
            SELECT * FROM tw2
          ) AS t1
        ) as t1
        GROUP BY true
      )
      SELECT
      json_build_object (
        'inf', json_strip_nulls(json_build_object(
          'language', language.json
        )),
        'pro', json_strip_nulls(json_build_object(
          'text_property', text_property.json
        ))
      ) as data
      FROM
      text_property
      LEFT JOIN language ON true;
    `;
    ProTextProperty.dataSource.connector.execute(
      sql,
      params,
      (err, resultObjects) => {
        if (err) return cb(err, resultObjects);
        cb(false, resultObjects[0].data);
      }
    );
  };

  ProTextProperty.bulkUpsert = function(fkProject, items, ctx) {
    return new Promise((resolve, reject) => {
      items.forEach(item => {
        if (item.fk_project != fkProject)
          return reject(
            'Array contained a item with an fk_project different from given pkProject'
          );
      });
      const promises = items.map(item => ProTextProperty.replaceOrCreate(item));

      Promise.all(promises)
        .catch(err => reject(err))
        .then(res => {
          const q = new FlatObjectQueryBuilder(ProTextProperty.app.models);

          const sql = `
            WITH tw1 AS (
              SELECT ${q.createSelect('t1', 'ProTextProperty')}
              FROM projects.text_property t1
              WHERE pk_entity IN (${q.addParams(
                res.map(item => item.pk_entity)
              )})
            ),
            tw2 AS (
              SELECT
                ${q.createSelect('t1', 'InfLanguage')}
              FROM
                tw1
              CROSS JOIN
                information.v_language t1
              WHERE t1.pk_entity = tw1.fk_language
            ),
            text_property AS (
              SELECT json_agg(t1.objects) as json
              FROM (
                select distinct on (t1.pk_entity)
                ${q.createBuildObject('t1', 'ProTextProperty')} as objects
                FROM (
                  SELECT * FROM tw1
                ) AS t1
              ) as t1
              GROUP BY true
            ),
            language AS (
              SELECT json_agg(t1.objects) as json
              FROM (
                select distinct on (t1.pk_entity)
                ${q.createBuildObject('t1', 'InfLanguage')} as objects
                FROM (
                  SELECT * FROM tw2
                ) AS t1
              ) as t1
              GROUP BY true
            )
            SELECT
            json_build_object (
              'inf', json_strip_nulls(json_build_object(
                'language', language.json
              )),
              'pro', json_strip_nulls(json_build_object(
                'text_property', text_property.json
              ))
            ) as data
            FROM
            text_property
            LEFT JOIN language ON true;
          `;
          ProTextProperty.dataSource.connector.execute(
            sql,
            q.params,
            (err, resultObjects) => {
              if (err) return reject(err);
              resolve(resultObjects[0].data);
            }
          );
        });
    });
  };

  ProTextProperty.bulkDelete = function(fkProject, items, ctx) {
    return new Promise((resolve, reject) => {
      items.forEach(item => {
        if (item.fk_project != fkProject)
          return reject(
            'Array contained a item with an fk_project different from given pkProject'
          );
        if (!item.pk_entity)
          return reject('Array contained a item without pk_entity');
      });
      const promises = items.map(item =>
        ProTextProperty.destroyAll(
          {
            pk_entity: item.pk_entity,
            fk_project: item.fk_project,
          },
          item
        )
      );

      Promise.all(promises)
        .catch(err => reject(err))
        .then(res => resolve(res));
    });
  };
};
