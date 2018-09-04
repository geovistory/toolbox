'use strict';

module.exports = function(InfDigitalObject) {

  InfDigitalObject.findOrCreateDigitObj = function(projectId, data, ctx) {

    const dataObject = {
      pk_entity: data.pk_entity,
      js_quill_data: data.js_quill_data,
      notes: data.notes,
      fk_class: data.fk_class
    };

    return InfDigitalObject.findOrCreatePeItOrTeEnt(InfDigitalObject, projectId, dataObject)

  }


   /**
    * nestedObjectOfProject - get a rich object of the entityAssociation with its
    * domain and range entity
   *
   * @param  {number} pkProject primary key of project
   * @param  {number} pkEntity  pk_entity of the entityAssociation
   */
  InfDigitalObject.nestedObjectOfProject = function(projectId, pkEntity, cb) {

    const innerJoinThisProject = {
      "$relation": {
        "name": "entity_version_project_rels",
        "joinType": "inner join",
        "where": [
          "fk_project", "=", projectId,
          "and", "is_in_project", "=", "true"
        ]
      }
    };

    const filter = {
      "where": ["pk_entity", "=", pkEntity],
      "include": {
        // "entity_version_project_rels": innerJoinThisProject, as soon as the epr is implemented
        "chunks": {
          "$relation": {
            "name": "chunks",
            "joinType": "inner join",
            "orderBy": [{
              "pk_entity": "asc"
            }]
          },
          "entity_version_project_rels": innerJoinThisProject,
          "entity_associations": {
            "$relation": {
              "name": "entity_associations",
              "joinType": "inner join",
              "orderBy": [{
                "pk_entity": "asc"
              }]
            }
          }
        }
      }
    }

    return InfDigitalObject.findComplex(filter, cb);
  }


};