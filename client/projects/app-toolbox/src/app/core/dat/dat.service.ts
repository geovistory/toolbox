import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DatChunk, DatColumn, DatDigital, DatNamespace, DatTextProperty } from '@kleiolab/lib-sdk-lb3';
import { ByPk, IAppState } from 'projects/app-toolbox/src/app/core/redux-store/model';
import { ReducerConfigCollection } from 'projects/app-toolbox/src/app/core/redux-store/reducer-factory';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatClassColumnMapping } from "@kleiolab/lib-sdk-lb4";
import { latestVersion } from '../util/custom-rxjs-operators';
import { DatActions } from './dat.actions';
import { datDefinitions, datRoot } from './dat.config';

class Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { }

  selector<M>(indexKey: string): { all$: Observable<ByPk<M>>, key: (x) => Observable<M> } {

    const all$ = this.ngRedux.select<ByPk<M>>([datRoot, this.model, indexKey])
    // .pipe(
    //   distinctUntilChanged<M>(equals)
    // )

    const key = (x): Observable<M> => this.ngRedux.select<M>([datRoot, this.model, indexKey, x])
    // .pipe(
    //   distinctUntilChanged<M>(equals)
    // )

    return { all$, key }
  }
}

class DatDigitalSelections extends Selector {
  public by_pk_entity__entity_version$ = this.selector<DatDigital>('by_pk_entity__entity_version')
  public by_pk_entity$ = this.selector<ByPk<DatDigital>>('by_pk_entity')
  public by_pk_text$ = this.selector<ByPk<DatDigital>>('by_pk_text')



  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }

  latestVersion(pkDigital: number): Observable<DatDigital> {
    return this.by_pk_entity$.key(pkDigital).pipe(
      map(versions => latestVersion(versions)),
    )
  }
}

class DatNamespaceSelections extends Selector {
  public by_pk_entity$ = this.selector<DatNamespace>('by_pk_entity')
  public by_fk_project$ = this.selector<ByPk<DatNamespace>>('by_fk_project')
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}

class DatChunkSelections extends Selector {
  public by_pk_entity$ = this.selector<DatChunk>('by_pk_entity')
  public by_fk_text$ = this.selector<ByPk<DatChunk>>('by_fk_text')
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}

class DatClassColumnMappingSelections extends Selector {
  public by_pk_entity$ = this.selector<DatClassColumnMapping>('by_pk_entity')
  public by_fk_column$ = this.selector<ByPk<DatClassColumnMapping>>('by_fk_column')
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}

class DatColumnSelections extends Selector {
  public by_pk_entity$ = this.selector<DatColumn>('by_pk_entity')
  public by_fk_digital$ = this.selector<ByPk<DatColumn>>('by_fk_digital')
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}

class DatTextPropertySelections extends Selector {
  public by_pk_entity$ = this.selector<DatTextProperty>('by_pk_entity')
  public by_fk_entity__fk_system_type$ = this.selector<ByPk<DatTextProperty>>('by_fk_entity__fk_system_type')
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, configs, model) }
}

@Injectable()
export class DatSelector extends DatActions {

  digital$ = new DatDigitalSelections(this.ngRedux, datDefinitions, 'digital');
  namespace$ = new DatNamespaceSelections(this.ngRedux, datDefinitions, 'namespace');
  chunk$ = new DatChunkSelections(this.ngRedux, datDefinitions, 'chunk');
  column$ = new DatColumnSelections(this.ngRedux, datDefinitions, 'column');
  class_column_mapping$ = new DatClassColumnMappingSelections(this.ngRedux, datDefinitions, 'class_column_mapping');
  text_property$ = new DatTextPropertySelections(this.ngRedux, datDefinitions, 'text_property');

  constructor(public ngRedux: NgRedux<IAppState>) {
    super(ngRedux)
  }

}
