import { Injectable } from '@angular/core';
import { Field, InfSelector, SchemaSelectorsService } from '@kleiolab/lib-queries';
import { GvSchemaActions, PaginatedStatements, subfieldIdToString } from '@kleiolab/lib-redux';
import { GvFieldPage, GvFieldPageReq, GvFieldPageScope, GvPositiveSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4/lib/sdk-lb4/model/gvFieldSourceEntity';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { equals, keys } from 'ramda';
import { combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, takeUntil } from 'rxjs/operators';
import { fieldToFieldId, fieldToGvFieldTargets } from '../base.helpers';


export interface PaginatedStatementList2 {
  count: number;
  schemas: GvPositiveSchemaObject;
  paginatedStatements: PaginatedStatements;
}

class StatementPageLoader2 {
  private paginationTriggers = new Map<string, Observable<any>>()
  private pageLoaders = new Map<string, {
    refCount: number,
    until$: Subject<any>,
    // loadEvent$: Subject<any>
  }>()
  constructor(
    private inf$: InfSelector,
    private loadNeededFn: (subfieldId: GvFieldPage, trigger$?: Observable<any>) => Observable<boolean>,
    private schemaActions: GvSchemaActions,
  ) { }

  public addPageLoader(pkProject: number, field: Field, source: GvFieldSourceEntity, limit, offset, takeUntil$: Observable<any>, scope: GvFieldPageScope) {
    const subfieldId = fieldToFieldId(field, source, scope)
    const subfieldIdString = subfieldIdToString(subfieldId)


    const trigger$ = this.getTrigger(subfieldIdString, field, source, scope);

    const pageIdString = subfieldIdString + '_' + limit + '_' + offset;

    if (!this.pageLoaders.has(pageIdString)) {

      // emits when load function has been called
      const loadEvent$ = new Subject<PaginatedStatementList2>()

      const until$ = new Subject<void>()

      this.pageLoaders.set(pageIdString, {
        refCount: 1,
        until$,
        // loadEvent$
      })
      const subfieldPage: GvFieldPage = { ...subfieldId, limit, offset }
      this.loadNeededFn(subfieldPage, trigger$).pipe(
        filter(loadNeeded => loadNeeded === true),
        takeUntil(until$)
      ).subscribe(() => {
        const req: GvFieldPageReq = {
          pkProject,
          targets: fieldToGvFieldTargets(field),
          page: {
            source: source,
            property: field.property,
            isOutgoing: field.isOutgoing,
            scope: scope,
            limit,
            offset
          }
        }
        this.schemaActions.loadGvPaginationObject(req)
      })

    } else {
      const loader = this.pageLoaders.get(pageIdString)
      this.pageLoaders.set(pageIdString, {
        until$: loader.until$,
        // loadEvent$: loader.loadEvent$,
        refCount: loader.refCount + 1
      })
    }

    const sub = takeUntil$.subscribe(() => {
      const loader = this.pageLoaders.get(pageIdString)
      if (loader.refCount === 1) {
        loader.until$.next();

        this.pageLoaders.delete(pageIdString)
      } else {
        this.pageLoaders.set(pageIdString, {
          until$: loader.until$,
          // loadEvent$: loader.loadEvent$,
          refCount: loader.refCount - 1
        })
      }
      sub.unsubscribe()
    })


    return this.pageLoaders.get(pageIdString)

  }

  private getTrigger(subfieldId: string, field: Field, source: GvFieldSourceEntity, scope: GvFieldPageScope) {
    if (!this.paginationTriggers.has(subfieldId)) {
      const ofProject = !!scope.inProject;
      const t = combineLatest([
        this.inf$.statement$.by_object_and_property_indexed$({
          fk_property: field.property.fkProperty,
          fk_property_of_property: field.property.fkPropertyOfProperty,

          fk_object_info: source.fkInfo,
          fk_object_data: source.fkData,
          fk_object_tables_cell: source.fkTablesCell,
          fk_object_tables_row: source.fkTablesRow
        }, ofProject).pipe(map(x => {
          return keys(x)
        }), distinctUntilChanged(equals)),
        this.inf$.statement$.by_subject_and_property_indexed$({
          fk_property: field.property.fkProperty,
          fk_property_of_property: field.property.fkPropertyOfProperty,

          fk_subject_info: source.fkInfo,
          fk_subject_data: source.fkData,
          fk_subject_tables_cell: source.fkTablesCell,
          fk_subject_tables_row: source.fkTablesRow
        }, ofProject).pipe(map(x => {
          return keys(x)
        }), distinctUntilChanged(equals)),
      ]).pipe(shareReplay({ bufferSize: 1, refCount: true }));
      this.paginationTriggers.set(subfieldId, t);
    }
    return this.paginationTriggers.get(subfieldId);
  }

  logSubfieldMetadata(subfieldId: string) {
    const inf = this.inf$.ngRedux.getState().inf
    if (inf && inf.statement && inf.statement.by_subfield_page && inf.statement.by_subfield_page[subfieldId]) {
      return this.inf$.ngRedux.getState().inf.statement.by_subfield_page[subfieldId]
    }
  }
}



@Injectable({
  providedIn: 'root'
})
export class PaginationService {


  subfield = new StatementPageLoader2(
    this.schemaSelctors.inf$,
    this.p.inf$.statement$.pagination$.pipePageLoadNeeded,
    this.schemaActions,
  )
  constructor(
    private schemaSelctors: SchemaSelectorsService,
    private p: ActiveProjectService,
    private schemaActions: GvSchemaActions,
  ) { }

}
