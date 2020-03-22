import { NgRedux } from '@angular-redux/store';
import { ByPk, IAppState } from 'app/core/store/model';
import { getFromTo, paginatedBy, paginateKey, paginateName, ReducerConfigCollection } from 'app/core/store/reducer-factory';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { tag } from '../../../../node_modules/rxjs-spy/operators';
import { InfAppellation, InfLanguage, InfPersistentItem, InfPlace, InfRole, InfTemporalEntity, InfTextProperty, InfTimePrimitive } from '../sdk';
import { PaginateByParam } from '../store/actions';
import { combineLatestOrEmpty } from '../util/combineLatestOrEmpty';
import { infDefinitions, infRoot } from './inf.config';

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
        // .pipe(auditTime(1))
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
            .pipe(
              // distinctUntilChanged<M>(equals),
              tag(`InfSelector::key::${path}`)
            )
        })
      )

    }

    return { all$, key }
  }

  paginationSelector<M>() {
    // const key = (by: PaginateByParam[]): Observable<M> => this.pkProject$.pipe(
    //   switchMap(pk => {
    //     let path: any[];
    //     const pagBy = paginatedBy(paginateName(by))
    //     const key = paginateKey(by)
    //     if (this.configs[this.model].facetteByPk) {
    //       path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, pagBy, key];
    //     } else {
    //       path = [infRoot, this.model, pagBy, key];
    //     }
    //     return this.ngRedux.select<M>(path)
    //       .pipe(
    //         // distinctUntilChanged<M>(equals),
    //         tag(`InfSelector::key::${path}`)
    //       )
    //   })
    // )

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


        // return this.ngRedux.select<boolean>([...path, 'loading', getFromTo(limit, offset)]).pipe(
        //   switchMap(loading => iif(
        //     // Q: is it already loading?
        //     () => loading == true,
        //     // A: yes. so no loading needed
        //     of(false),
        //     // Q: What's the length of the list?
        //     trigger$.pipe(map(() => true))
        //     // this.ngRedux.select<number>([...path, 'count']).pipe(
        //     //   switchMap(count => {
        //     //     // A: there is no information about the length, loading needed
        //     //     if (count === undefined) return of(true);
        //     //     // A: Length is 0, no loading needed
        //     //     if (count === 0) return of(false);

        //     //     // A: there is information about the length, so select all items in the requested segement
        //     //     const start = offset;
        //     //     const end = count <= (start + limit) ? count : (start + limit);
        //     //     const obs$: Observable<M>[] = [];
        //     //     for (let i = start; i < end; i++) {
        //     //       obs$.push(
        //     //         this.ngRedux.select<M>([...path, 'rows', i])
        //     //       )
        //     //     }
        //     //     // Emit true if at least one of the requested items is still undefined
        //     //     return combineLatest(obs$).pipe(first(), map(pks => pks.includes(undefined)))
        //     //   })
        //     // )
        //   ))
        // )



      })
    )

    const pipeCount = (by: PaginateByParam[]): Observable<number> => this.pkProject$.pipe(
      switchMap(pk => {
        let path: any[];
        const pagBy = paginatedBy(paginateName(by))
        const key = paginateKey(by)
        if (this.configs[this.model].facetteByPk) {
          path = [infRoot, this.model, this.configs[this.model].facetteByPk, pk, pagBy, key];
        } else {
          path = [infRoot, this.model, pagBy, key];
        }
        return this.ngRedux.select<number>([...path, 'count']).pipe(map(c => c ? c : 0))
      })
    )

    return { pipePage, pipePageLoadNeeded, pipeCount }

  }


}

class InfPersistentItemSelections extends Selector {
  public by_pk_entity$ = this.selector<InfPersistentItem>('by_pk_entity')
  public by_fk_class$ = this.selector<ByPk<InfPersistentItem>>('by_fk_class')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }

}

class InfTemporalEntitySelections extends Selector {
  public by_pk_entity$ = this.selector<InfTemporalEntity>('by_pk_entity')
  public by_fk_class$ = this.selector<ByPk<InfTemporalEntity>>('by_fk_class')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }

}


class InfRoleSelections extends Selector {

  public by_pk_entity$ = this.selector<InfRole>('by_pk_entity')
  public by_fk_property$ = this.selector<ByPk<InfRole>>('by_fk_property')
  public by_fk_entity$ = this.selector<ByPk<InfRole>>('by_fk_entity')
  public by_fk_temporal_entity$ = this.selector<ByPk<InfRole>>('by_fk_temporal_entity')
  public by_fk_property__fk_temporal_entity$ = this.selector<ByPk<InfRole>>('by_fk_property__fk_temporal_entity')
  public by_fk_property__fk_entity$ = this.selector<ByPk<InfRole>>('by_fk_property__fk_entity')
  public by_fk_subject_data$ = this.selector<ByPk<InfRole>>('by_fk_subject_data')
  public by_fk_object_data$ = this.selector<ByPk<InfRole>>('by_fk_object_data')

  public pagination$ = this.paginationSelector<number>()

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }


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

class InfTextPropertySelections extends Selector {
  public by_pk_entity$ = this.selector<InfTextProperty>('by_pk_entity')
  public by_fk_concerned_entity__fk_class_field$ = this.selector<ByPk<InfTextProperty>>('by_fk_concerned_entity__fk_class_field')
  public by_fk_concerned_entity$ = this.selector<ByPk<InfTextProperty>>('by_fk_concerned_entity')

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


export class InfSelector {

  persistent_item$ = new InfPersistentItemSelections(this.ngRedux, this.pkProject$, infDefinitions, 'persistent_item');
  temporal_entity$ = new InfTemporalEntitySelections(this.ngRedux, this.pkProject$, infDefinitions, 'temporal_entity');
  role$ = new InfRoleSelections(this.ngRedux, this.pkProject$, infDefinitions, 'role');
  appellation$ = new InfAppellationSelections(this.ngRedux, this.pkProject$, infDefinitions, 'appellation');
  place$ = new InfPlaceSelections(this.ngRedux, this.pkProject$, infDefinitions, 'place');
  text_property$ = new InfTextPropertySelections(this.ngRedux, this.pkProject$, infDefinitions, 'text_property');
  time_primitive$ = new InfTimePrimitiveSelections(this.ngRedux, this.pkProject$, infDefinitions, 'time_primitive');
  language$ = new InfLanguageSelections(this.ngRedux, this.pkProject$, infDefinitions, 'language');

  constructor(public ngRedux: NgRedux<IAppState>, public pkProject$: Observable<number | string>) { }
}
