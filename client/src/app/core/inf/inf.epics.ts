import { Injectable } from '@angular/core';
import { Flattener, storeFlattened } from 'app/core/store/flattener';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Action } from '../../../../node_modules/redux';
import { Observable } from '../../../../node_modules/rxjs';
import { mergeMap } from '../../../../node_modules/rxjs/operators';
import { DatActions } from '../dat/dat.actions';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { ProActions } from '../pro/pro.actions';
import { InfEntityAssociation, InfEntityAssociationApi, InfPersistentItem, InfPersistentItemApi, InfRole, InfRoleApi, InfTemporalEntity, InfTemporalEntityApi, InfTextProperty, InfTextPropertyApi, ProInfoProjRelApi } from '../sdk';
import { FluxActionObservable, ModifyActionMeta, PaginateByParam } from '../store/actions';
import { FlatObject, Stower } from '../store/stower';
import { InfEpicsFactory } from './inf-epic-factory';
import { AddToProjectWithTeEntActionMeta, ContentTreeMeta, FindEAByParams, InfActions, InfEntityAssoctiationActionFactory, InfPersistentItemActionFactory, InfRoleActionFactory, InfTemporalEntityActionFactory, InfTextPropertyActionFactory, LoadAlternativeTextProperties, LoadByPkMeta, LoadIngoingAlternativeRoles, LoadOutgoingAlternativeRoles, LoadPaginatedTeEnListMeta, PaginatedTeEnList, SourcesAndDigitalsOfEntity, SourcesAndDigitalsOfEntityResult } from './inf.actions';
import { infRoot } from './inf.config';
import { InfEntityAssociationSlice, InfPersistentItemSlice, InfRoleSlice, InfTemporalEntitySlice, InfTextPropertySlice } from './inf.models';
import { SchemaObject } from '../store/model';


