'use strict';

module.exports = function(InfRole) {

  InfRole.addRoleToProject = function(projectId, role, ctx) {

    let requestedRole;

    if (ctx) {
      requestedRole = ctx.req.body;
    } else {
      requestedRole = role;
    }

    return InfRole.addToProject(projectId, requestedRole)
      .then(resultingEpr => {

        requestedRole.entity_version_project_rels = [resultingEpr];

        if (requestedRole.temporal_entity) {
          //add the temporal_entity to the project
          const InfTemporalEntity = InfRole.app.models.InfTemporalEntity;
          return InfTemporalEntity.addTeEntToProject(projectId, requestedRole.temporal_entity)
            .then((results) => {
              requestedRole.temporal_entity = results[0];
              return [requestedRole];
            })
            .catch((err) => {
              return err;
            })
        }


        else if (requestedRole.persistent_item) {
          //add the persistent_item to the project
          const InfPersistentItem = InfRole.app.models.InfPersistentItem;
          return InfPersistentItem.addPeItToProject(projectId, requestedRole.persistent_item)
            .then((results) => {
              requestedRole.persistent_item = results[0];
              return [requestedRole];
            })
            .catch((err) => {
              return err;
            })
        }

        else if (requestedRole.appellation) {
          //add the appellation to the project
          const Appellation = InfRole.app.models.Appellation;
          return Appellation.addToProject(projectId, requestedRole.appellation)
            .then((results) => {
              requestedRole.appellation = results[0];
              return [requestedRole];
            })
            .catch((err) => {
              return err;
            })
        }

        else if (requestedRole.language) {
          //add the language to the project
          const InfLanguage = InfRole.app.models.InfLanguage;
          return InfLanguage.addToProject(projectId, requestedRole.language)
            .then((results) => {
              requestedRole.language = results[0];
              return [requestedRole];
            })
            .catch((err) => {
              return err;
            })
        }

        else {
          return [requestedRole];
        }

      })
      .catch((err) => {

      });


  }


  InfRole.findOrCreateInfRole = function(projectId, role, ctx) {

    const dataObject = {
      pk_entity: role.pk_entity,
      fk_entity: role.fk_entity,
      fk_temporal_entity: role.fk_temporal_entity,
      fk_property: role.fk_property,
      notes: role.notes,
    };

    let requestedRole;

    if (ctx) {
      requestedRole = ctx.req.body;
    } else {
      requestedRole = role;
    }

    if (requestedRole.temporal_entity) {

      //create the temporal_entity first
      const InfTemporalEntity = InfRole.app.models.InfTemporalEntity;
      return InfTemporalEntity.findOrCreateInfTemporalEntity(projectId, requestedRole.temporal_entity)
        .then((resultingTeEnts) => {

          const resultingTeEnt = resultingTeEnts[0];

          // … prepare the Role to create
          dataObject.fk_temporal_entity = resultingTeEnt.pk_entity;

          // call the api to find or create the role that points to the teEnt
          return InfRole.findOrCreateInfRole(projectId, dataObject)
            .then((roles) => {

              let res = roles[0].toJSON()
              res.temporal_entity = resultingTeEnt;

              return [res];

            })
            .catch((err) => {
              return err;
            })

        })
        .catch((err) => {
          return err;
        })

    }

    // if the role points to a persistent item
    if (requestedRole.persistent_item) {

      // prepare parameters
      const InfPersistentItem = InfRole.app.models.InfPersistentItem;

      // find or create the peIt and the role pointing to it
      return InfPersistentItem.findOrCreatePeIt(projectId, requestedRole.persistent_item)
        .then((resultingPeIts) => {

          const resultingPeIt = resultingPeIts[0];

          // … prepare the Role to create
          dataObject.fk_entity = resultingPeIt.pk_entity;

          return InfRole.findOrCreateInfRole(projectId, dataObject)
            .then((resultingRoles) => {

              let res = resultingRole[0].toJSON();
              res.persistent_item = resultingPeIt.toJSON();

              return [res];

            })
            .catch((err) => {
              return err;
            })
        })
        .catch((err) => {
          return err;
        })

    }

    // if the role points to a appellation
    else if (requestedRole.appellation) {

      // prepare parameters
      const Appellation = InfRole.app.models.Appellation;

      // find or create the appellation and the role pointing to it
      return Appellation.findOrCreateAppellation(projectId, requestedRole.appellation)
        .then((resultingEntities) => {
          const resultingEntity = resultingEntities[0];

          // … prepare the Role to create
          dataObject.fk_entity = resultingEntity.pk_entity;

          return InfRole.findOrCreateInfRole(projectId, dataObject)
            .then((resultingRoles) => {

              let res = resultingRoles[0].toJSON();
              res.appellation = resultingEntity.toJSON();

              return [res];

            })
            .catch((err) => {
              return err;
            })
        })
        .catch((err) => {
          return err;
        })

    }


    // if the role points to a language
    else if (requestedRole.language) {

      // prepare parameters
      const InfLanguage = InfRole.app.models.InfLanguage;

      // find or create the language and the role pointing to it
      return InfLanguage.findOrCreateLang(projectId, requestedRole.language)
        .then((resultingEntities) => {
          const resultingEntity = resultingEntities[0];

          // … prepare the Role to create
          dataObject.fk_entity = resultingEntity.pk_entity;

          return InfRole.findOrCreateInfRole(projectId, dataObject)
            .then((resultingRoles) => {

              let res = resultingRoles[0].toJSON();
              res.language = resultingEntity.toJSON();

              return [res];

            })
            .catch((err) => {
              return err;
            })
        })
        .catch((err) => {
          return err;
        })
    } else {

      return InfRole.findOrCreateVersion(InfRole, projectId, dataObject)

    }

  }
};