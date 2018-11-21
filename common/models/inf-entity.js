'use strict';

const Promise = require('bluebird');

const HttpErrors = require('http-errors');

module.exports = function (InfEntity) {



  InfEntity.changeProjectRelation = function (projectId, isInProject, data) {
    var res;
    var rej;
    return new Promise(function (resolve, reject) {
      res = resolve;
      rej = reject;

      let hasErr = false;

      // If no epr delivered, return nothing
      if (!data.entity_version_project_rels) {
        res([]);
      } else if (data.entity_version_project_rels.length > 1) {
        var newEpr = {
          "fk_entity": data.pk_entity,
          "fk_project": projectId,
          "is_in_project": isInProject,
          "calendar": null
        };
      } else {

        // get the requestetEpr
        var requestedEpr = data.entity_version_project_rels[0];


        // create the Epr while is_in_project from the provided object overrides
        // the query parameter isInProject. This allows to specify it,
        // when necessary and let it undefined, in order to use the query param.
        var newEpr = {
          "fk_entity": data.pk_entity,
          "fk_project": projectId,

          // use the requested value or the one given by the api call
          "is_in_project": [requestedEpr.is_in_project, isInProject].find(item => item !== undefined),

          "calendar": requestedEpr.calendar || null
        };
      }

      if (!hasErr) {

        // Since persistent items can be connected to different roles
        // it is possible that there is already an epr between the given
        // project and the given pk_entity.

        const InfEntityProjectRel = InfEntity.modelBuilder.models.InfEntityProjectRel;
        // Search for an epr with that pk_entity and that projectId
        InfEntityProjectRel.findOrCreate({
          "where": {
            "fk_entity": data.pk_entity,
            "fk_project": projectId
          }
        },
          newEpr
        )
          .then(result => {
            const resultingEpr = result[0];
            const wasCreated = result[1];

            if (wasCreated) {

              res(resultingEpr);

            } else {

              const cb = function (err, instances) {
                if (err)
                  rej(err);
                res(instances);
              };

              resultingEpr.patchAttributes(newEpr, cb);
            }

          })
          .catch(err => {
            rej(err)
          })
      }
    });

  }


  /**
   * Finds or creates an InfPersistentItem or InfTemporalEntity.
   * 
   * The pk_entity is relevant for finding or creating an entity. 
   * - Provide no pk_entity to create a new record.
   * - Provide a pk_entity to find a record. If no record is found, an error is thrown. 
   * 
   * The requstedObject is relevant for related models.
   * - Provide a entity_version_project_rel[0] to customize the project relation
   * - Provide pi_roles or te_roles to findOrCreate the roles and its children
   * 
   * Remark: To findOrCreate a role or an object (InfRole; InfTimePrimitive, InfAppellation, ...), use findOrCreateObjectOrRole
   * 
   * @param {LoopackModel} Model The loopback model InfPersistentItem or InfTemporalEntity.
   * @param {number} projectId the project id
   * @param {any} dataObject the data object containing the values we check for existing entities (pk_entity) or to create (notes)
   * @param {any} requestedObject [optional] plain object. 
   */
  InfEntity.findOrCreatePeItOrTeEnt = function (Model, projectId, dataObject, requestedObject) {

    // cleanup data object: remove all undefined properties to avoid creating e.g. pk_entity = undefined 
    Object.keys(dataObject).forEach(key => {
      if (dataObject[key] == undefined) {
        delete dataObject[key]
      }
    })

    const InfEntityProjectRel = Model.app.models.InfEntityProjectRel;

    const filter = {
      where: dataObject,
      include: {
        relation: "entity_version_project_rels",
        scope: {
          where: {
            fk_project: projectId
          }
        }
      }
    }

    const find = function (pk_entity) {
      //find the entity and include the epr
      return Model.findOne({
        where: {
          pk_entity: pk_entity
        },
        include: {
          relation: "entity_version_project_rels",
          scope: {
            where: {
              fk_project: projectId
            }
          }
        }
      }).then((res) => {
        return [res];
      })
        .catch(err => err);
    }


    // If there is a pk_entity, find the record
    if (dataObject.pk_entity) {
      //find the entity and include the epr
      return Model.findOne({
        where: {
          pk_entity: dataObject.pk_entity
        },
        include: {
          relation: "entity_version_project_rels",
          scope: {
            where: {
              fk_project: projectId
            }
          }
        }
      }).then((res) => {
        return [res];
      }).catch(err => err);
    }

    // If there is no pk_entity, create the record
    else {
      return Model.create(dataObject).catch((err) => {
        return err;
      })
        .then((resultingEntity) => {
          if (!resultingEntity) return Error('Something went wrong with createing a peIt or TeEnt');

          // create the project relation

          let reqEpr = {};

          // create a new epr 
          var newEpr = new InfEntityProjectRel({
            "fk_entity": resultingEntity.pk_entity,

            "fk_project": projectId,

            // use the requested value or true
            "is_in_project": [reqEpr.is_in_project, true].find(item => item !== undefined),
          })

          // persist epr in DB
          return newEpr.save().then(resultingEpr => {
            return find(resultingEpr.fk_entity)
          });

        })
    }


  };


  /**
   * Finds or creates an entity role or an object by value
   * 
   * Those Models use this method:
   * InfChunk, InfEntityAssociation
   * 
   * Those Models still use the entity_version which is deprecated:
   * InfRole, InfTimePrimitive, InfAppellation, InfLanguage
   *
   * The data object is relevant for finding a record. 
   * - Provide a data object with all values relevant to uniquely identify this type of record.
   * - The method will remove the pk_entity from the data object, if one is provided accidentially.
   *
   * Explanation: The values of roles and objects are unique. For example, there can't be two roles with 
   * the same fk_entity and fk_temporal_entity, and there can't be two timePrimitives with the same values. 
   * Therefore the 'unique identifier' relevant to findOrCreate are the values of the objects, not the pk_entity. 
   * 
   * Remark: To find or create a role or an object (e.g. InfRole, InfTimePrimitive or InfAppellation), use find or create object
   * 
   * @param {LoopackModel} Model The loopback model like e.g. InfRole
   * @param {number} projectId the project id
   * @param {any} dataObject the data object containing the values we check for existing entities
   * @param {any} requestedObject [optional] plain object. Provide a epr to customize the project relation    
   */
  InfEntity.findOrCreateByValue = function (Model, projectId, dataObject, requestedObject) {

    // make sure no pk_entity is used for findOrReplace below
    delete dataObject.pk_entity;

    const InfEntityProjectRel = Model.app.models.InfEntityProjectRel;

    const filter = {
      where: dataObject,
      include: {
        relation: "entity_version_project_rels",
        scope: {
          where: {
            fk_project: projectId
          }
        }
      }
    }

    const find = function (pk_entity) {
      //find the entity and include the epr
      return Model.findOne({
        where: {
          pk_entity: pk_entity
        },
        include: {
          relation: "entity_version_project_rels",
          scope: {
            where: {
              fk_project: projectId
            }
          }
        }
      }).then((res) => {
        return [res];
      })
        .catch(err => err);
    }

    // Find or create an entity with this values
    return Model.create(dataObject)
      .catch((err) => {
        return err;
      })
      .then((resultingEntity) => {

        // let resultingEntity = result[0];

        // Search for eprs to given project
        return resultingEntity.entity_version_project_rels({
          where: {
            fk_project: projectId
          }
        }).then(eprs => {


          let existingEpr = eprs[0] ? eprs[0] : {};

          let reqEpr = {};
          if (requestedObject) {
            if (requestedObject.entity_version_project_rels) {
              reqEpr = requestedObject.entity_version_project_rels[0];
            }
          }

          // create a new epr 
          var newEpr = new InfEntityProjectRel({
            "fk_entity": resultingEntity.pk_entity,
            "fk_project": projectId,

            // use the requested value, or the existing or true
            "is_in_project": [reqEpr.is_in_project, existingEpr.is_in_project, true].find(item => item !== undefined),

            // use the requested value, or the existing or false
            "is_standard_in_project": [reqEpr.is_standard_in_project, existingEpr.is_standard_in_project, false].find(item => item !== undefined),

            // use the requested value, or the existing or undefined
            "calendar": reqEpr.calendar || existingEpr.calendar || undefined,
          })


          // if epr to given project exisiting
          if (eprs.length > 0) {

            // add the pk
            newEpr.pk_entity_version_project_rel = existingEpr.pk_entity_version_project_rel;

            // update it in DB
            return InfEntityProjectRel.upsert(newEpr).then(resultingEpr => {
              return find(resultingEpr.fk_entity)
            });
          }
          else {

            // create it in DB
            return newEpr.save().then(resultingEpr => {
              return find(resultingEpr.fk_entity)
            });
          }

        })

      });


  };

};