import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ByPk, IAppState } from 'projects/toolbox/src/app/core/redux-store/model';
import { ReducerConfigCollection } from 'projects/toolbox/src/app/core/redux-store/reducer-factory';
import { Observable } from 'rxjs';
import { TabActions } from './tab.actions';
import { tabDefinitions, tabRoot } from './tab.config';
import { TabCell } from '../sdk-lb4';

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

@Injectable()
export class TabSelector extends TabActions {

  cell$ = new TabCellSelections(this.ngRedux, tabDefinitions, 'cell');

  constructor(public ngRedux: NgRedux<IAppState>) {
    super(ngRedux)
  }

}
