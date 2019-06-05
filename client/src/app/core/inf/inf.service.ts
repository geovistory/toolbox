import { NgRedux } from '@angular-redux/store';
import { ByPk, IAppState } from 'app/core/store/model';
import { Observable } from 'rxjs';
import { InfPersistentItem, InfEntityAssociation, InfRole, InfAppellation, InfPlace, InfTimePrimitive, InfTextProperty, InfLanguage } from '../sdk';
import { mergeMap } from 'rxjs/operators';
import { infRoot, infDefinitions } from './inf.config';
import { ReducerConfigCollection } from 'app/core/store/reducer-factory';

class Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { }

  selector<M>(indexKey: string): { all$: Observable<ByPk<M>>, key: (x) => Observable<M> } {

    const all$ = this.pkProject$.pipe(
      mergeMap(pk => {
        return this.ngRedux.select<ByPk<M>>([infRoot, this.model, this.configs[this.model].facetteByPk, pk, indexKey])
      })
    )

    const key = (x): Observable<M> => {
      return this.pkProject$.pipe(
        mergeMap(pk => {
          return this.ngRedux.select<M>([infRoot, this.model, this.configs[this.model].facetteByPk, pk, indexKey, x])
        })
      )
    }

    return { all$, key }
  }
}

class InfPersistentItemSelections extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }

  public by_pk_entity$ = this.selector<InfPersistentItem>('by_pk_entity')
  public by_fk_class$ = this.selector<ByPk<InfPersistentItem>>('by_fk_class')

}

class InfTemporalEntitySelections extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }

  public by_pk_entity$ = this.selector<ByPk<InfPersistentItem>>('by_pk_entity')
  public by_fk_class$ = this.selector<ByPk<InfPersistentItem>>('by_fk_class')

}


class InfEntityAssociationSelections extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }

  public by_pk_entity$ = this.selector<ByPk<InfEntityAssociation>>('by_pk_entity')
  public by_fk_property$ = this.selector<ByPk<InfEntityAssociation>>('by_fk_property')
  public by_fk_info_domain$ = this.selector<ByPk<InfEntityAssociation>>('by_fk_info_domain')
  public by_fk_info_range$ = this.selector<ByPk<InfEntityAssociation>>('by_fk_info_range')
  public by_fk_data_domain$ = this.selector<ByPk<InfEntityAssociation>>('by_fk_data_domain')
  public by_fk_data_range$ = this.selector<ByPk<InfEntityAssociation>>('by_fk_data_range')
  public by_fk_property__fk_info_domain$ = this.selector<ByPk<InfEntityAssociation>>('by_fk_property__fk_info_domain')

}

class InfRoleSelections extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }

  public by_pk_entity$ = this.selector<ByPk<InfRole>>('by_pk_entity')
  public by_fk_property$ = this.selector<ByPk<InfRole>>('by_fk_property')
  public by_fk_entity$ = this.selector<ByPk<InfRole>>('by_fk_entity')
  public by_fk_temporal_entity$ = this.selector<ByPk<InfRole>>('by_fk_temporal_entity')
  public by_fk_property__fk_temporal_entity$ = this.selector<ByPk<InfRole>>('by_fk_property__fk_temporal_entity')
  public by_fk_property__fk_entity$ = this.selector<ByPk<InfRole>>('by_fk_property__fk_entity')

}

class InfAppellationSelections extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }

  public by_pk_entity$ = this.selector<InfAppellation>('by_pk_entity')
}

class InfPlaceSelections extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }

  public by_pk_entity$ = this.selector<InfPlace>('by_pk_entity')
}

class InfTimePrimitiveSelections extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }

  public by_pk_entity$ = this.selector<InfTimePrimitive>('by_pk_entity')
}

class InfTextPropertySelections extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }

  public by_pk_entity$ = this.selector<InfTextProperty>('by_pk_entity')
  public by_fk_concerned_entity$ = this.selector<ByPk<InfTextProperty>>('by_fk_concerned_entity')
}

class InfLanguageSelections extends Selector {
  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pkProject$: Observable<number | string>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { super(ngRedux, pkProject$, configs, model) }

  public by_pk_entity$ = this.selector<InfLanguage>('by_pk_entity')
}


export class InfSelector {

  constructor(public ngRedux: NgRedux<IAppState>, public pkProject$: Observable<number | string>) { }

  persistent_item$ = new InfPersistentItemSelections(this.ngRedux, this.pkProject$, infDefinitions, 'persistent_item');
  entity_association$ = new InfEntityAssociationSelections(this.ngRedux, this.pkProject$, infDefinitions, 'entity_association');
  temporal_entity$ = new InfTemporalEntitySelections(this.ngRedux, this.pkProject$, infDefinitions, 'temporal_entity');
  role$ = new InfRoleSelections(this.ngRedux, this.pkProject$, infDefinitions, 'role');
  appellation$ = new InfAppellationSelections(this.ngRedux, this.pkProject$, infDefinitions, 'appellation');
  place$ = new InfPlaceSelections(this.ngRedux, this.pkProject$, infDefinitions, 'place');
  text_property$ = new InfTextPropertySelections(this.ngRedux, this.pkProject$, infDefinitions, 'text_property');
  time_primitive$ = new InfTimePrimitiveSelections(this.ngRedux, this.pkProject$, infDefinitions, 'time_primitive');
  language$ = new InfLanguageSelections(this.ngRedux, this.pkProject$, infDefinitions, 'language');
}
