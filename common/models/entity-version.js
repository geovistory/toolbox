'use strict';

const Promise = require('bluebird');

const HttpErrors = require('http-errors');

module.exports = function(EntityVersion) {


  EntityVersion.addToProject = function(projectId, data) {
    var res;
    var rej;
    return new Promise(function(resolve, reject) {
      res = resolve;
      rej = reject;

      let hasErr = false;

      if (!data.entity_version_project_rels) {
        rej();
        rej('There is no entity_version_project_rels.');
        console.log(data.pk_entity_version_concat + ' There is no entity_version_project_rels.')

        hasErr = true;
      }

      // throw error if not exactly one epr
      if (data.entity_version_project_rels.length !== 1) {
        rej('There must be excactly one entity_version_project_rels.');
        console.log(data.pk_entity_version_concat + ' There must be excactly one entity_version_project_rels.')
        hasErr = true;
      }

      // get the requestetEpr
      const requestedEpr = data.entity_version_project_rels[0];

      // throw error if projectId is not same as requestetEpr.projectId
      if (projectId !== requestedEpr.fk_project) {
        rej('The project given as query parameter must the same as in the entity_version_project_rel.');
        console.log(data.pk_entity_version_concat + ' The project given as query parameter must the same as in the entity_version_project_rel.')
        hasErr = true;
      }

      // throw error if version_concat keys don't match
      if (data.pk_entity_version_concat !== requestedEpr.fk_entity_version_concat) {
        rej('The pk_entity_version_concat of the entity must the same as in the entity_version_project_rel.');
        console.log(data.pk_entity_version_concat + ' The pk_entity_version_concat of the entity must the same as in the entity_version_project_rel.')
        hasErr = true;
      }

      if (!hasErr) {

        // Since persistent items can be connected to different roles
        // it is possible that there is already an epr between the given
        // project and the given pk_entity.

        const InfEntityProjectRel = EntityVersion.app.models.InfEntityProjectRel;
        // Search for an epr with that pk_entity and that projectId
        InfEntityProjectRel.findOrCreate({
              "where": {
                "fk_entity": data.pk_entity,
                "fk_project": projectId
              }
            },
            requestedEpr
          )
          .then(result => {
            const resultingEpr = result[0];
            const wasCreated = result[1];

            if (wasCreated) {

              res(resultingEpr);

            } else {

              const cb = function(err, instances) {
                if (err)
                  rej(err);
                res(instances);
              };

              resultingEpr.replaceAttributes(requestedEpr, cb);
            }

          })
          .catch(err => {
            rej(err)
          })
      }
    });

  }


  EntityVersion.findOrCreateVersion = function(Model, projectId, dataObject) {

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

    const find = function(pkEntityVersionConcat) {

      return Model.findOne({
          where: {
            pk_entity_version_concat: pkEntityVersionConcat
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
    const create = function(dataObject, epr) {

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
            keys.forEach(function(alias) {

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

  //TODO IS this still needed?
  EntityVersion.createRole = function(projectId, role, resultingEntity) {

    // … prepare the Role Model Constructor

    const InfRole = EntityVersion.app.models.InfRole;

    // … prepare the Role to create

    role.fk_entity = resultingEntity.pk_entity;

    // call the api to find or create the role that points to the peIt

    return InfRole.findOrCreateInfRole(projectId, role)

  };


};