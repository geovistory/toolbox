import { Injectable } from '@angular/core';
import { Flattener, storeFlattened } from 'app/core/store/flattener';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Action } from '../../../../node_modules/redux';
import { Observable } from '../../../../node_modules/rxjs';
import { mergeMap } from '../../../../node_modules/rxjs/operators';
import { DatActions } from '../dat/dat.actions';
import { NotificationsAPIActions } from '../notifications/components/api/notifications.actions';
import { ProActions } from '../pro/pro.actions';
import { InfPersistentItem, InfPersistentItemApi, InfStatement, InfStatementApi, InfTemporalEntity, InfTemporalEntityApi, InfTextProperty, InfTextPropertyApi, ProInfoProjRelApi } from '../sdk';
import { FluxActionObservable, ModifyActionMeta, PaginateByParam } from '../store/actions';
import { SchemaObject } from '../store/model';
import { SchemaObjectService } from '../store/schema-object.service';
import { InfEpicsFactory } from './inf-epic-factory';
import { FindRoleByParams, InfActions, InfPersistentItemActionFactory, InfStatementActionFactory, InfTemporalEntityActionFactory, InfTextPropertyActionFactory, LoadAlternativeTextProperties, LoadByPkMeta, LoadIngoingAlternativeRoles, LoadPaginatedRoleListMeta, PaginatedRolesList, SourcesAndDigitalsOfEntity, SourcesAndDigitalsOfEntityResult } from './inf.actions';
import { infRoot } from './inf.config';
import { InfPersistentItemSlice, InfStatementSlice, InfTemporalEntitySlice, InfTextPropertySlice } from './inf.models';


@Injectable()
export class InfEpics {
  constructor(
    public notification: NotificationsAPIActions,
    public peItApi: InfPersistentItemApi,
    public teEnApi: InfTemporalEntityApi,
    public statementApi: InfStatementApi,
    public textPropertyApi: InfTextPropertyApi,
    public infActions: InfActions,
    public proActions: ProActions,
    public datActions: DatActions,
    public infoProjRelApi: ProInfoProjRelApi,
    private schemaObjectService: SchemaObjectService
  ) { }

