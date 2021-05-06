'use strict';
const _ = require('lodash');
const Promise = require('bluebird');
const helpers = require('../helpers');
var SqlBuilderLbModels = require('../../../dist/lb3/server/utils/sql-builder-lb-models')
  .SqlBuilderLbModels;
const models = require('../../server/server').models;

var SqlEntityPreviewList = require('../../../dist/lb3/server/sql-builders/sql-entity-preview-list')
  .SqlEntityPreviewList;

module.exports = function (InfStatement) {
  InfStatement.findOrCreateInfStatements = function (
    pk_project,
    statements,
    ctx
  ) {
    return new Promise((resolve, reject) => {
      const promiseArray = statements.map((statement, i) => {
        const context = {
          ...ctx,
          req: {
            ...ctx.req,
            body: {
              ...ctx.req.body[i],
            },
          },
        };

        return InfStatement.findOrCreateInfStatement(
          pk_project,
          statement,
          context
        );
      });
      Promise.map(promiseArray, (promise) => promise)
        .catch((err) => reject(err))
        .then((res) => {
          return resolve(_.flatten(res));
        });
    });
  };

  InfStatement.findOrCreateInfStatement = function (pkProject, statement, ctx) {
    return new Promise((resolve, reject) => {
      // the model to find or create
      let model = {
        // pk_entity: statement.pk_entity,
        fk_subject_info: statement.fk_subject_info,
        fk_subject_data: statement.fk_subject_data,
        fk_subject_tables_cell: statement.fk_subject_tables_cell,
        fk_subject_tables_row: statement.fk_subject_tables_row,
        fk_property: statement.fk_property,
        fk_property_of_property: statement.fk_property_of_property,
        fk_object_info: statement.fk_object_info,
        fk_object_data: statement.fk_object_data,
        fk_object_tables_cell: statement.fk_object_tables_cell,
        fk_object_tables_row: statement.fk_object_tables_row,
        // notes: statement.notes,
      };

      let reqStatement =
        ctx && ctx.req && ctx.req.body ? ctx.req.body : statement;
      const ctxWithoutBody = _.omit(ctx, ['req.body']);

      const subject = getSubject(pkProject, reqStatement, ctxWithoutBody);
      const object = getObject(pkProject, reqStatement, ctxWithoutBody);

      Promise.all([subject, object])
        .then(([subject, object]) => {
          // add the fk's to subject and to object we retrieved asyncronously
          model = {
            ...model,
            ...subject.fk,
            ...object.fk,
          };

          InfStatement._findOrCreateByValue(
            InfStatement,
            pkProject,
            model,
            reqStatement,
            ctxWithoutBody
          )
            .catch((err) => reject(err))
            .then((resArr) => {
              // add related models we retrieved asyncronously
              const result = {
                ...resArr[0],
                ...(subject.relatedModel || {}),
                ...(object.relatedModel || {}),
              };
              resolve(result);
            });
        })
        .catch((err) => reject(err));
    });
  };


  /**
   * Add statements to the project
   *
   * This query will not add any related entitie but the given statements
   *
   * @param pk_namespace
   * @param pk_project
   * @param pk_typed_class
   */
  InfStatement.addToProject = function (pk_project, pk_statements, ctx, cb) {
    if (!ctx.req.accessToken.userId)
      return Error('AccessToken.userId is missing');
    const accountId = ctx.req.accessToken.userId;
    const params = [parseInt(pk_project), accountId];

    const sql_stmt = `
      WITH
      -- Find the statements
      statements AS (
        select pk_entity, community_favorite_calendar as calendar
        from information.v_statement
        where pk_entity IN (${pk_statements.map((r) => r * 1)})
      )
      -- add the project relations
      insert into projects.v_info_proj_rel (fk_project, is_in_project, fk_entity, calendar, fk_last_modifier)
      SELECT $1, true, pk_entity, calendar, $2
      from statements;
      `;

    const connector = InfStatement.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      if (err) cb(err, resultObjects);

      const innerJoinThisProject = {
        $relation: {
          name: 'entity_version_project_rels',
          joinType: 'inner join',
          where: [
            'fk_project',
            '=',
            pk_project,
            'and',
            'is_in_project',
            '=',
            'true',
          ],
        },
      };

      const filter = {
        where: ['pk_entity', 'IN', pk_statements],
        include: {
          entity_version_project_rels: innerJoinThisProject,
          object_appellation: {
            $relation: {
              name: 'object_appellation',
              joinType: 'left join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
          },
          object_language: {
            $relation: {
              name: 'object_language',
              joinType: 'left join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
          },
          object_time_primitive: {
            $relation: {
              name: 'object_time_primitive',
              joinType: 'left join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
          },
          object_place: {
            $relation: {
              name: 'object_place',
              joinType: 'left join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
          },
          object_dimension: {
            $relation: {
              name: 'object_dimension',
              joinType: 'left join',
              orderBy: [
                {
                  pk_entity: 'asc',
                },
              ],
            },
          },
        },
      };

      InfStatement.findComplex(filter, cb);
    });
  };


  /**
   * Find statement by one of the params
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the statement
   */
  InfStatement.queryByParams = function (
    ofProject,
    pkProject,
    pkEntity,
    fkObjectInfo,
    fkSubjectInfo,
    pkProperty,
    cb
  ) {
    if (!pkEntity && !fkObjectInfo && !fkSubjectInfo) {
      return cb(
        'please provide at least a pkEntity, fkObjectInfo or fkSubjectInfo'
      );
    }

    const w = {
      pk_entity: pkEntity,
      fk_object_info: fkObjectInfo,
      fk_subject_info: fkSubjectInfo,
      fk_property: pkProperty,
    };
    let where = [];
    Object.keys(w)
      .filter((key) => !!w[key])
      .map((key, index, ar) => {
        let part = [key, '=', w[key]];
        if (index !== 0) part = ['AND', ...part];
        return part;
      })
      .forEach((part) => {
        where = [...where, ...part];
      });

    const filter = {
      where: where,
    };

    if (pkProject) {
      const joinThisProject = InfStatement.app.models.ProInfoProjRel.getJoinObject(
        ofProject,
        pkProject
      );
      // joinThisProject.$relation['select'] = false;
      filter['include'] = {
        entity_version_project_rels: joinThisProject,
      };
    }

    return InfStatement.findComplex(filter, (err, res) => {
      if (err) cb(err);
      res.forEach((statement) => {
        statement.fk_subject_tables_row = parseInt(
          statement.fk_subject_tables_row,
          10
        );
        statement.fk_subject_tables_cell = parseInt(
          statement.fk_subject_tables_cell,
          10
        );
        statement.fk_object_tables_row = parseInt(
          statement.fk_object_tables_row,
          10
        );
        statement.fk_object_tables_cell = parseInt(
          statement.fk_object_tables_cell,
          10
        );
      });
      cb(false, res);
    });
  };

  // /**
  //  * Get an nested object with everything needed to display the
  //  * links made from an entity towards sources and digitals.
  //  */
  // InfStatement.sourcesAndDigitalsOfEntity = function (
  //   ofProject,
  //   pkProject,
  //   pkEntity,
  //   cb
  // ) {
  //   const joinThisProject = InfStatement.app.models.ProInfoProjRel.getJoinObject(
  //     ofProject,
  //     pkProject
  //   );

  //   const filter = {
  //     where: ['fk_entity', '=', pkEntity],
  //     include: {
  //       entity_version_project_rels: joinThisProject,
  //       subject_chunk: {
  //         $relation: {
  //           name: 'subject_chunk',
  //           joinType: 'left join',
  //           orderBy: [
  //             {
  //               pk_entity: 'asc',
  //             },
  //           ],
  //         },
  //       },
  //     },
  //   };

  //   return InfStatement.findComplex(filter, (err, statements) => {
  //     if (err) return cb(err);

  //     const textPks = _.uniq(
  //       statements
  //         .filter((statement) => statement.subject_chunk)
  //         .map((statement) => statement.subject_chunk.fk_text)
  //     );

  //     if (!textPks.length) return cb(null, statements);

  //     InfStatement.app.models.DatDigital.findComplex(
  //       {
  //         where: ['pk_text', 'IN', textPks],
  //       },
  //       (err2, digitals) => {
  //         if (err2) return cb(err2);

  //         cb(null, {
  //           statements,
  //           digitals,
  //         });
  //       }
  //     );
  //   });
  // };
};
