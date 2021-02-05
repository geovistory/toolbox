import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ByPk, IAppState } from 'app/core/redux-store/model';
import { ReducerConfigCollection } from 'app/core/redux-store/reducer-factory';
import { Observable } from 'rxjs';
import { filter } from '../../../../node_modules/rxjs/operators';
import { WarActions } from './war.actions';
import { warDefinitions, warRoot } from './war.config';
import { toString } from 'ramda';
import { WarEntityPreview } from '../sdk-lb4';


class Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { }

  selector<M>(indexKey: string): { all$: Observable<ByPk<M>>, key: (x: string | (string | number)[]) => Observable<M> } {

    const all$ = this.ngRedux.select<ByPk<M>>([warRoot, this.model, indexKey])

    const key = (x: string | (string | number)[]): Observable<M> => {
      const k = typeof x === 'string' ? x : x.map((part: string | number) => toString(part)).join('_');;

      return this.ngRedux.select<M>([warRoot, this.model, indexKey, k])
    }

    return { all$, key }
  }
}

class WarEntityPreviewSelector extends Selector {
  public by_pk_entity$ = this.selector<WarEntityPreview>('by_pk_entity')

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}


@Injectable()
export class WarSelector extends WarActions {

  entity_preview$ = new WarEntityPreviewSelector(this.ngRedux, warDefinitions, 'entity_preview');

  constructor(public ngRedux: NgRedux<IAppState>) {
    super(ngRedux)
  }
}
