'use strict';

const HttpErrors = require('http-errors');

module.exports = function(EntityVersion) {
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

    const EntityVersionProjectRel = Model.app.models.EntityVersionProjectRel;

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

            // Create a new EntityVersionProjectRel
            return EntityVersionProjectRel.create({
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
            // Update the existing EntityVersionProjectRel

            // prepare a new epr object
            let newEpr = {}

            // get properties of the epr model definition
            const properties = EntityVersionProjectRel.definition.properties;

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
            return EntityVersionProjectRel.upsert(newEpr)
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
            return existingVersion;
          }

          // Else call the function to create and return a new entity version
          else {

            return EntityVersionProjectRel.findOne({
                "where": {
                  "fk_entity": dataObject.pk_entity,
                  "fk_project": projectId
                }
              })
              .catch((err) => {
                return err;
              })
              .then((epr) => {
                if(!epr){

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


  EntityVersion.createRole = function(projectId, role, resultingEntity) {

        // … prepare the Role Model Constructor

        const InformationRole = EntityVersion.app.models.InformationRole;

        // … prepare the Role to create

        role.fk_entity = resultingEntity.pk_entity;

        // call the api to find or create the role that points to the peIt

        return InformationRole.findOrCreateInformationRole(projectId, role)

  };


};