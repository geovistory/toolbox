import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ByPk, IAppState } from 'app/core/store/model';
import { ReducerConfigCollection } from 'app/core/store/reducer-factory';
import { Observable } from 'rxjs';
import { DatDigital, DatNamespace, DatChunk } from '../sdk';
import { DatActions } from './dat.actions';
import { datDefinitions, datRoot } from './dat.config';
import { filter } from '../../../../node_modules/rxjs/operators';

class Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { }

  selector<M>(indexKey: string): { all$: Observable<M>, key: (x) => Observable<M> } {

    const all$ = this.ngRedux.select<M>([datRoot, this.model, indexKey])
      .pipe(filter(x => !!x))

    const key = (x): Observable<M> => this.ngRedux.select<M>([datRoot, this.model, indexKey, x])
      .pipe(filter(x => !!x))

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

class DatNamespaceSelections extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }

  public by_pk_entity$ = this.selector<DatNamespace>('by_pk_entity')
  public by_fk_project$ = this.selector<ByPk<DatNamespace>>('by_fk_project')
}

class DatChunkSelections extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }

  public by_pk_entity$ = this.selector<DatChunk>('by_pk_entity')
  public by_fk_text$ = this.selector<ByPk<DatChunk>>('by_fk_text')
}

@Injectable()
export class DatSelector extends DatActions {

  constructor(public ngRedux: NgRedux<IAppState>) {
    super(ngRedux)
  }

  digital$ = new DatDigitalSelections(this.ngRedux, datDefinitions, 'digital');
  namespace$ = new DatNamespaceSelections(this.ngRedux, datDefinitions, 'namespace');
  chunk$ = new DatChunkSelections(this.ngRedux, datDefinitions, 'chunk');

}
