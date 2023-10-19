import { Injectable } from '@angular/core';
import { DfhLabel } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { dfhLabelActions } from './dfh-label.actions';
import { getDfhLabel, indexState } from './dfh-label.selectors';

@Injectable({
  providedIn: 'root'
})
export class DfhLabelFacade extends CrudFacade<DfhLabel> {

  dfhLabel$ = this.store.select(indexState);

  constructor(protected store: Store<IAppState>) {
    super(store, dfhLabelActions)
  }
  getDfhLabel = {
    byFks: (item: Partial<DfhLabel>) => this.store.select(getDfhLabel.byFks(item)),
    byClass: (klass: number, type: string) => this.store.select(getDfhLabel.byClass(klass, type)),
    byProfile: (profile: number, type: string) => this.store.select(getDfhLabel.byProfile(profile, type)),
    byProperty: (property: number, type: string) => this.store.select(getDfhLabel.byProperty(property, type)),
  }

}
