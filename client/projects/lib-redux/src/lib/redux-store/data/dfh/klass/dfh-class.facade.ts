import { Injectable } from '@angular/core';
import { DfhClass } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { dfhClassActions } from './dfh-class.actions';
import { byPkClassState, getDfhClass } from './dfh-class.selectors';

@Injectable({
  providedIn: 'root'
})
export class DfhClassFacade extends CrudFacade<DfhClass> {

  dfhClass$ = this.store.select(byPkClassState);

  constructor(protected store: Store<IAppState>) {
    super(store, dfhClassActions)
  }
  getDfhClass = {
    byPkClass$: (pkClass: number) => this.store.select(getDfhClass.byPkClass$(pkClass)),
    byBasicType$: (basicType: number) => this.store.select(getDfhClass.byBasicType$(basicType)),
  }
}
