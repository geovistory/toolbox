import { Injectable } from '@angular/core';
import { DfhProfile } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_helpers/crud-facade';
import { dfhProfileActions } from './dfh-profile.actions';
import { getDfhProfile, indexState } from './dfh-profile.selectors';

@Injectable({
  providedIn: 'root'
})
export class DfhProfileFacade extends CrudFacade<DfhProfile> {

  dfhProfile$ = this.store.select(indexState);

  constructor(protected store: Store<IAppState>) {
    super(store, dfhProfileActions)
  }
  getDfhProfile = {
    byProfile: (profile: number) => this.store.select(getDfhProfile.byProfile(profile))
  }

}
