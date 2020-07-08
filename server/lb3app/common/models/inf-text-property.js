'use strict';
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = function(InfTextProperty) {
  InfTextProperty.findOrCreateInfTextProperties = function(
    pk_project,
    items,
    ctx
  ) {
    return new Promise((resolve, reject) => {
      const promiseArray = items.map((item, i) => {
        const context = {
          ...ctx,
          req: {
            ...ctx.req,
            body: {
              ...ctx.req.body[i],
            },
          },
        };

        return InfTextProperty.findOrCreateInfTextProperty(
          pk_project,
          item,
          context
        );
      });
      Promise.map(promiseArray, promise => promise)
        .catch(err => reject(err))
        .then(res => {
          return resolve(_.flatten(res));
        });
    });
  };

  InfTextProperty.findOrCreateInfTextProperty = function(pkProject, data, ctx) {
    return new Promise((resolve, reject) => {
      const dataObject = {
        quill_doc: data.quill_doc,
        fk_class_field: data.fk_class_field,
        fk_concerned_entity: data.fk_concerned_entity,
        fk_language: data.fk_language,
      };

      const requestedObj =
        ctx && ctx.req && ctx.req.body ? ctx.req.body : undefined;
      const ctxWithoutBody = _.omit(ctx, ['req.body']);

      InfTextProperty._findOrCreateByValue(
        InfTextProperty,
        pkProject,
        dataObject,
        requestedObj,
        ctxWithoutBody
      )
        .then(textProperties => {
          const txtProp = textProperties[0];
          InfTextProperty.app.models.InfLanguage.findById(txtProp.fk_language)
            .then(language => {
              txtProp.language = language;
              resolve([txtProp]);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  };

  InfTextProperty.findAlternativeTextProperties = function(
    pkProject,
    pkEntity,
    pkClassField,
    ctx,
    cb
  ) {
    const columns = [
      ...InfTextProperty.definition._ids.map(id => id.name),
      ...Object.keys(InfTextProperty.definition.properties),
    ];
    const params = [pkProject, pkEntity, pkClassField];
    const sql = `
      -- all
      SELECT ${columns.map(col => 't1.' + col).join(', ')}
      FROM information.text_property t1
      WHERE t1.fk_concerned_entity = $2
      AND t1.fk_class_field = $3

      EXCEPT
      --- all of project
      SELECT ${columns.map(col => 't1.' + col).join(', ')}
      FROM
        information.text_property t1,
        projects.info_proj_rel t2
      WHERE t1.fk_concerned_entity = $2
      AND t1.fk_class_field = $3
      AND t2.fk_entity = t1.pk_entity
      AND t2.fk_project = $1
      AND t2.is_in_project = true
      `;

    InfTextProperty.dataSource.connector.execute(
      sql,
      params,
      (err, resultObjects) => {
        if (err) return cb(err, resultObjects);

        if (resultObjects.length < 1) return cb(false, resultObjects);

        const filter = {
          where: ['pk_entity', 'IN', resultObjects.map(i => i.pk_entity)],
          include: {
            language: {
              $relation: {
                name: 'language',
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

        return InfTextProperty.findComplex(filter, cb);
      }
    );
  };
};
