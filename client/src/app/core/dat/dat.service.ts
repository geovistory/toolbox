import { NgRedux } from '@angular-redux/store';
import { IAppState, ByPk } from 'app/core/store/model';
import { ReducerConfigCollection } from 'app/core/store/reducer-factory';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DatDigital } from '../sdk';
import { datDefinitions, datRoot } from './dat.config';

class Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { }

  selector<M>(indexKey: string): { all$: Observable<M>, key: (x) => Observable<M> } {

    const all$ = this.ngRedux.select<M>([datRoot, this.model, indexKey])

    const key = (x): Observable<M> => this.ngRedux.select<M>([datRoot, this.model, indexKey, x])

    return { all$, key }
  }
}

class DatDigitalSelections extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }

  public by_pk_entity__entity_version$ = this.selector<DatDigital>('by_pk_entity__entity_version')
  public by_pk_entity$ = this.selector<ByPk<DatDigital>>('by_pk_entity')
}

export class DatSelector {

  constructor(public ngRedux: NgRedux<IAppState>,) { }

  digital$ = new DatDigitalSelections(this.ngRedux, datDefinitions, 'digital');

}
