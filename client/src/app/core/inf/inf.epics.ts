import { Injectable } from '@angular/core';
import { StandardEpicsFactory } from "app/core/store/StandardEpicsFactory";
import { Flattener, storeFlattened } from 'app/core/store/flattener';
import { combineEpics, Epic } from 'redux-observable';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { InfEntityAssociation, InfEntityAssociationApi, InfPersistentItem, InfPersistentItemApi, ProInfoProjRelApi, InfTemporalEntity, InfTemporalEntityApi, InfRole, InfRoleApi } from '../sdk';
import { InfEntityAssoctiationActionFactory, FindEAByParams, InfActions, LoadByPkAction, InfPersistentItemActionFactory, ContentTreeMeta, InfTemporalEntityActionFactory, SourcesAndDigitalsOfEntityResult, SourcesAndDigitalsOfEntity, InfRoleActionFactory } from './inf.actions';
import { infRoot } from './inf.config';
import { InfEntityAssociationSlice, InfPersistentItemSlice, InfTemporalEntitySlice, InfRoleSlice } from './inf.models';
import { DatActions } from '../dat/dat.actions';
import { InfEpicsFactory } from './inf-epic-factory';
import { ModifyActionMeta } from '../store/actions';
import { ProActions } from '../pro/pro.actions';


@Injectable()
export class InfEpics {
  constructor(
    public notification: NotificationsAPIActions,
    public peItApi: InfPersistentItemApi,
    public teEnApi: InfTemporalEntityApi,
    public eaApi: InfEntityAssociationApi,
    public roleApi: InfRoleApi,
    public infActions: InfActions,
    public proActions: ProActions,
    public datActions: DatActions,
    public infoProjRelApi: ProInfoProjRelApi
  ) { }

  public createEpics(): Epic {
    const infPersistentItemEpicsFactory = new InfEpicsFactory<InfPersistentItemSlice, InfPersistentItem>
      (infRoot, 'persistent_item', this.infActions.persistent_item, this.notification, this.infoProjRelApi);

    const infTemporalEntityEpicsFactory = new InfEpicsFactory<InfTemporalEntitySlice, InfTemporalEntity>
      (infRoot, 'temporal_entity', this.infActions.temporal_entity, this.notification, this.infoProjRelApi);

    const infEntityAssociationEpicsFactory = new InfEpicsFactory<InfEntityAssociationSlice, InfEntityAssociation>
      (infRoot, 'entity_association', this.infActions.entity_association, this.notification, this.infoProjRelApi);

    const infRoleEpicsFactory = new InfEpicsFactory<InfRoleSlice, InfRole>
      (infRoot, 'role', this.infActions.role, this.notification, this.infoProjRelApi);



    return combineEpics(
      /**
       * Perstistent Item
       *
       */
      infPersistentItemEpicsFactory.createLoadEpic<LoadByPkAction>(
        (meta) => this.peItApi.nestedObjectOfProject(meta.pk, meta.pkEntity),
        InfPersistentItemActionFactory.NESTED_BY_PK,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.persistent_item.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),

      infPersistentItemEpicsFactory.createRemoveEpic(),


      /**
       * Temporal Entity
       *
       */
      infTemporalEntityEpicsFactory.createLoadEpic<LoadByPkAction>(
        (meta) => this.teEnApi.nestedObjectOfProject(meta.pk, meta.pkEntity),
        InfTemporalEntityActionFactory.NESTED_BY_PK,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.temporal_entity.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),

      /**
       * Role
       *
       */
      infRoleEpicsFactory.createLoadEpic<FindEAByParams>(
        (meta) => this.roleApi.alternativesNotInProjectByEntityPk(meta.pkEntity, meta.pkProperty, meta.pk),
        InfRoleActionFactory.ALTERNATIVES_INGOING,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.role.flatten(results);
          storeFlattened(flattener.getFlattened(), null);
        }
      ),
      infRoleEpicsFactory.createLoadEpic<FindEAByParams>(
        (meta) => this.roleApi.alternativesNotInProjectByTeEntPk(meta.pkEntity, meta.pkProperty, meta.pk),
        InfRoleActionFactory.ALTERNATIVES_OUTGOING,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.role.flatten(results);
          storeFlattened(flattener.getFlattened(), null);
        }
      ),

      /**
       * Entity Association
       *
       */
      infEntityAssociationEpicsFactory.createLoadEpic<FindEAByParams>(
        (meta) => this.eaApi.queryByParams(meta.ofProject, meta.pk, meta.pkEntity, meta.pkInfoRange, meta.pkInfoDomain, meta.pkProperty),
        InfEntityAssoctiationActionFactory.BY_PARAMS
      ),

      infEntityAssociationEpicsFactory.createLoadEpic<ContentTreeMeta>(
        (meta) => this.eaApi.contentTree(meta.pk, meta.pkExpressionEntity),
        InfEntityAssoctiationActionFactory.CONTENT_TREE,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.entity_association.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),

      infEntityAssociationEpicsFactory.createLoadEpic<SourcesAndDigitalsOfEntity>(
        (meta) => this.eaApi.sourcesAndDigitalsOfEntity(meta.ofProject, meta.pk, meta.pkEntity),
        InfEntityAssoctiationActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY,
        (results, pk) => {
          const res = results as any as SourcesAndDigitalsOfEntityResult;
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.entity_association.flatten(res.entity_associations);
          storeFlattened(flattener.getFlattened(), pk);

          const flattener2 = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener2.digital.flatten(res.digitals);
          storeFlattened(flattener2.getFlattened(), pk);

        }
      ),

      infEntityAssociationEpicsFactory.createRemoveEpic(),

      infEntityAssociationEpicsFactory.createUpsertEpic<ModifyActionMeta<InfEntityAssociation>>((meta) => this.eaApi
        .findOrCreateInfEntityAssociations(meta.pk, meta.items),
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.entity_association.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),
    );
  }


}
