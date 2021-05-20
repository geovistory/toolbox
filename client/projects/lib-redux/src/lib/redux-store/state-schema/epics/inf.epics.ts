import { Injectable } from '@angular/core';
import { InfStatementApi, ProInfoProjRelApi } from '@kleiolab/lib-sdk-lb3';
import { ProjectDataService } from '@kleiolab/lib-sdk-lb4';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { DatActions } from '../actions/dat.actions';
import { InfActions } from '../actions/inf.actions';
import { ProActions } from '../actions/pro.actions';
import { SchemaService } from '../services/schema.service';

@Injectable({
  providedIn: 'root'
})
export class InfEpics {
  constructor(
    public notification: NotificationsAPIActions,
    public projectDataService: ProjectDataService,
    public statementApi: InfStatementApi,
    public infActions: InfActions,
    public proActions: ProActions,
    public datActions: DatActions,
    public infoProjRelApi: ProInfoProjRelApi,
    private schemaObjectService: SchemaService
  ) { }

  public createEpics(): Epic {


    return combineEpics(
      /**
       * Perstistent Item
       *
       */


      /**
       * Statement
       *
       */
      // infStatementEpicsFactory.createLoadEpic<LoadIngoingAlternativeStatements>(
      //   (meta) => this.statementApi.alternativesNotInProjectByEntityPk(meta.pkEntity, meta.pkProperty, meta.pk),
      //   InfStatementActionFactory.ALTERNATIVES_INGOING,
      //   (results, pk) => {
      //     const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
      //     flattener.statement.flatten(results);
      //     storeFlattened(flattener.getFlattened(), null);
      //   }
      // ),
      // infStatementEpicsFactory.createUpsertEpic<ModifyActionMeta<InfStatement>>((meta) => this.statementApi
      //   .findOrCreateInfStatements(meta.pk, meta.items),
      //   (results, pk) => {
      //     const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
      //     flattener.statement.flatten(results);
      //     storeFlattened(flattener.getFlattened(), pk, 'UPSERT');
      //   }
      // ),

      // (action$: FluxActionObservable<any, LoadPaginatedStatementListMeta>, store) => action$.pipe(
      //   ofType(infStatementEpicsFactory.type('LOAD', InfResourceActionFactory.PAGINATED_LIST)),
      //   mergeMap(action => new Observable<Action>((globalActions) => {
      //     const meta = action.meta;
      //     const apiCal$ = this.statementApi.paginatedListTargetingEntityPreviews(
      //       meta.pk, meta.pkSourceEntity, meta.pkProperty, meta.fkTargetClass, meta.isOutgoing, meta.limit, meta.offset
      //     )
      //     const pkProject = meta.pk;
      //     this.handleTemporalEntityListAction(action, infStatementEpicsFactory, globalActions, apiCal$, pkProject);
      //   }))
      // ),

      // infStatementEpicsFactory.createRemoveEpic(),


      // infStatementEpicsFactory.createLoadEpic<FindStatementByParams>(
      //   (meta) => this.statementApi.queryByParams(meta.ofProject, meta.pk, meta.pkEntity, meta.pkInfoRange, meta.pkInfoDomain, meta.pkProperty),
      //   InfStatementActionFactory.BY_PARAMS,
      //   (results, pk) => {
      //     const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
      //     flattener.statement.flatten(results);
      //     storeFlattened(flattener.getFlattened(), pk, 'LOAD');
      //   }
      // ),

      // infStatementEpicsFactory.createLoadEpic<SourcesAndDigitalsOfEntity>(
      //   (meta) => this.statementApi.sourcesAndDigitalsOfEntity(meta.ofProject, meta.pk, meta.pkEntity),
      //   InfStatementActionFactory.SOURCES_AND_DIGITALS_OF_ENTITY,
      //   (results, pk) => {
      //     const res = results as any as SourcesAndDigitalsOfEntityResult;
      //     const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
      //     flattener.statement.flatten(res.statements);
      //     storeFlattened(flattener.getFlattened(), pk);

      //     const flattener2 = new Flattener(this.infActions, this.datActions, this.proActions);
      //     flattener2.digital.flatten(res.digitals);
      //     storeFlattened(flattener2.getFlattened(), pk);

      //   }
      // ),






    );
  }



}
