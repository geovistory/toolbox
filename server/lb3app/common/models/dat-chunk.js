'use strict';
const _ = require('lodash');

const Promise = require('bluebird');
const logSql = require('../../server/scripts/log-deserialized-sql');

module.exports = function(DatChunk) {
  /**
   * Get the chunks related to the digital, with their statements.
   * @param {*} pkProject is needed for filtering the statements
   * @param {*} pkEntity the pk of the digital
   * @param {*} cb
   */
  DatChunk.ofDigital = function(pkProject, pkEntity, ctx, cb) {
    const joinThisProject = DatChunk.app.models.ProInfoProjRel.getJoinObject(
      true,
      pkProject
    );

    // returns one row with an array of primary keys of chunks of given digital
    const params = [pkProject, pkEntity];
    const sql_stmt = `
      WITH namespaces AS (
        SELECT pk_entity pk_namespace
        FROM data.namespace n
        WHERE n.fk_project = $1
      )
      SELECT  1, jsonb_agg(c.pk_entity) chunk_pks
      FROM data.chunk c
      JOIN data.digital d ON c.fk_text = d.pk_text
      JOIN namespaces n ON n.pk_namespace = d.fk_namespace
      WHERE d.pk_entity = $2
      GROUP BY 1
      `;
    // logSql(sql_stmt, params)
    const connector = DatChunk.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      if (err) return cb(err);

      // Q: are there any chunks?
      if (!resultObjects || !resultObjects.length) {
        return cb(false, []);
      }

      DatChunk.app.models.DatChunk.findComplex(
        {
          where: ['pk_entity', 'IN', resultObjects[0].chunk_pks],
          include: {
            outgoing_statements: {
              $relation: {
                name: 'outgoing_statements',
                joinType: 'left join',
                orderBy: [
                  {
                    pk_entity: 'asc',
                  },
                ],
              },
              entity_version_project_rels: joinThisProject,
            },
          },
        },
        cb
      );
    });
  };
};
