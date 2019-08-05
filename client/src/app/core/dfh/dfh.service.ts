import { select, WithSubStore, NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ByPk, IAppState } from 'app/core/store/model';
import { Observable } from 'rxjs';
import { DfhClass, DfhLabel, DfhPropertyProfileView, DfhPropertyView } from '../sdk';
import { DfhActions } from './dfh.actions';
import { dfhRoot, dfhDefinitions } from './dfh.config';
import { ReducerConfigCollection } from '../store/reducer-factory';
import { filter } from '../../../../node_modules/rxjs/operators';
import { DfhClassSlice, DfhPropertyProfileViewSlice, DfhLabelSlice, DfhPropertyViewSlice } from './dfh.models';
class Selector<Slice> {

  slice$ = this.ngRedux.select<Slice>([dfhRoot, this.model])

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string
  ) { }

  selector<M>(indexKey: string): { all$: Observable<ByPk<M>>, key: (x) => Observable<M> } {

    const all$ = this.ngRedux.select<ByPk<M>>([dfhRoot, this.model, indexKey])
      .pipe(filter(x => !!x))

    const key = (x): Observable<M> => this.ngRedux.select<M>([dfhRoot, this.model, indexKey, x])
      .pipe(filter(x => !!x))

    return { all$, key }
  }
}

// Class Selectors
class DfhClassSelections extends Selector<DfhClassSlice> {
  public by_dfh_pk_class$ = this.selector<DfhClass>('by_dfh_pk_class');
  public by_pk_entity$ = this.selector<ByPk<DfhClass>>('by_pk_entity');
  public loading$ = this.selector<boolean>('loading');
}

// PropertyProfileView Selectors
class DfhPropertyProfileViewSelections extends Selector<DfhPropertyProfileViewSlice> {
  public by_pk_entity$ = this.selector<DfhPropertyProfileView>('by_pk_entity');
  public by_dfh_has_domain__fk_property$ = this.selector<ByPk<DfhPropertyProfileView>>('by_dfh_has_domain__fk_property');
  public by_dfh_has_range__fk_property$ = this.selector<ByPk<DfhPropertyProfileView>>('by_dfh_has_range__fk_property');
  public loading$ = this.selector<boolean>('loading');
}
// PropertyView Selectors
class DfhPropertyViewSelections extends Selector<DfhPropertyViewSlice> {
  public by_dfh_pk_property$ = this.selector<DfhPropertyView>('by_dfh_pk_property');
  public by_dfh_has_domain__fk_property$ = this.selector<ByPk<DfhPropertyView>>('by_dfh_has_domain__fk_property');
  public by_dfh_has_range__fk_property$ = this.selector<ByPk<DfhPropertyView>>('by_dfh_has_range__fk_property');
  public fk_property__property_is_outgoing__fk_app_context$ = this.selector<ByPk<DfhPropertyView>>('fk_property__property_is_outgoing__fk_app_context');
  public by_fk_property$ = this.selector<ByPk<DfhPropertyView>>('by_fk_property');
  public loading$ = this.selector<boolean>('loading');
}

// Label Selectors
class DfhLabelSelections extends Selector<DfhLabelSlice> {
  public by_pk_entity$ = this.selector<DfhLabel>('by_pk_entity');
  public by_dfh_fk_class$ = this.selector<ByPk<DfhLabel>>('by_dfh_fk_class');
  public by_dfh_fk_property$ = this.selector<ByPk<DfhLabel>>('by_dfh_fk_property');
  public by_dfh_fk_property__com_fk_system_type$ = this.selector<ByPk<DfhLabel>>('by_dfh_fk_property__com_fk_system_type');
  public loading$ = this.selector<boolean>('loading');
}


@Injectable()
export class DfhSelector extends DfhActions {

  class$ = new DfhClassSelections(this.ngRedux, dfhDefinitions, 'klass')
  property_profile_view$ = new DfhPropertyProfileViewSelections(this.ngRedux, dfhDefinitions, 'property_profile_view')
  property_view$ = new DfhPropertyViewSelections(this.ngRedux, dfhDefinitions, 'property_view')
  label$ = new DfhLabelSelections(this.ngRedux, dfhDefinitions, 'label')

}
