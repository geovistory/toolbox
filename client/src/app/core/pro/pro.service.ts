import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ByPk, IAppState } from 'app/core/store/model';
import { ReducerConfigCollection } from 'app/core/store/reducer-factory';
import { Observable } from 'rxjs';
import { filter } from '../../../../node_modules/rxjs/operators';
import { ProInfoProjRel } from '../sdk';
import { ProActions } from './pro.actions';
import { proDefinitions, proRoot } from './pro.config';

class Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { }

  selector<M>(indexKey: string): { all$: Observable<M>, key: (x) => Observable<M> } {

    const all$ = this.ngRedux.select<M>([proRoot, this.model, indexKey])
      .pipe(filter(x => !!x))

    const key = (x): Observable<M> => this.ngRedux.select<M>([proRoot, this.model, indexKey, x])
      .pipe(filter(x => !!x))

    return { all$, key }
  }
}

class ProInfoProjRelSelector extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }

  public by_fk_project__fk_entity$ = this.selector<ProInfoProjRel>('by_fk_project__fk_entity')
  public by_pk_entity$ = this.selector<ByPk<ProInfoProjRel>>('by_pk_entity')
}


@Injectable()
export class ProSelector extends ProActions {

  constructor(public ngRedux: NgRedux<IAppState>) {
    super(ngRedux)
  }

  info_proj_rel$ = new ProInfoProjRelSelector(this.ngRedux, proDefinitions, 'info_proj_rel');
}
