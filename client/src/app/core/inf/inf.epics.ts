import { Injectable } from '@angular/core';
import { StandardEpicsFactory } from "app/core/store/StandardEpicsFactory";
import { Flattener, storeFlattened } from 'app/core/store/flattener';
import { combineEpics, Epic } from 'redux-observable';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { InfEntityAssociation, InfEntityAssociationApi, InfPersistentItem, InfPersistentItemApi, ProInfoProjRelApi } from '../sdk';
import { EntityAssoctiationActionFactory, FindEAByParams, InfActions, LoadByPkAction, PeItActionFactory, ContentTreeMeta } from './inf.actions';
import { infRoot } from './inf.config';
import { EntityAssociationSlice, PersistentItemSlice } from './inf.models';
import { DatActions } from '../dat/dat.actions';
import { InfEpicsFactory } from './inf-epic-factory';
import { ModifyActionMeta } from '../store/actions';


@Injectable()
export class InfEpics {
  constructor(
    public notification: NotificationsAPIActions,
    public peItApi: InfPersistentItemApi,
    public eaApi: InfEntityAssociationApi,
    public infActions: InfActions,
    public datActions: DatActions,
    public infoProjRelApi: ProInfoProjRelApi
  ) { }

  public createEpics(): Epic {
    const peItEpicsFactory = new StandardEpicsFactory<PersistentItemSlice, InfPersistentItem>
      (infRoot, 'persistent_item', this.infActions.persistent_item, this.notification);

    const eaEpicsFactory = new InfEpicsFactory<EntityAssociationSlice, InfEntityAssociation>
      (infRoot, 'entity_association', this.infActions.entity_association, this.notification, this.infoProjRelApi);

    return combineEpics(

      peItEpicsFactory.createLoadEpic<LoadByPkAction>(
        (meta) => this.peItApi.nestedObjectOfProject(meta.pk, meta.pkEntity),
        PeItActionFactory.NESTED_BY_PK,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions);
          flattener.persistent_item.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),

      // Entiy Associations
      eaEpicsFactory.createLoadEpic<FindEAByParams>(
        (meta) => this.eaApi.queryByParams(meta.ofProject, meta.pk, meta.pkEntity, meta.pkInfoRange, meta.pkInfoDomain, meta.pkProperty),
        EntityAssoctiationActionFactory.BY_PARAMS
      ),

      eaEpicsFactory.createLoadEpic<ContentTreeMeta>(
        (meta) => this.eaApi.contentTree(meta.pk, meta.pkExpressionEntity),
        EntityAssoctiationActionFactory.CONTENT_TREE,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions);
          flattener.entity_association.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),

      eaEpicsFactory.createRemoveEpic(),

      eaEpicsFactory.createUpsertEpic<ModifyActionMeta<InfEntityAssociation>>((meta) => this.eaApi
        .findOrCreateInfEntityAssociations(meta.pk, meta.items),
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions);
          flattener.entity_association.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),
    );
  }


}