@Injectable()
export class InfEpics {
  constructor(
    public notification: NotificationsAPIActions,
    public peItApi: InfPersistentItemApi,
    public teEnApi: InfTemporalEntityApi,
    public eaApi: InfEntityAssociationApi,
    public roleApi: InfRoleApi,
    public textPropertyApi: InfTextPropertyApi,
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

    const infTextPropertyEpicsFactory = new InfEpicsFactory<InfTextPropertySlice, InfTextProperty>
      (infRoot, 'text_property', this.infActions.text_property, this.notification, this.infoProjRelApi);

    return combineEpics(
      /**
       * Perstistent Item
       *
       */
      infPersistentItemEpicsFactory.createLoadEpic<LoadByPkMeta>(
        (meta) => this.peItApi.flatObjectOfProject(meta.pk, meta.pkEntity),
        InfPersistentItemActionFactory.NESTED_BY_PK,
        (results, pk) => {
          new Stower(this.infActions, this.datActions, this.proActions).stow(results as FlatObject, pk);
        }
      ),
      infPersistentItemEpicsFactory.createLoadEpic<LoadByPkMeta>(
        (meta) => this.peItApi.ownProperties(meta.pk, meta.pkEntity),
        InfPersistentItemActionFactory.MINIMAL_BY_PK,
        (results, pk) => {
          const schemas = results as any as SchemaObject;
          // call action to store records
          Object.keys(schemas).forEach(schema => {
            let actions;
            if (schema === 'inf') actions = this.infActions;
            else if (schema === 'pro') actions = this.proActions;
            if (actions) {
              Object.keys(schemas[schema]).forEach(model => {
                actions[model].loadSucceeded(schemas[schema][model], undefined, pk)
              })
            }
          })
        }
      ),
      infPersistentItemEpicsFactory.createLoadEpic<LoadByPkMeta>(
        (meta) => this.peItApi.typesOfProject(meta.pk),
        InfPersistentItemActionFactory.TYPES_OF_PROJECT,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.persistent_item.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),
      infPersistentItemEpicsFactory.createUpsertEpic<ModifyActionMeta<InfPersistentItem>>((meta) => this.peItApi
        .findOrCreateInfPersistentItems(meta.pk, meta.items),
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.persistent_item.flatten(results);
          storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }
      ),
      infPersistentItemEpicsFactory.createRemoveEpic(),


      /**
       * Temporal Entity
       *
       */
      infTemporalEntityEpicsFactory.createLoadEpic<LoadByPkMeta>(
        (meta) => this.teEnApi.nestedObjectOfProject(meta.pk, meta.pkEntity),
        InfTemporalEntityActionFactory.NESTED_BY_PK,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.temporal_entity.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),
      /**
       * Epic to load paginated Temporal Entity List
       */
      (action$: FluxActionObservable<any, LoadPaginatedTeEnListMeta>, store) => action$.pipe(
        ofType(infTemporalEntityEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_LIST)),
        mergeMap(action => new Observable<Action>((globalActions) => {
          const meta = action.meta;
          const apiCal$ = this.teEnApi.temporalEntityList(
            meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.isOutgoing, meta.limit, meta.offset
          )
          const pkProject = meta.pk;
          this.handleTemporalEntityListAction(action, infTemporalEntityEpicsFactory, globalActions, apiCal$, pkProject);
        }))
      ),
      /**
       * Epic to load paginated Alternative Temporal Entity List
       */
      (action$: FluxActionObservable<any, LoadPaginatedTeEnListMeta>, store) => action$.pipe(
        ofType(infTemporalEntityEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST)),
        mergeMap(action => new Observable<Action>((globalActions) => {
          const meta = action.meta;
          const apiCal$ = this.teEnApi.alternativeTemporalEntityList(
            meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.isOutgoing, meta.limit, meta.offset
          )
          const pkProject = null;
          this.handleTemporalEntityListAction(action, infTemporalEntityEpicsFactory, globalActions, apiCal$, pkProject);
        }))
      ),
      infTemporalEntityEpicsFactory.createUpsertEpic<ModifyActionMeta<InfTemporalEntity>>((meta) => this.teEnApi
        .findOrCreateInfTemporalEntities(meta.pk, meta.items),
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.temporal_entity.flatten(results);
          storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }
      ),
      infTemporalEntityEpicsFactory.createRemoveEpic(),


      /**
       * Role
       *
       */
      infRoleEpicsFactory.createLoadEpic<LoadIngoingAlternativeRoles>(
        (meta) => this.roleApi.alternativesNotInProjectByEntityPk(meta.pkEntity, meta.pkProperty, meta.pk),
        InfRoleActionFactory.ALTERNATIVES_INGOING,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.role.flatten(results);
          storeFlattened(flattener.getFlattened(), null);
        }
      ),
      infRoleEpicsFactory.createLoadEpic<LoadOutgoingAlternativeRoles>(
        (meta) => this.roleApi.alternativesNotInProjectByTeEntPk(meta.pkTemporalEntity, meta.pkProperty, meta.pk),
        InfRoleActionFactory.ALTERNATIVES_OUTGOING,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.role.flatten(results);
          storeFlattened(flattener.getFlattened(), null);
        }
      ),
      infRoleEpicsFactory.createUpsertEpic<ModifyActionMeta<InfRole>>((meta) => this.roleApi
        .findOrCreateInfRoles(meta.pk, meta.items),
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.role.flatten(results);
          storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }
      ),
      infRoleEpicsFactory.createCustomUpsertEpic<AddToProjectWithTeEntActionMeta>((meta) => this.roleApi
        .addToProjectWithTeEnt(meta.pk, meta.pkRoles),
        InfRoleActionFactory.ADD_TO_PROJECT_WITH_TE_EN,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.role.flatten(results);
          storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }
      ),

      infRoleEpicsFactory.createRemoveEpic(),

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

      /**
       * Text Property
       *
       */
      infTextPropertyEpicsFactory.createLoadEpic<LoadAlternativeTextProperties>((meta) => this.textPropertyApi
        .findAlternativeTextProperties(meta.pk, meta.fkEntity, meta.fkClassField),
        InfTextPropertyActionFactory.ALTERNATIVES,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.text_property.flatten(results);
          storeFlattened(flattener.getFlattened(), null);
        }
      ),

      infTextPropertyEpicsFactory.createUpsertEpic<ModifyActionMeta<InfTextProperty>>((meta) => this.textPropertyApi
        .findOrCreateInfTextProperties(meta.pk, meta.items),
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.text_property.flatten(results);
          storeFlattened(flattener.getFlattened(), pk);
        }
      ),
      infTextPropertyEpicsFactory.createRemoveEpic(),

    );
  }


  /**
   * handles the update of store for paginated temporal entity lists.
   * @param pkProject if null, list is handled as 'repo' list
   */
  private handleTemporalEntityListAction<M>(action, infTemporalEntityEpicsFactory: InfEpicsFactory<InfTemporalEntitySlice, InfTemporalEntity>, globalActions, apiCall$: Observable<any>, pkProject) {
    const meta = action.meta;
    const pendingKey = meta.addPending;
    let paginateBy: PaginateByParam[] = [
      { fk_property: meta.pkProperty },
      { [meta.isOutgoing ? 'fk_temporal_entity' : 'fk_entity']: meta.pkSourceEntity }
    ];
    // call action to set pagination loading on true
    this.infActions.role.loadPage(paginateBy, meta.limit, meta.offset, pkProject);
    // call api to load data
    apiCall$.subscribe((data: PaginatedTeEnList) => {
      // call action to store records
      this.storeSchemaObject(data.schemas, pkProject);
      // call action to store pagination
      this.infActions.role.loadPageSucceeded(data.paginatedRoles, data.count, paginateBy, meta.limit, meta.offset, pkProject);
      // call action to conclude the pending request
      infTemporalEntityEpicsFactory.actions.loadSucceeded([], pendingKey, pkProject);
    }, error => {
      // call action to handle error
      infTemporalEntityEpicsFactory.onError(globalActions, error, pendingKey, pkProject);
    });
  }

  private storeSchemaObject(schemas: SchemaObject, pkProject) {
    if (schemas && Object.keys(schemas).length > 0) {
      Object.keys(schemas).forEach(schema => {
        let actions;
        if (schema === 'inf') actions = this.infActions;
        else if (schema === 'pro') actions = this.proActions;
        if (actions) {
          Object.keys(schemas[schema]).forEach(model => {
            actions[model].loadSucceeded(schemas[schema][model], undefined, pkProject);
          });
        }
      });
    }
  }
}
