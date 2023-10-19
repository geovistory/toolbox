import { Injectable } from '@angular/core';
import { ProTextProperty } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { proTextPropertyActions } from './pro-text-property.actions';
import { byFksState, getByFks, getByFksWithoutLang } from './pro-text-property.selectors';

@Injectable({
  providedIn: 'root'
})
export class ProTextPropertyFacade extends CrudFacade<ProTextProperty> {

  fksIndex$ = this.store.select(byFksState);

  constructor(protected store: Store<IAppState>) {
    super(store, proTextPropertyActions)
  }

  getTextProperty = {
    byFks$: (d: Partial<ProTextProperty>) => this.store.select(getByFks(d)),
    byFksWithoutLang$: (d: Partial<ProTextProperty>) => this.store.select(getByFksWithoutLang(d)),
  };
}
