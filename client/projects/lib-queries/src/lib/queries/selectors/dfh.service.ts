import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '@kleiolab/lib-redux';
import { ByPk } from '@kleiolab/lib-redux';
import { empty, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DfhProperty } from '@kleiolab/lib-sdk-lb4';
import { DfhProfile } from '@kleiolab/lib-sdk-lb4';
import { DfhLabel } from '@kleiolab/lib-sdk-lb4';
import { DfhClass } from '@kleiolab/lib-sdk-lb4';
import { ReducerConfigCollection } from '@kleiolab/lib-redux';
import { DfhActions } from '@kleiolab/lib-redux';
import { dfhDefinitions, dfhRoot } from '@kleiolab/lib-redux';
import { DfhClassSlice, DfhLabelSlice, DfhProfileSlice, DfhPropertySlice } from '@kleiolab/lib-redux';
import { ShouldPauseService } from '../services/should-pause.service';
class Selector<Slice> {

  slice$ = this.ngRedux.select<Slice>([dfhRoot, this.model])

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public configs: ReducerConfigCollection,
    public model: string,
    public shouldPause$: Observable<boolean>
  ) {
  }

  selector<M>(indexKey: string): { all$: Observable<ByPk<M>>, key: (x) => Observable<M>, noPause: { all$: Observable<ByPk<M>>, key: (x) => Observable<M> } } {

    const allNoPause$ = this.ngRedux.select<ByPk<M>>([dfhRoot, this.model, indexKey]);
    const all$ = this.shouldPause$.pipe(
      switchMap(shouldPause => shouldPause ?
        empty() :
        allNoPause$
      )
    );

    const keyNoPause = (x) => this.ngRedux.select<M>([dfhRoot, this.model, indexKey, x]);
    const key = (x): Observable<M> => this.shouldPause$.pipe(
      switchMap(shouldPause => shouldPause ?
        empty() :
        this.ngRedux.select<M>([dfhRoot, this.model, indexKey, x])
      )
    )

    return { all$, key, noPause: { all$: allNoPause$, key: keyNoPause } }
  }
}
// Profile Selectors
class DfhProfileSelections extends Selector<DfhProfileSlice> {
  public by_pk_profile$ = this.selector<DfhProfile>('by_pk_profile');
}

// Class Selectors
class DfhClassSelections extends Selector<DfhClassSlice> {
  public by_pk_class$ = this.selector<DfhClass>('by_pk_class');
  public by_basic_type$ = this.selector<ByPk<DfhClass>>('by_basic_type');
}

// Property Selectors
class DfhPropertySelections extends Selector<DfhPropertySlice> {
  public pk_property__has_domain__has_range$ = this.selector<DfhProperty>('pk_property__has_domain__has_range');
  public by_pk_property$ = this.selector<ByPk<DfhProperty>>('by_pk_property');
  public by_has_domain__pk_property$ = this.selector<ByPk<DfhProperty>>('by_has_domain__pk_property');
  public by_has_range__pk_property$ = this.selector<ByPk<DfhProperty>>('by_has_range__pk_property');
  public by_has_domain$ = this.selector<ByPk<DfhProperty>>('by_has_domain');
  public by_has_range$ = this.selector<ByPk<DfhProperty>>('by_has_range');
  public by_is_has_type_subproperty$ = this.selector<ByPk<DfhProperty>>('by_is_has_type_subproperty');
}

// Label Selectors
class DfhLabelSelections extends Selector<DfhLabelSlice> {
  public by_fks$ = this.selector<DfhLabel>('by_fks');
  public by_fk_class__type$ = this.selector<ByPk<DfhLabel>>('by_fk_class__type');
  public by_fk_property__type$ = this.selector<ByPk<DfhLabel>>('by_fk_property__type');
  public by_fk_profile__type$ = this.selector<ByPk<DfhLabel>>('by_fk_profile__type');
}


@Injectable({
  providedIn: 'root'
})
export class DfhSelector extends DfhActions {

  profile$ = new DfhProfileSelections(this.ngRedux, dfhDefinitions, 'profile', this.pause.shouldPause$)
  class$ = new DfhClassSelections(this.ngRedux, dfhDefinitions, 'klass', this.pause.shouldPause$)
  property$ = new DfhPropertySelections(this.ngRedux, dfhDefinitions, 'property', this.pause.shouldPause$)
  label$ = new DfhLabelSelections(this.ngRedux, dfhDefinitions, 'label', this.pause.shouldPause$)

  constructor(
    public ngRedux: NgRedux<IAppState>,
    public pause: ShouldPauseService
  ) {
    super(ngRedux)
  }
}
