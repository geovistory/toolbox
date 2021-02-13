import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ByPk, IAppState, ReducerConfigCollection, TabActions, tabDefinitions, tabRoot } from '@kleiolab/lib-redux';
import { TabCell } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';

class Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { }

  selector<M>(indexKey: string): { all$: Observable<ByPk<M>>, key: (x) => Observable<M> } {

    const all$ = this.ngRedux.select<ByPk<M>>([tabRoot, this.model, indexKey])

    const key = (x): Observable<M> => this.ngRedux.select<M>([tabRoot, this.model, indexKey, x])

    return { all$, key }
  }
}

class TabCellSelections extends Selector {
  public by_pk_cell$ = this.selector<TabCell>('by_pk_cell')
  public by_fk_column_fk_row$ = this.selector<ByPk<TabCell>>('by_fk_column_fk_row')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }

}

@Injectable({
  providedIn: 'root'
})
export class TabSelector extends TabActions {

  cell$ = new TabCellSelections(this.ngRedux, tabDefinitions, 'cell');

  constructor(public ngRedux: NgRedux<IAppState>) {
    super(ngRedux)
  }

}
