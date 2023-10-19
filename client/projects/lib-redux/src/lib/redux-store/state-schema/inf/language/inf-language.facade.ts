import { Injectable } from '@angular/core';
import { InfLanguage } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_helpers/crud-facade';
import { infLanguageActions } from './inf-language.actions';
import { getLanguageByPkEntity, getLanguageByPkEntityState } from './inf-language.selectors';

@Injectable({
  providedIn: 'root'
})
export class InfLanguageFacade extends CrudFacade<InfLanguage> {

  languagesByPkEntity$ = this.store.select(getLanguageByPkEntityState);

  constructor(protected store: Store<IAppState>) {
    super(store, infLanguageActions)
  }

  getLanguage = {
    byPkEntity$: (pkEntity: number) => this.store.select(getLanguageByPkEntity(pkEntity))
  };
}
