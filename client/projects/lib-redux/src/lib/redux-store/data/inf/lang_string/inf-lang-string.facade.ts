import { Injectable } from '@angular/core';
import { InfLangString } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { infLangStringActions } from './inf-lang-string.actions';
import { getLangStringByPkEntity, getLangStringByPkEntityState } from './inf-lang-string.selectors';

@Injectable({
  providedIn: 'root'
})
export class InfLangStringFacade extends CrudFacade<InfLangString> {

  langStringsByPkEntity$ = this.store.select(getLangStringByPkEntityState);

  constructor(protected store: Store<IAppState>) {
    super(store, infLangStringActions)
  }

  getLangString = {
    byPkEntity$: (pkEntity: number) => this.store.select(getLangStringByPkEntity(pkEntity))
  };
}
