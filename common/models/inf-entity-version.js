'use strict';

const Promise = require('bluebird');

const HttpErrors = require('http-errors');

module.exports = function (InfEntityVersion) {


  InfEntityVersion.changeProjectRelation = function (projectId, isInProject, data) {
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
          "is_standard_in_project": null,
          "fk_entity_version_concat": data.pk_entity_version_concat,
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
          "is_in_project": requestedEpr.is_in_project || isInProject,
          "is_standard_in_project": requestedEpr.is_standard_in_project || null,
          "fk_entity_version_concat": data.pk_entity_version_concat,
          "calendar": requestedEpr.calendar || null
        };
      }

      if (!hasErr) {

        // Since persistent items can be connected to different roles
        // it is possible that there is already an epr between the given
        // project and the given pk_entity.

        const InfEntityProjectRel = InfEntityVersion.app.models.InfEntityProjectRel;
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

              resultingEpr.replaceAttributes(newEpr, cb);
            }

          })
          .catch(err => {
            rej(err)
          })
      }
    });

  }


  InfEntityVersion.findOrCreateVersion = function (Model, projectId, dataObject) {

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

    const InfEntityProjectRel = Model.app.models.InfEntityProjectRel;

    const find = function (pkInfEntityVersionConcat) {

      return Model.findOne({
        where: {
          pk_entity_version_concat: pkInfEntityVersionConcat
        },
        include: {
          relation: "entity_version_project_rels",
          scope: {
            where: {
              fk_project: projectId
            }
          }
        }
      })
        .then((res) => {
          return [res];
        })
        .catch(err => err);

    };

    // Function to create and return a version
    const create = function (dataObject, epr) {

      // Create a new version and return pk_entity_version_concat in the result
      return Model.create(dataObject)
        .catch((err) => {

          return err;
        })
        .then((result) => {

          // if this is a new entity
          if (!dataObject.pk_entity) {

            // Create a new InfEntityProjectRel
            return InfEntityProjectRel.create({
              "fk_project": projectId,
              "fk_entity_version_concat": result.pk_entity_version_concat,
              "is_in_project": true
            }).catch((err) => {
              return err
            })
              .then((epr) => {
                return find(epr.fk_entity_version_concat);
              });

          }
          // if this is a new version of the entity
          else {
            // Update the existing InfEntityProjectRel

            // prepare a new epr object
            let newEpr = {}

            // get properties of the epr model definition
            const properties = InfEntityProjectRel.definition.properties;

            // get the keys (property names) of the properties
            const keys = Object.keys(properties);

            // iterate over the keys
            keys.forEach(function (alias) {

              if (epr[alias] && !properties[alias].generated) {
                // add all properties to the newEpr, that are not generated
                newEpr[alias] = epr[alias];
              }
            })

            // change the entity_version_concat string
            newEpr.fk_entity_version_concat = result.pk_entity_version_concat

            // add the pk_entity_version_project_rel
            newEpr.pk_entity_version_project_rel = epr.pk_entity_version_project_rel;

            // execute the query
            return InfEntityProjectRel.upsert(newEpr)
              .catch((err) => {
                return err
              })
              .then((epr) => {
                return find(epr.fk_entity_version_concat);
              });

          }
        });
    }




    // if this is not an existing entity
    if (!dataObject.pk_entity) {
      // create a new entity (version)
      return create(dataObject)
    }

    // else if this is an existing entity
    else if (dataObject.pk_entity) {

      // Check if a version with this values exists
      return Model.findOne(filter)
        .catch((err) => {
          return err;
        })
        .then((existingVersion) => {
          console.log(existingVersion);

          // If there is an existing version with this values, return it
          if (existingVersion) {

            return [existingVersion];
          }

          // Else call the function to create and return a new entity version
          else {

            return InfEntityProjectRel.findOne({
              "where": {
                "fk_entity": dataObject.pk_entity,
                "fk_project": projectId
              }
            })
              .catch((err) => {
                return err;
              })
              .then((epr) => {
                if (!epr) {

                  // If doesn't find one epr, the entity that was not part of
                  // the project with the given projectId.
                  // To prevent this happening, throw an error here.
                  return new HttpErrors.BadRequest('error: the entity you want to modify is not part of your project.');
                }
                return create(dataObject, epr);
              });
          }
        })
    };

  };


  /**
   * Finds or creates an entity.
   * 
   * The data object is relevant for finding an entity. 
   * - Provide a pk_entity for entities that have only an pk to identify themselfes (e.g. PeIt or TeEnt)
   * - Provide no pk_entity if you want to find a value-like item (e.g. TimePrimitive or Appellation)
   * 
   * @param {LoopackModel} Model The loopback model like e.g. InfRole
   * @param {number} projectId the project id
   * @param {any} dataObject the data object containing the values we check for existing entities
   * @param {any} requestedObject [optional] plain object. Provide a entity_version_project_rel to customize the project relation    
   */
  InfEntityVersion.findOrCreateEntity = function (Model, projectId, dataObject, requestedObject) {

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

    const find = function (pk_entity_version_concat) {
      //find the entity and include the epr
      return Model.findOne({
        where: {
          pk_entity_version_concat: pk_entity_version_concat
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
    return Model.findOrCreate(filter, dataObject)
      .catch((err) => {
        return err;
      })
      .then((result) => {

        console.log(result);

        let resultingEntity = result[0];

        // Search for eprs to given project
        return resultingEntity.entity_version_project_rels({
          where: {
            fk_project: projectId
          }
        }).then(eprs => {


          let existingEpr = eprs[0] ? eprs[0] : {};

          let reqEpr = {};
          if (requestedObject)
            if (requestedObject.entity_version_project_rels)
              reqEpr = requestedObject.entity_version_project_rels[0];


          // create a new epr 
          var newEpr = new InfEntityProjectRel({
            "fk_entity": resultingEntity.pk_entity,
            "fk_entity_version_concat": resultingEntity.pk_entity_version_concat,
            "fk_project": projectId,

            // use the requested value, or the existing or true
            "is_in_project": reqEpr.is_in_project || existingEpr.is_in_project || true,

            // use the requested value, or the existing or false
            "is_standard_in_project": reqEpr.is_standard_in_project || existingEpr.is_standard_in_project || false,

            // use the requested value, or the existing or undefined
            "calendar": reqEpr.calendar || existingEpr.is_standard_in_project || undefined,
          })


          // if epr to given project exisiting
          if (eprs.length > 0) {

            // add the pk
            newEpr.pk_entity_version_project_rel = existingEpr.pk_entity_version_project_rel;

            // update it in DB
            return InfEntityProjectRel.upsert(newEpr).then(resultingEpr => {
              return find(resultingEpr.fk_entity_version_concat)
            });
          }
          else {

            // create it in DB
            return newEpr.save().then(resultingEpr => {
              return find(resultingEpr.fk_entity_version_concat)
            });
          }

        })

      });


  };


  //TODO IS this still needed?
  InfEntityVersion.createRole = function (projectId, role, resultingEntity) {

    // … prepare the Role Model Constructor

    const InfRole = InfEntityVersion.app.models.InfRole;

    // … prepare the Role to create

    role.fk_entity = resultingEntity.pk_entity;

    // call the api to find or create the role that points to the peIt

    return InfRole.findOrCreateInfRole(projectId, role)

  };


};