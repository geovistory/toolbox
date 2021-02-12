import { NgRedux } from '@angular-redux/store';
import { ByPk, EntityModelAndClass, getFromTo, IAppState, IndexStatementByObject, indexStatementByObject, IndexStatementByObjectProperty, indexStatementByObjectProperty, IndexStatementBySubject, indexStatementBySubject, IndexStatementBySubjectProperty, indexStatementBySubjectProperty, infDefinitions, infRoot, PaginateByParam, paginatedBy, paginateKey, paginateName, PR_ENTITY_MODEL_MAP, ReducerConfigCollection } from '@kleiolab/lib-redux';
import { InfAppellation, InfDimension, InfLangString, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive, ProInfoProjRel } from '@kleiolab/lib-sdk-lb3';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { values } from 'd3';
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

    const all$ = this.pkProject$.pipe(
      switchMap(pk => {
        let path: any[];
        if (this.configs[this.model].facetteByPk) {
          path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, indexKey];
        } else {
          path = [infRoot, this.model, indexKey];
        }
        return this.ngRedux.select<ByPk<M>>(path)
      })
    )


    const key = (x): Observable<M> => {
      return this.pkProject$.pipe(
        switchMap(pk => {
          let path: any[];
          if (this.configs[this.model].facetteByPk) {
            path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, indexKey, x];
          } else {
            path = [infRoot, this.model, indexKey, x];
          }
          return this.ngRedux.select<M>(path)
        })
      )

    }

    return { all$, key }
  }

  paginationSelector<M>() {

    const pipePage = (by: PaginateByParam[], limit: number, offset: number): Observable<M[]> => this.pkProject$.pipe(
      switchMap(pk => {
        let path: any[];
        const pagBy = paginatedBy(paginateName(by))
        const key = paginateKey(by)
        if (this.configs[this.model].facetteByPk) {
          path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, pagBy, key];
        } else {
          path = [infRoot, this.model, pagBy, key];
        }
        return this.ngRedux.select<number>([...path, 'count'])
          .pipe(
            filter(count => count !== undefined),
            switchMap(count => {
              const start = offset;
              const end = count <= (start + limit) ? count : (start + limit);
              const obs$: Observable<M>[] = [];
              for (let i = start; i < end; i++) {
                obs$.push(
                  this.ngRedux.select<M>([...path, 'rows', i]).pipe(filter(x => !!x))
                )
              }
              return combineLatestOrEmpty(obs$)
            })
          )
      })
    )

    const pipePageLoadNeeded = (by: PaginateByParam[], limit: number, offset: number, trigger$?: Observable<any>): Observable<boolean> => this.pkProject$.pipe(
      switchMap(pk => {
        let path: any[];
        const pagBy = paginatedBy(paginateName(by))
        const key = paginateKey(by)
        if (this.configs[this.model].facetteByPk) {
          path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, pagBy, key];
        } else {
          path = [infRoot, this.model, pagBy, key];
        }

        return trigger$.pipe(
          switchMap(() => this.ngRedux.select<boolean>([...path, 'loading', getFromTo(limit, offset)])
            .pipe(
              first(),
              map(loading => !loading)
            )
          ))

      })
    )

    const pipeCount = (by: PaginateByParam[]): Observable<number | undefined> => this.pkProject$.pipe(
      switchMap(pk => {
        let path: any[];
        const pagBy = paginatedBy(paginateName(by))
        const key = paginateKey(by)
        if (this.configs[this.model].facetteByPk) {
          path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, pagBy, key];
        } else {
          path = [infRoot, this.model, pagBy, key];
        }
        return this.ngRedux.select<number>([...path, 'count'])
      })
    )

    return { pipePage, pipePageLoadNeeded, pipeCount }

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
                  this.ngRedux.select<ProInfoProjRel>(['pro', 'info_proj_rel', 'by_fk_project__fk_entity', pkProject + '_' + getFkEntity(item)])
                    .pipe(map(rel => ({ key: k, rel })))
                )
              }
            }
            return combineLatestOrEmpty(proRelsAndKey$).pipe(
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
            const proRel$ = this.ngRedux.select<ProInfoProjRel>(['pro', 'info_proj_rel', 'by_fk_project__fk_entity', pkProject + '_' + getFkEntity(item)])
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

class InfPersistentItemSelections extends Selector {
  private _by_pk_entity$ = this.selector<InfPersistentItem>('by_pk_entity')
  private _by_fk_class$ = this.selector<ByPk<InfPersistentItem>>('by_fk_class')

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

class InfTemporalEntitySelections extends Selector {
  private _by_pk_entity$ = this.selector<InfTemporalEntity>('by_pk_entity')
  // public by_fk_class$ = this.selector<ByPk<InfTemporalEntity>>('by_fk_class')

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
}


class InfStatementSelections extends Selector {

  private _by_pk_entity$ = this.selector<InfStatement>('by_pk_entity')
  public by_fk_subject_data$ = this.selector<ByPk<InfStatement>>('by_fk_subject_data')

  public pagination$ = this.paginationSelector<number>()

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

  by_subject$(foreignKeys: IndexStatementBySubject, ofProject = true): Observable<InfStatement[]> {
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

  by_subject_and_property$(foreignKeys: IndexStatementBySubjectProperty, ofProject = true): Observable<InfStatement[]> {
    return this.by_subject_and_property_indexed$(foreignKeys, ofProject).pipe(
      map(statementIdx => values(statementIdx))
    )
  }
  by_subject_and_property_indexed$(foreignKeys: IndexStatementBySubjectProperty, ofProject = true): Observable<ByPk<InfStatement>> {
    const key = indexStatementBySubjectProperty(foreignKeys);
    const selection$ = this.selector<ByPk<InfStatement>>('by_subject+property').key(key)
    if (ofProject) {
      return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity))
    }
    return selection$
  }

  by_object$(foreignKeys: IndexStatementByObject, ofProject = true): Observable<InfStatement[]> {
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

  by_object_and_property$(foreignKeys: IndexStatementByObjectProperty, ofProject = true): Observable<InfStatement[]> {
    return this.by_object_and_property_indexed$(foreignKeys, ofProject).pipe(
      map(statementIdx => values(statementIdx))
    )
  }

  by_object_and_property_indexed$(foreignKeys: IndexStatementByObjectProperty, ofProject = true): Observable<ByPk<InfStatement>> {
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


class InfTextPropertySelections extends Selector {
  private _by_pk_entity$ = this.selector<InfTextProperty>('by_pk_entity')
  private _by_fk_concerned_entity__fk_class_field$ = this.selector<ByPk<InfTextProperty>>('by_fk_concerned_entity__fk_class_field')
  private _by_fk_concerned_entity$ = this.selector<ByPk<InfTextProperty>>('by_fk_concerned_entity')

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

  by_fk_concerned_entity__fk_class_field_indexed$(key: string, ofProject = true): Observable<ByPk<InfTextProperty>> {
    const selection$ = this._by_fk_concerned_entity__fk_class_field$.key(key)
    if (ofProject) {
      return selection$.pipe(
        this.pipeItemsInProject(this.pkProject$, (item) => item.pk_entity),
      )
    }
    return selection$
  }


  by_fk_concerned_entity_indexed$(key: string | number, ofProject = true): Observable<ByPk<InfTextProperty>> {
    const selection$ = this._by_fk_concerned_entity$.key(key)
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

  persistent_item$ = new InfPersistentItemSelections(this.ngRedux, this.pkProject$, infDefinitions, 'persistent_item');
  temporal_entity$ = new InfTemporalEntitySelections(this.ngRedux, this.pkProject$, infDefinitions, 'temporal_entity');
  statement$ = new InfStatementSelections(this.ngRedux, this.pkProject$, infDefinitions, 'statement');
  appellation$ = new InfAppellationSelections(this.ngRedux, this.pkProject$, infDefinitions, 'appellation');
  place$ = new InfPlaceSelections(this.ngRedux, this.pkProject$, infDefinitions, 'place');
  text_property$ = new InfTextPropertySelections(this.ngRedux, this.pkProject$, infDefinitions, 'text_property');
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
