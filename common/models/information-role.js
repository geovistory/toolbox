'use strict';

module.exports = function(InformationRole) {
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
        .then((resultingTeEnt) => {

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
      const PersistentItemVersion = InformationRole.app.models.PersistentItemVersion;

      // find or create the peIt and the role pointing to it
      return PersistentItemVersion.findOrCreatePeIt(projectId, requestedRole.persistent_item)
        .then((resultingPeIt) => {

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
        .then((resultingEntity) => {

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
        .then((resultingEntity) => {

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
        .then((res) => {
          return [res];
        });
    }

  }
};