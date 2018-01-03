'use strict';

module.exports = function(EntityVersion) {
  EntityVersion.findOrCreateVersion = function (Model, projectId, dataObject, cb){

    const filter = {
      where: dataObject,
      include: {
        relation: "entity_version_project_rels",
        scope:{
          where:{
            fk_project: projectId
          }
        }
      }
    }

    const EntityVersionProjectRel = Model.app.models.EntityVersionProjectRel;

    const find = function(pkEntityVersionConcat){
      Model.findOne({
        where: {
          pk_entity_version_concat: pkEntityVersionConcat
        },
        include: {
          relation: "entity_version_project_rels",
          scope:{
            where:{
              fk_project: projectId
            }
          }
        }
      },(err, result) => {
        cb(err, [result])
      });
    };

    // Function to create and return a version
    const create = function(dataObject, epr){

      // Create a new version and return pk_entity_version_concat in the result
      Model.create(dataObject, (err, result) => {

        if(err){
          cb(err, result);
        }

        // if this is a new entity
        if (!dataObject.pk_entity){

          // Create a new EntityVersionProjectRel
          EntityVersionProjectRel.create({
            "fk_project": projectId,
            "fk_entity_version_concat": result.pk_entity_version_concat,
            "is_in_project": true
          }, (err, epr) => {
            if(err){
              cb(err, epr);
            }
            find(result.pk_entity_version_concat);
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
          keys.forEach(function(alias){

            if(epr[alias] && !properties[alias].generated){
              // add all properties to the newEpr, that are not generated
              newEpr[alias] = epr[alias];
            }
          })

          // change the entity_version_concat string
          newEpr.fk_entity_version_concat = result.pk_entity_version_concat

          // add the pk_entity_version_project_rel
          newEpr.pk_entity_version_project_rel = epr.pk_entity_version_project_rel; 

          // execute the query
          EntityVersionProjectRel.upsert(newEpr,(err, epr) => {
            if(err){
              cb(err, epr);
            }
            find(result.pk_entity_version_concat);
          });
        }

      })
    }



    // if this is not an existing entity
    if (!dataObject.pk_entity){
      // create a new entity (version)
      create(dataObject)
    }

    // else if this is an existing entity
    else if(dataObject.pk_entity){

      // Check if a version with this values exists
      Model.findOne(filter, (err, existingVersion) => {

        console.log(existingVersion);

        // If there is an existing version with this values, return it
        if(existingVersion){
          cb(err, [
            existingVersion
          ]);
        }

        // Else call the function to create and return a new entity version
        else{
          EntityVersionProjectRel.findOne({
            "where":{
              "fk_entity":dataObject.pk_entity,
              "fk_project":projectId
            }
          }, (err, epr) => {
            create(dataObject, epr);
          })
        }
      });
    }
  }
};
