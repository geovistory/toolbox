'use strict';
const Promise = require('bluebird');

const AnalysisRemotes = require('../../dist/server/analysis/analysis-remotes')
  .AnalysisRemotes;

const SqlBuilderLbModels = require('../../dist/server/utils/sql-builder-lb-models')
  .SqlBuilderLbModels;

module.exports = function(ProAnalysis) {
  /**
   * Run an analysis.
   */
  ProAnalysis.run = (...params) => {
    return new AnalysisRemotes(ProAnalysis.dataSource.connector).run(...params);
  };

  /**
   * Run and export an analysis.
   */
  ProAnalysis.runAndExport = (...params) => {
    return new AnalysisRemotes(ProAnalysis.dataSource.connector).runAndExport(
      ...params
    );
  };

  ProAnalysis.runAnalysisById = function(pkAnalysis) {};

  ProAnalysis.beforeRemote('bulkUpsert', function(ctx, unused, next) {
    // Check if we have a user id
    if (!ctx.req.accessToken.userId) {
      return next(new Error('AccesToken.userId is missing.'));
    }

    // Check if tehre is an array of analyses to upsert
    if (ctx.req.body && ctx.req.body.length) {
      for (let i = 0; i < ctx.req.body.length; i++) {
        const item = ctx.req.body[i];

        // Validate the analysis
        const error = AnalysisRemotes.validateProAnalysis(item);

        // stop and return if invalid
        if (error) {
          return next({ error });
        }

        // Add userid if valid
        item.fk_last_modifier = ctx.req.accessToken.userId;
      }
    } else {
      return next(new Error('Recieved empty array.'));
    }
    next();
  });

  ProAnalysis.bulkUpsert = function(pkProject, items) {
    return new Promise((resolve, reject) => {
      const promiseArray = items.map(item => {
        item.fk_project = pkProject;
        return ProAnalysis.upsert(item);
      });

      Promise.map(promiseArray, promise => promise)
        .catch(err => reject(err))
        .then(res => {
          if (!res || !res.length) return reject('No item upserted');
          ProAnalysis.findComplex(
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

  ProAnalysis.bulkDelete = function(pks, pkProject, ctx, cb) {
    if (!pks || !pks.length) return cb('No identifiers to delete provided');

    // Check if all items belong to the given project
    ProAnalysis.findComplex(
      {
        where: ['pk_entity', 'IN', pks],
      },
      (error, results) => {
        if (error) cb(error);
        else if (results.some(item => item.fk_project !== pkProject)) {
          cb({
            name: `Permission denied`,
            message: `Not all items you want to delete do belong to the project.`,
          });
        } else {
          // Delte all
          const promiseArray = pks.map(pk => ProAnalysis.deleteById(pk));
          Promise.map(promiseArray, promise => promise)
            .then(res => cb(null, res))
            .catch(err => cb(err));
        }
      }
    );
  };

  ProAnalysis.findPerIdAndVersionAndProject = function(
    fkProject,
    pkEntity,
    version,
    ctx,
    cb
  ) {
    const params = [];
    const addPram = param => {
      params.push(param);
      return '$' + params.length;
    };

    const columns = new SqlBuilderLbModels(ProAnalysis.app.models).getColumns(
      'ProAnalysis'
    );

    const sql = `
        WITH all_versions AS (
            SELECT *, true as is_latest from projects.analysis latest
            UNION
            SELECT *, false as is_latest  from projects.analysis_vt vt
        )
         SELECT
            ${columns
              .map(
                c => `
            all_versions.${c}`
              )
              .join(',')},
            vt.versions
            FROM all_versions
            LEFT JOIN (
                SELECT
                  pk_entity,
                  json_agg(entity_version ORDER BY entity_version DESC) versions
                FROM all_versions
                GROUP BY pk_entity
            ) AS vt ON vt.pk_entity = all_versions.pk_entity
            WHERE all_versions.fk_project = ${addPram(fkProject)}
            ${
              pkEntity
                ? `AND all_versions.pk_entity = ${addPram(pkEntity)}`
                : ''
            }
            ${
              version
                ? `AND entity_version = ${addPram(version)}`
                : `AND all_versions.is_latest = ${addPram(true)}`
            }
          `;

    ProAnalysis.dataSource.connector.execute(
      sql,
      params,
      (err, resultObjects) => {
        if (err) return cb(err, resultObjects);
        cb(false, resultObjects);
      }
    );
  };
};
