'use strict';
const Promise = require('bluebird');
var SqlBuilderLbModels = require('../../dist/server/utils/sql-builder-lb-models')
  .SqlBuilderLbModels;

module.exports = function(ProInfoProjRel) {
  ProInfoProjRel.markRoleAsFavorite = function(
    pkProject,
    pkRole,
    isOutgoing,
    cb
  ) {
    const params = [pkRole, pkProject];
    const q = new SqlBuilderLbModels(ProInfoProjRel.app.models);
    const sql = `
      WITH tw1 AS (
        UPDATE projects.info_proj_rel t1
        SET ${isOutgoing ? 'ord_num_of_range' : 'ord_num_of_domain'} =
          CASE t3.pk_entity
          WHEN $1 THEN 0
          ELSE null END
        FROM
        information.role t2,
        information.role t3
        WHERE
        t2.Pk_entity = $1
        AND
        t3.${isOutgoing ? 'fk_temporal_entity' : 'fk_entity'} =
        t2.${isOutgoing ? 'fk_temporal_entity' : 'fk_entity'}
        AND
        t3.fk_property = t2.fk_property
        AND
        t1.fk_entity = t3.pk_entity
        AND
        t1.fk_project = $2
        AND  ${
          isOutgoing ? 'ord_num_of_range' : 'ord_num_of_domain'
        }  IS DISTINCT FROM (CASE t3.pk_entity WHEN $1 THEN 0 ELSE null END)
        RETURNING t1.*
      )
      SELECT
        ${q.createSelect('tw1', 'ProInfoProjRel')}
      FROM tw1;
    `;

    const connector = ProInfoProjRel.dataSource.connector;
    connector.execute(sql, params, (err, resultObjects) => {
      if (err) return cb(err, resultObjects);
      cb(null, resultObjects);
    });
  };

  /**
   * Updates the epr with provided eprAttributes, where the epr has
   * fk_project = projectId AND
   * fk_entity = pkEntity
   *
   *
   * Remark:
   * You can change all epr attributes except fk_project and fk_entity
   *
   * @param {*} projectId
   * @param {*} pkEntity
   * @param {*} eprAttributes
   */
  ProInfoProjRel.updateEprAttributes = function(
    pkProject,
    pkEntity,
    eprAttributes,
    ctx
  ) {
    return new Promise((resolve, reject) => {
      if (!ctx.req.accessToken.userId)
        return reject(Error('AccessToken missing'));
      const accountId = ctx.req.accessToken.userId;

      if (!pkEntity) return reject('pkEntity missing');
      if (!pkProject) return reject('pkProject missing');

      if (eprAttributes['fk_entity']) {
        delete eprAttributes['fk_entity'];
      }

      if (eprAttributes['fk_project']) {
        delete eprAttributes['fk_project'];
      }

      eprAttributes.fk_last_modifier = accountId;

      // check if there is an existing epr
      return ProInfoProjRel.findOne({
        where: {
          fk_entity: pkEntity,
          fk_project: pkProject,
        },
      })
        .catch(err => reject(err))
        .then(existingEpr => {
          if (existingEpr) {
            // update existing epr
            return existingEpr
              .updateAttributes(eprAttributes)
              .catch(err => reject(err))
              .then(res => resolve(res));
          } else {
            const error = new Error(
              'No ProInfoProjRel found for given project and entity'
            );
            error.status = 404;
            reject(error);
          }
        });
    });
  };

  ProInfoProjRel.bulkUpdateEprAttributes = function(pkProject, items, ctx) {
    const promiseArray = items.map(item => {
      let pkEntity;
      if (item.fk_entity) pkEntity = item.fk_entity;
      if (item.fk_project && item.fk_project != pkProject) {
        return new Error(
          'fk_project of ProInfoProjRel references other project than given pkProject'
        );
      }
      return ProInfoProjRel.updateEprAttributes(pkProject, pkEntity, item, ctx);
    });
    return Promise.map(promiseArray, promise => promise);
  };

  /**
   * Internal function to create the $relation property of
   * a filter object for findComplex() to join the entity_version_project_rels.
   *
   * Usage: add the returned object to the entity_version_project_rels property of
   * any information.entity derivate, e.g.
   * {
   *  ...
   *  entity_version_project_rels: ProInfoProjRel.getJoinObject(true, 12)
   * }
   */
  ProInfoProjRel.getJoinObject = function(ofProject, pkProject) {
    return {
      $relation: {
        name: 'entity_version_project_rels',
        joinType: ofProject ? 'inner join' : 'left join',
        where: [
          'fk_project',
          '=',
          pkProject,
          'and',
          'is_in_project',
          '=',
          'true',
        ],
      },
    };
  };

  ProInfoProjRel.beforeRemote('patchOrCreate', function(ctx, unused, next) {
    if (!ctx.args.options.accessToken.userId)
      return Error('AccesToken.userId is missing.');
    ctx.args.data.fk_last_modifier = ctx.args.options.accessToken.userId;

    next();
  });
};