  public createEpics(): Epic {
    const infPersistentItemEpicsFactory = new InfEpicsFactory<InfPersistentItemSlice, InfPersistentItem>
      (infRoot, 'persistent_item', this.infActions.persistent_item, this.notification, this.infoProjRelApi, this.proActions);

    const infTemporalEntityEpicsFactory = new InfEpicsFactory<InfTemporalEntitySlice, InfTemporalEntity>
      (infRoot, 'temporal_entity', this.infActions.temporal_entity, this.notification, this.infoProjRelApi, this.proActions);

    const infRoleEpicsFactory = new InfEpicsFactory<InfStatementSlice, InfStatement>
      (infRoot, 'statement', this.infActions.statement, this.notification, this.infoProjRelApi, this.proActions);

    const infTextPropertyEpicsFactory = new InfEpicsFactory<InfTextPropertySlice, InfTextProperty>
      (infRoot, 'text_property', this.infActions.text_property, this.notification, this.infoProjRelApi, this.proActions);

    return combineEpics(
      /**
       * Perstistent Item
       *
       */
      // infPersistentItemEpicsFactory.createLoadEpic<LoadByPkMeta>(
      //   (meta) => this.peItApi.flatObjectOfProject(meta.pk, meta.pkEntity),
      //   InfPersistentItemActionFactory.NESTED_BY_PK,
      //   (results, pk) => {
      //     new Stower(this.infActions, this.datActions, this.proActions).stow(results as FlatObject, pk);
      //   }
      // ),
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
          const schemaObject = results as SchemaObject;
          this.schemaObjectService.storeSchemaObject(schemaObject, pk)
        }
      ),
      // infPersistentItemEpicsFactory.createLoadEpic<LoadTypeOfProjectAction>(
      //   (meta) => this.peItApi.typeOfProject(meta.pk, meta.pkEntity),
      //   InfPersistentItemActionFactory.TYPE_OF_PROJECT,
      //   (results, pk) => {
      //     const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
      //     flattener.persistent_item.flatten(results);
      //     storeFlattened(flattener.getFlattened(), pk);
      //   }
      // ),
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
        (meta) => this.teEnApi.ownProperties(meta.pk, meta.pkEntity),
        InfTemporalEntityActionFactory.OWN_PROPERTIES,
        (results, pk) => {
          const schemaObject = results as SchemaObject;
          this.schemaObjectService.storeSchemaObject(schemaObject, pk)
        }
      ),
      /**
       * Epic to load paginated Temporal Entity List
       */
      (action$: FluxActionObservable<any, LoadPaginatedRoleListMeta>, store) => action$.pipe(
        ofType(infTemporalEntityEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_LIST)),
        mergeMap(action => new Observable<Action>((globalActions) => {
          const meta = action.meta;
          const apiCal$ = this.teEnApi.temporalEntityList(
            meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset
          )
          const pkProject = meta.pk;
          this.handleTemporalEntityListAction(action, infTemporalEntityEpicsFactory, globalActions, apiCal$, pkProject);
        }))
      ),
      /**
       * Epic to load paginated Alternative Temporal Entity List
       */
      (action$: FluxActionObservable<any, LoadPaginatedRoleListMeta>, store) => action$.pipe(
        ofType(infTemporalEntityEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_ALTERNATIVE_LIST)),
        mergeMap(action => new Observable<Action>((globalActions) => {
          const meta = action.meta;
          const apiCal$ = this.teEnApi.alternativeTemporalEntityList(
            meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset
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
        (meta) => this.statementApi.alternativesNotInProjectByEntityPk(meta.pkEntity, meta.pkProperty, meta.pk),
        InfStatementActionFactory.ALTERNATIVES_INGOING,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.statement.flatten(results);
          storeFlattened(flattener.getFlattened(), null);
        }
      ),
      infRoleEpicsFactory.createUpsertEpic<ModifyActionMeta<InfStatement>>((meta) => this.statementApi
        .findOrCreateInfStatements(meta.pk, meta.items),
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.statement.flatten(results);
          storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
        }
      ),

      (action$: FluxActionObservable<any, LoadPaginatedRoleListMeta>, store) => action$.pipe(
        ofType(infRoleEpicsFactory.type('LOAD', InfTemporalEntityActionFactory.PAGINATED_LIST)),
        mergeMap(action => new Observable<Action>((globalActions) => {
          const meta = action.meta;
          const apiCal$ = this.statementApi.paginatedListTargetingEntityPreviews(
            meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset
          )
          const pkProject = meta.pk;
          this.handleTemporalEntityListAction(action, infRoleEpicsFactory, globalActions, apiCal$, pkProject);
        }))
      ),

      infRoleEpicsFactory.createRemoveEpic(),


      infRoleEpicsFactory.createLoadEpic<FindRoleByParams>(
        (meta) => this.statementApi.queryByParams(meta.ofProject, meta.pk, meta.pkEntity, meta.pkInfoRange, meta.pkInfoDomain, meta.pkProperty),
        InfStatementActionFactory.BY_PARAMS,
        (results, pk) => {
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.statement.flatten(results);
          storeFlattened(flattener.getFlattened(), pk, 'LOAD');
        }
      ),

      infRoleEpicsFactory.createLoadEpic<SourcesAndDigitalsOfEntity>(
        (meta) => this.statementApi.sourcesAndDigitalsOfEntity(meta.ofProject, meta.pk, meta.pkEntity),
        InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY,
        (results, pk) => {
          const res = results as any as SourcesAndDigitalsOfEntityResult;
          const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener.statement.flatten(res.statements);
          storeFlattened(flattener.getFlattened(), pk);

          const flattener2 = new Flattener(this.infActions, this.datActions, this.proActions);
          flattener2.digital.flatten(res.digitals);
          storeFlattened(flattener2.getFlattened(), pk);

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
  private handleTemporalEntityListAction<M>(
    action,
    epicsFactory: InfEpicsFactory<InfTemporalEntitySlice, InfTemporalEntity> | InfEpicsFactory<InfStatementSlice, InfStatement>,
    globalActions,
    apiCall$: Observable<any>,
    pkProject) {
    const meta: LoadPaginatedRoleListMeta = action.meta;
    const pendingKey = meta.addPending;
    const paginateBy: PaginateByParam[] = [
      { fk_property: meta.pkProperty },
      { fk_target_class: meta.fkTargetClass },
      { [meta.isOutgoing ? 'fk_subject_info' : 'fk_object_info']: meta.pkSourceEntity },
      { [meta.alternatives ? 'alternatives' : 'ofProject']: meta.alternatives }
    ];
    // call action to set pagination loading on true
    this.infActions.statement.loadPage(paginateBy, meta.limit, meta.offset, pkProject);
    // call api to load data
    apiCall$.subscribe((data: PaginatedRolesList) => {
      // call action to store records
      this.schemaObjectService.storeSchemaObject(data.schemas, pkProject);
      // call action to store pagination
      this.infActions.statement.loadPageSucceeded(data.paginatedRoles, data.count, paginateBy, meta.limit, meta.offset, pkProject);
      // call action to conclude the pending request
      epicsFactory.actions.loadSucceeded([], pendingKey, pkProject);
    }, error => {
      // call action to handle error
      epicsFactory.onError(globalActions, error, pendingKey, pkProject);
    });
  }
}
