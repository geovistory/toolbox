import { Injectable } from '@angular/core';
import { InfLanguage } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { infLanguageActions } from './inf-language.actions';
import { getLanguageByPkEntity, getLanguageByPkEntityState, getLanguageLabelByPkEntity } from './inf-language.selectors';

@Injectable({
  providedIn: 'root'
})
export class InfLanguageFacade extends CrudFacade<InfLanguage> {

  languagesByPkEntity$ = this.store.select(getLanguageByPkEntityState);

  constructor(protected override store: Store<IAppState>) {
    super(store, infLanguageActions)
  }

  getLanguage = {
    byPkEntity$: (pkEntity: number) => this.store.select(getLanguageByPkEntity(pkEntity))
  };

  getLanguageLabel = {
    byPkEntity$: (pkEntity: number) => this.store.select(getLanguageLabelByPkEntity(pkEntity))
  }
}
