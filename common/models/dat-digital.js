'use strict';

module.exports = function (DatDigital) {

  /**
   * Remote Method for saving a digital object.
   * - If new, creates digitObj and relation to provided projectId
   * - Else updates digitObj and timestamp of relation to provided projectId
   * 
   * @param {*} projectId 
   * @param {*} data 
   * @param {*} ctx 
   */
  DatDigital.saveWithEpr = function (data, pkProject, ctx) {

    const dataObject = {
      pk_entity: data.pk_entity,
      quill_doc: data.quill_doc,
      notes: data.notes
    };


    if (!ctx.req.accessToken.userId) return Error('Something went wrong with createing a peIt or TeEnt');
    const accountId = ctx.req.accessToken.userId;

    const ProInfoProjRel = DatDigital.app.models.ProInfoProjRel;

    const find = function (pk_entity_version_concat) {
      //find the entity and include the epr
      return DatDigital.findOne({
        where: {
          pk_entity_version_concat: pk_entity_version_concat
        },
        include: {
          relation: "entity_version_project_rels",
          scope: {
            where: {
              fk_project: pkProject
            }
          }
        }
      }).then((res) => {
        return [res];
      })
        .catch(err => err);
    }


    // Create the digitObj version
    return DatDigital.create(dataObject)
      .catch((err) => { return err; })
      .then((createdEntity) => {

        // find the new digitObj
        return DatDigital.findById(createdEntity.pk_entity_version_concat)
          .catch((err) => { return err; })
          .then((resultingEntity) => {

            // check if there is an existing epr
            return ProInfoProjRel.findOne({
              where: {
                fk_entity: resultingEntity.pk_entity,
                fk_project: pkProject
              }
            }).catch((err) => { return err; })
              .then(existingEpr => {

                if (existingEpr) {
                  // update existing epr 
                  return existingEpr.updateAttributes({
                    fk_entity_version: resultingEntity.entity_version,
                    fk_entity_version_concat: resultingEntity.pk_entity_version_concat,
                    fk_last_modifier: accountId
                  })
                    .catch((err) => { return err; })
                    .then(resultingEpr => {

                      // return digitObj with epr
                      return find(resultingEntity.pk_entity_version_concat);
                    });
                }
                else {

                  // create a new epr 
                  return new ProInfoProjRel({
                    fk_entity: resultingEntity.pk_entity,
                    fk_entity_version: resultingEntity.entity_version,
                    fk_entity_version_concat: resultingEntity.pk_entity_version_concat,
                    fk_project: pkProject,
                    is_in_project: true,
                    fk_last_modifier: accountId,
                    fk_creator: accountId
                  }).save()
                    .catch((err) => { return err; })
                    .then(resultingEpr => {

                      // return digitObj with epr
                      return find(resultingEntity.pk_entity_version_concat);
                    });
                }

              })
          })
      })

  }

  DatDigital.findProjectVersion = function (projectId, pkEntity, cb) {
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
      "include": {
        "entity_version_project_rels": innerJoinThisProject
      },
      "orderBy": [{
        "pk_entity": "desc"
      }]
    }
    if (pkEntity) {
      filter.where = ["pk_entity", "=", pkEntity]
    }

    return DatDigital.findComplex(filter, cb);


  }

  /**
   * Returns all version with given pkEntity
   * @param {*} pkEntity 
   * @param {*} cb 
   */
  DatDigital.getVersions = function (pkEntity, cb) {

    const filter = {
      select: {
        include: ["entity_version", "pk_entity_version_concat", "pk_entity"]
      },
      where: ["pk_entity", "=", pkEntity],
      order: [{ "entity_version": "desc" }]
    }

    return DatDigital.findComplex(filter, cb);

  }

  /**
  * Returns latest version with given pkEntity
  * @param {*} pkEntity 
  * @param {*} cb 
  */
  DatDigital.getLatestVersion = function (pkEntity, cb) {

    const filter = {
      where: ["pk_entity", "=", pkEntity],
      order: [{ "entity_version": "desc" }],
      limit: 1
    }

    return DatDigital.findComplex(filter, cb);

  }

  /**
   * nestedObjectOfProject - get a rich object of the entityAssociation with its
   * domain and range entity
  *
  * @param  {number} pkProject primary key of project
  * @param  {number} pkEntity  pk_entity of the entityAssociation
  */
  DatDigital.nestedObjectOfProject = function (projectId, pkEntity, cb) {

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

    return DatDigital.findComplex(filter, cb);
  }


};