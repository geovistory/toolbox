import { Injectable } from '@angular/core';
import { StandardEpicsFactory } from "app/core/store/StandardEpicsFactory";
import { Flattener, storeFlattened } from 'app/core/store/flattener';
import { combineEpics, Epic } from 'redux-observable';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { InfEntityAssociation, InfEntityAssociationApi, InfPersistentItem, InfPersistentItemApi, ProInfoProjRelApi, InfTemporalEntity, InfTemporalEntityApi } from '../sdk';
import { InfEntityAssoctiationActionFactory, FindEAByParams, InfActions, LoadByPkAction, InfPersistentItemActionFactory, ContentTreeMeta, InfTemporalEntityActionFactory } from './inf.actions';
import { infRoot } from './inf.config';
import { InfEntityAssociationSlice, InfPersistentItemSlice, InfTemporalEntitySlice } from './inf.models';
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
    public infActions: InfActions,
    public proActions: ProActions,
    public datActions: DatActions,
    public infoProjRelApi: ProInfoProjRelApi
  ) { }

  public createEpics(): Epic {
    const persistentItemEpicsFactory = new InfEpicsFactory<InfPersistentItemSlice, InfPersistentItem>
      (infRoot, 'persistent_item', this.infActions.persistent_item, this.notification, this.infoProjRelApi);

    const temporalEntityEpicsFactory = new InfEpicsFactory<InfTemporalEntitySlice, InfTemporalEntity>
      (infRoot, 'temporal_entity', this.infActions.temporal_entity, this.notification, this.infoProjRelApi);

    const entityAssociationEpicsFactory = new InfEpicsFactory<InfEntityAssociationSlice, InfEntityAssociation>
      (infRoot, 'entity_association', this.infActions.entity_association, this.notification, this.infoProjRelApi);



    return combineEpics(
      /**
       * Perstistent Item
       *
       */
      persistentItemEpicsFactory.createLoadEpic<LoadByPkAction>(
        (meta) => this.peItApi.nestedObjectOfProject(meta.pk, meta.pkEntity),
        InfPersistentItemActionFactory.NESTED_BY_PK,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.persistent_item.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),

      persistentItemEpicsFactory.createRemoveEpic(),


      /**
       * Temporal Entity
       *
       */
      temporalEntityEpicsFactory.createLoadEpic<LoadByPkAction>(
        (meta) => this.teEnApi.nestedObjectOfProject(meta.pk, meta.pkEntity),
        InfTemporalEntityActionFactory.NESTED_BY_PK,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.temporal_entity.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),


      /**
       * Entity Association
       *
       */
      entityAssociationEpicsFactory.createLoadEpic<FindEAByParams>(
        (meta) => this.eaApi.queryByParams(meta.ofProject, meta.pk, meta.pkEntity, meta.pkInfoRange, meta.pkInfoDomain, meta.pkProperty),
        InfEntityAssoctiationActionFactory.BY_PARAMS
      ),

      entityAssociationEpicsFactory.createLoadEpic<ContentTreeMeta>(
        (meta) => this.eaApi.contentTree(meta.pk, meta.pkExpressionEntity),
        InfEntityAssoctiationActionFactory.CONTENT_TREE,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.entity_association.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),

      entityAssociationEpicsFactory.createRemoveEpic(),

      entityAssociationEpicsFactory.createUpsertEpic<ModifyActionMeta<InfEntityAssociation>>((meta) => this.eaApi
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
