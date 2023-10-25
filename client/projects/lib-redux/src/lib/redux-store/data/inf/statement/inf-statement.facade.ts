import { Injectable } from '@angular/core';
import { GvFieldId, GvFieldPage, InfStatement, ProInfoProjRel, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { Store } from '@ngrx/store';
import { values } from 'ramda';
import { filter, first, map, Observable, of, pipe, switchMap } from 'rxjs';
import { IAppState } from '../../../public-api';
import { getActiveProjectId } from '../../../ui/active-project/active-project.selectors';
import { ByPk } from '../../../_lib/ByPk';
import { getInfoProjRelByFkProjectPkEntity } from '../../pro/info_proj_rel/pro-info-proj-rel.selectors';
import { CrudFacade } from '../../_lib/crud-facade';
import { getFromTo } from '../../_lib/crud-reducer-factory';
import { subfieldIdToString } from '../../_lib/subfieldIdToString';
import { infStatementActions } from './inf-statement.actions';
import { InfStatementObjectAndProperyFks, InfStatementObjectFks, InfStatementSubjectAndProperyFks, InfStatementSubjectFks } from './inf-statement.reducer';
import { getPage, getPageCount, getPageLoadNeeded, getPageRow, getPageRows, getStatementByObject, getStatementByObjectAndProperty, getStatementByPkEntity, getStatementBySubject, getStatementBySubjectAndProperty, getStatementPkEntityIdxtate } from './inf-statement.selectors';

@Injectable({
  providedIn: 'root'
})
export class InfStatementFacade extends CrudFacade<InfStatement> {

  statementsPkEntityIdx$ = this.store.select(getStatementPkEntityIdxtate);
  private pkProject$ = this.store.select(getActiveProjectId);

  constructor(
    protected store: Store<IAppState>
  ) {
    super(store, infStatementActions)
  }



  getOne = {
    byPkEntity$: (pkEntity: number, ofProject = true) => {
      const selection$ = this.store.select(getStatementByPkEntity(pkEntity))
      if (ofProject) return selection$.pipe(this.pipeItemInProject(this.pkProject$, (i) => i.pk_entity))
      return selection$
    },
  };


  getMany = {
    // subject selections

    by_subject$: (foreignKeys: InfStatementSubjectFks, ofProject = true): Observable<InfStatement[]> => {
      const selection$ = this.store.select(getStatementBySubject(foreignKeys))
      if (ofProject) {
        return selection$.pipe(
          this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity),
          map(items => values(items))
        )
      }
      return selection$.pipe(
        map(items => values(items))
      );
    },
    by_subject_and_property$: (foreignKeys: InfStatementSubjectAndProperyFks, ofProject = true): Observable<InfStatement[]> => {
      return this.getMany.by_subject_and_property_indexed$(foreignKeys, ofProject).pipe(
        map(statementIdx => values(statementIdx))
      )
    },
    by_subject_and_property_indexed$: (foreignKeys: InfStatementSubjectAndProperyFks, ofProject = true): Observable<ByPk<InfStatement>> => {
      const selection$ = this.store.select(getStatementBySubjectAndProperty(foreignKeys))
      if (ofProject) {
        return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity))
      }
      return selection$
    },

    // object selections

    by_object$: (foreignKeys: InfStatementObjectFks, ofProject = true): Observable<InfStatement[]> => {
      const selection$ = this.store.select(getStatementByObject(foreignKeys))
      if (ofProject) {
        return selection$.pipe(
          this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity),
          map(items => values(items))
        )
      }
      return selection$.pipe(
        map(items => values(items))
      );
    },

    by_object_and_property$: (foreignKeys: InfStatementObjectAndProperyFks, ofProject = true): Observable<InfStatement[]> => {
      return this.getMany.by_object_and_property_indexed$(foreignKeys, ofProject).pipe(
        map(statementIdx => values(statementIdx))
      )
    },

    by_object_and_property_indexed$: (foreignKeys: InfStatementObjectAndProperyFks, ofProject = true): Observable<ByPk<InfStatement>> => {
      const selection$ = this.store.select(getStatementByObjectAndProperty(foreignKeys))
      if (ofProject) {
        return selection$.pipe(
          this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity),
        )
      }
      return selection$
    }
  }

  getPage = {
    page: (page: GvFieldId) => this.store.select(getPage(page)),
    pageCount: (page: GvFieldId) => this.store.select(getPageCount(page)),
    pageRows: (page: GvFieldId) => this.store.select(getPageRows(page)),
    pageRow: (page: GvFieldId, rowIndex: number) => this.store.select(getPageRow(page, rowIndex)),
    pageLoadNeeded: (page: GvFieldPage) => this.store.select(getPageLoadNeeded(page)),
  }

  getPage$ = (page: GvFieldPage): Observable<StatementWithTarget[]> => {
    return this.getPage.pageCount(page)
      .pipe(
        filter(count => count !== undefined),
        switchMap(count => {
          const start = page.offset;
          const end = count <= (start + page.limit) ? count : (start + page.limit);
          const obs$: Observable<StatementWithTarget>[] = [];
          for (let i = start; i < end; i++) {
            obs$.push(this.getPage.pageRow(page, i))
          }
          return combineLatestOrEmpty(obs$).pipe(map((rows) => rows.filter(row => !!row)))
        })
      )
  }
  getPageLoadNeeded$ = (page: GvFieldPage, trigger$: Observable<any>): Observable<boolean> => {
    const key = subfieldIdToString(page)
    const fromToString = getFromTo(page.limit, page.offset)
    return trigger$.pipe(
      switchMap(() => this.getPage.pageLoadNeeded(page)
        .pipe(
          first(),
          map(loading => !loading)
        )
      ))
  }

  /**
   * Deprecated, use getPage.pageCount() instead
   * @param page
   * @returns
   */
  getPageCount$ = (page: GvFieldId): Observable<number | undefined> => {
    return this.getPage.pageCount(page)
  }

  // TODO refactor: could we use createSelector() with two input selectors instead of a pipe?
  pipeItemsInProject<M>(pkProject$: Observable<number>, getFkEntity: (item: M) => number) {

    return pipe(
      switchMap((items: ByPk<M>) => {
        return pkProject$.pipe(
          switchMap(pkProject => {
            const proRelsAndKey$: Observable<{ key: string, rel: ProInfoProjRel }>[] = [];
            for (const k in items) {
              if (items.hasOwnProperty(k)) {
                const item = items[k];
                proRelsAndKey$.push(
                  this.store.select(getInfoProjRelByFkProjectPkEntity(pkProject, getFkEntity(item)))
                    .pipe(map(rel => ({ key: k, rel })))
                )
              }
            }
            return combineLatestOrEmpty(proRelsAndKey$).pipe(
              // throttleTime(0),
              map(proRels => {
                const itemsInProject: ByPk<M> = {};
                for (let i = 0; i < proRels.length; i++) {
                  const proRel = proRels[i];
                  if (proRel.rel && proRel.rel.is_in_project) {
                    itemsInProject[proRel.key] = items[proRel.key]
                  }
                }
                return itemsInProject;
              })
            )
          })
        )

      })
    )

  }

  pipeItemInProject<M>(pkProject$: Observable<number>, getFkEntity: (item: M) => number) {
    return pipe(
      switchMap((item: M) => {
        if (!item) return of(undefined);
        return pkProject$.pipe(
          switchMap(pkProject => {
            const proRel$ = this.store.select(getInfoProjRelByFkProjectPkEntity(pkProject, getFkEntity(item)))
            return proRel$.pipe(
              // filter(proRel => proRel.is_in_project == true),
              map((proRel) => proRel && proRel.is_in_project == true ? item : undefined)
            )
          })
        )
      })
    )
  }



}
