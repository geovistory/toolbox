'use strict';

module.exports = function(InformationRole) {

  InformationRole.addRoleToProject = function(projectId, role, ctx) {

    let requestedRole;

    if (ctx) {
      requestedRole = ctx.req.body;
    } else {
      requestedRole = role;
    }

    return InformationRole.addToProject(projectId, requestedRole)
      .then(resultingEpr => {

        requestedRole.entity_version_project_rels = [resultingEpr];

        if (requestedRole.temporal_entity) {
          //add the temporal_entity to the project
          const TemporalEntity = InformationRole.app.models.TemporalEntity;
          return TemporalEntity.addTeEntToProject(projectId, requestedRole.temporal_entity)
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
          const PersistentItem = InformationRole.app.models.PersistentItem;
          return PersistentItem.addPeItToProject(projectId, requestedRole.persistent_item)
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
          const Appellation = InformationRole.app.models.Appellation;
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
          const InformationLanguage = InformationRole.app.models.InformationLanguage;
          return InformationLanguage.addToProject(projectId, requestedRole.language)
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


  InformationRole.findOrCreateInformationRole = function(projectId, role, ctx) {

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
      const TemporalEntity = InformationRole.app.models.TemporalEntity;
      return TemporalEntity.findOrCreateTemporalEntity(projectId, requestedRole.temporal_entity)
        .then((resultingTeEnts) => {

          const resultingTeEnt = resultingTeEnts[0];

          // … prepare the Role to create
          dataObject.fk_temporal_entity = resultingTeEnt.pk_entity;

          // call the api to find or create the role that points to the teEnt
          return InformationRole.findOrCreateInformationRole(projectId, dataObject)
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
      const PersistentItem = InformationRole.app.models.PersistentItem;

      // find or create the peIt and the role pointing to it
      return PersistentItem.findOrCreatePeIt(projectId, requestedRole.persistent_item)
        .then((resultingPeIts) => {

          const resultingPeIt = resultingPeIts[0];

          // … prepare the Role to create
          dataObject.fk_entity = resultingPeIt.pk_entity;

          return InformationRole.findOrCreateInformationRole(projectId, dataObject)
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
      const Appellation = InformationRole.app.models.Appellation;

      // find or create the appellation and the role pointing to it
      return Appellation.findOrCreateAppellation(projectId, requestedRole.appellation)
        .then((resultingEntities) => {
          const resultingEntity = resultingEntities[0];

          // … prepare the Role to create
          dataObject.fk_entity = resultingEntity.pk_entity;

          return InformationRole.findOrCreateInformationRole(projectId, dataObject)
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
      const InformationLanguage = InformationRole.app.models.InformationLanguage;

      // find or create the language and the role pointing to it
      return InformationLanguage.findOrCreateLang(projectId, requestedRole.language)
        .then((resultingEntities) => {
          const resultingEntity = resultingEntities[0];

          // … prepare the Role to create
          dataObject.fk_entity = resultingEntity.pk_entity;

          return InformationRole.findOrCreateInformationRole(projectId, dataObject)
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

      return InformationRole.findOrCreateVersion(InformationRole, projectId, dataObject)

    }

  }
};