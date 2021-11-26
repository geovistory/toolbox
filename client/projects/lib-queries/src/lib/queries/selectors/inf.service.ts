import { NgRedux } from '@angular-redux/store';
import { ByPk, EntityModelAndClass, getFromTo, IAppState, indexStatementByObject, indexStatementByObjectProperty, indexStatementBySubject, indexStatementBySubjectProperty, infDefinitions, infRoot, InfStatementObjectAndProperyFks, InfStatementObjectFks, InfStatementSubjectAndProperyFks, InfStatementSubjectFks, paginateBy, PR_ENTITY_MODEL_MAP, ReducerConfigCollection, subfieldIdToString } from '@kleiolab/lib-redux';
import { GvFieldId, GvFieldPage, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive, ProInfoProjRel, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { values } from 'd3';
import { equals } from 'ramda';
import { Observable, of, pipe } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
export type InfModelName = 'persistent_item' | 'temporal_entity' | 'statement' | 'text_property' | 'appellation' | 'language' | 'place' | 'dimension' | 'lang_string' | 'time_primitive';

class Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { }

  selector<M>(indexKey: string): { all$: Observable<ByPk<M>>, key: (x) => Observable<M> } {

    const all$ = this.ngRedux.select<ByPk<M>>([infRoot, this.model, indexKey])
    const key = (x): Observable<M> => {
      // REMARK: 'equals' comparator is very very important for performance !
      return this.ngRedux.select<M>([infRoot, this.model, indexKey, x], equals)
    }
    return { all$, key }
  }

  paginationSelector<M>() {

    const pipePage = (page: GvFieldPage): Observable<M[]> => {
      let path: any[];
      const pagBy = paginateBy
      const key = subfieldIdToString(page)
      path = [infRoot, this.model, pagBy, key];
      return this.ngRedux.select<number>([...path, 'count'])
        .pipe(
          filter(count => count !== undefined),
          switchMap(count => {
            const start = page.offset;
            const end = count <= (start + page.limit) ? count : (start + page.limit);
            const obs$: Observable<M>[] = [];
            for (let i = start; i < end; i++) {
              obs$.push(
                this.ngRedux.select<M>([...path, 'rows', i]).pipe(filter(x => !!x))
              )
            }
            return combineLatestOrEmpty(obs$)
          })
        )
    }


    const pipePageLoadNeeded = (page: GvFieldPage, trigger$: Observable<any>): Observable<boolean> => {
      let path: any[];
      const pagBy = paginateBy
      const key = subfieldIdToString(page)

      path = [infRoot, this.model, pagBy, key];
      const fromToString = getFromTo(page.limit, page.offset)
      // return this.ngRedux.select<boolean>([...path, 'loading', fromToString])
      //   .pipe(
      //     // map(loading => !loading),
      //     switchMap((loading) => {
      //       if (loading) return of(false)
      //       else return trigger$.pipe(mapTo(true))
      //     }),
      //     // first(),
      //   )

      return trigger$.pipe(
        switchMap(() => this.ngRedux.select<boolean>([...path, 'loading', fromToString])
          .pipe(
            first(),
            map(loading => !loading)
          )
        ))

    }


    const pipeCount = (page: GvFieldId): Observable<number | undefined> => {
      let path: any[];
      const pagBy = paginateBy
      const key = subfieldIdToString(page)

      path = [infRoot, this.model, pagBy, key];
      return this.ngRedux.select<number>([...path, 'count'])
    }


    return { pipePage, pipeCount, pipePageLoadNeeded }

  }


  pipeItemsInProject<M>(pkProject$: Observable<number | string>, getFkEntity: (item: M) => number) {

    return pipe(
      switchMap((items: ByPk<M>) => {
        return pkProject$.pipe(
          switchMap(pkProject => {
            const proRelsAndKey$: Observable<{ key: string, rel: ProInfoProjRel }>[] = [];
            for (const k in items) {
              if (items.hasOwnProperty(k)) {
                const item = items[k];
                proRelsAndKey$.push(
                  this.ngRedux.select<ProInfoProjRel>(
                    ['pro', 'info_proj_rel', 'by_fk_project__fk_entity', pkProject + '_' + getFkEntity(item)]
                  )
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

  pipeItemInProject<M>(pkProject$: Observable<number | string>, getFkEntity: (item: M) => number) {
    return pipe(
      switchMap((item: M) => {
        if (!item) return of(undefined);
        return pkProject$.pipe(
          switchMap(pkProject => {
            const proRel$ = this.ngRedux.select<ProInfoProjRel>(
              ['pro', 'info_proj_rel', 'by_fk_project__fk_entity', pkProject + '_' + getFkEntity(item)]
            )
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

class InfResourceSelections extends Selector {
  _by_pk_entity$ = this.selector<InfResource>('by_pk_entity')
  _by_fk_class$ = this.selector<ByPk<InfResource>>('by_fk_class')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }

  by_pk_entity_key$(key: string | number, ofProject = true) {
    const selection$ = this._by_pk_entity$.key(key)
    if (ofProject) return selection$.pipe(this.pipeItemInProject(this.pkProject$, (i) => i.pk_entity))
    return selection$
  }
  by_pk_entity_all$(ofProject = true) {
    const selection$ = this._by_pk_entity$.all$
    if (ofProject) return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (i) => i.pk_entity))
    return selection$
  }
  by_fk_class_key$(key: string | number, ofProject = true) {
    const selection$ = this._by_fk_class$.key(key)
    if (ofProject) return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (i) => i.pk_entity))
    return selection$
  }
}


class InfStatementSelections extends Selector {

  public by_pk_entity$ = this.selector<InfStatement>('by_pk_entity')
  public by_fk_subject_data$ = this.selector<ByPk<InfStatement>>('by_fk_subject_data')

  public pagination$ = this.paginationSelector<StatementWithTarget>()

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }

  by_pk_entity_key$(key: string | number, ofProject = true) {
    const selection$ = this.by_pk_entity$.key(key)
    if (ofProject) return selection$.pipe(this.pipeItemInProject(this.pkProject$, (i) => i.pk_entity))
    return selection$
  }

  by_subject$(foreignKeys: InfStatementSubjectFks, ofProject = true): Observable<InfStatement[]> {
    const key = indexStatementBySubject(foreignKeys);
    const selection$ = this.selector<ByPk<InfStatement>>('by_subject').key(key)
    if (ofProject) {
      return selection$.pipe(
        this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity),
        map(items => values(items))
      )
    }
    return selection$.pipe(
      map(items => values(items))
    );
  }

  by_subject_and_property$(foreignKeys: InfStatementSubjectAndProperyFks, ofProject = true): Observable<InfStatement[]> {
    return this.by_subject_and_property_indexed$(foreignKeys, ofProject).pipe(
      map(statementIdx => values(statementIdx))
    )
  }
  by_subject_and_property_indexed$(foreignKeys: InfStatementSubjectAndProperyFks, ofProject = true): Observable<ByPk<InfStatement>> {
    const key = indexStatementBySubjectProperty(foreignKeys);
    const selection$ = this.selector<ByPk<InfStatement>>('by_subject+property').key(key)
    if (ofProject) {
      return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity))
    }
    return selection$
  }

  by_object$(foreignKeys: InfStatementObjectFks, ofProject = true): Observable<InfStatement[]> {
    const key = indexStatementByObject(foreignKeys);
    const selection$ = this.selector<ByPk<InfStatement>>('by_object').key(key)
    if (ofProject) {
      return selection$.pipe(
        this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity),
        map(items => values(items))
      )
    }
    return selection$.pipe(
      map(items => values(items))
    );
  }

  by_object_and_property$(foreignKeys: InfStatementObjectAndProperyFks, ofProject = true): Observable<InfStatement[]> {
    return this.by_object_and_property_indexed$(foreignKeys, ofProject).pipe(
      map(statementIdx => values(statementIdx))
    )
  }

  by_object_and_property_indexed$(foreignKeys: InfStatementObjectAndProperyFks, ofProject = true): Observable<ByPk<InfStatement>> {
    const key = indexStatementByObjectProperty(foreignKeys);
    const selection$ = this.selector<ByPk<InfStatement>>('by_object+property').key(key)
    if (ofProject) {
      return selection$.pipe(
        this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity),
      )
    }
    return selection$
  }

}




class InfAppellationSelections extends Selector {
  public by_pk_entity$ = this.selector<InfAppellation>('by_pk_entity')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }
}

class InfLangStringSelections extends Selector {
  public by_pk_entity$ = this.selector<InfLangString>('by_pk_entity')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }
}

class InfPlaceSelections extends Selector {
  public by_pk_entity$ = this.selector<InfPlace>('by_pk_entity')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }
}

class InfTimePrimitiveSelections extends Selector {
  public by_pk_entity$ = this.selector<InfTimePrimitive>('by_pk_entity')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }
}

class InfLanguageSelections extends Selector {
  public by_pk_entity$ = this.selector<InfLanguage>('by_pk_entity')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }
}

class InfDimensionSelections extends Selector {
  public by_pk_entity$ = this.selector<InfDimension>('by_pk_entity')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }
}

export class InfSelector {

  resource$ = new InfResourceSelections(this.ngRedux, this.pkProject$, infDefinitions, 'resource');
  statement$ = new InfStatementSelections(this.ngRedux, this.pkProject$, infDefinitions, 'statement');
  appellation$ = new InfAppellationSelections(this.ngRedux, this.pkProject$, infDefinitions, 'appellation');
  place$ = new InfPlaceSelections(this.ngRedux, this.pkProject$, infDefinitions, 'place');
  lang_string$ = new InfLangStringSelections(this.ngRedux, this.pkProject$, infDefinitions, 'lang_string');
  time_primitive$ = new InfTimePrimitiveSelections(this.ngRedux, this.pkProject$, infDefinitions, 'time_primitive');
  language$ = new InfLanguageSelections(this.ngRedux, this.pkProject$, infDefinitions, 'language');
  dimension$ = new InfDimensionSelections(this.ngRedux, this.pkProject$, infDefinitions, 'dimension');

  pkEntityModelMap$ = this.ngRedux.select([infRoot, PR_ENTITY_MODEL_MAP]);
  constructor(public ngRedux: NgRedux<IAppState>, public pkProject$: Observable<number | string>) { }

  getModelOfEntity$(pkEntity: number) {
    return this.ngRedux.select<EntityModelAndClass<InfModelName>>([infRoot, PR_ENTITY_MODEL_MAP, pkEntity]);
  }
}
