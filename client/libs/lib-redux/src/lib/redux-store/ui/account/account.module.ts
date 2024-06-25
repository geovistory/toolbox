import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, combineReducers } from '@ngrx/store';
import { uiFeatureKey } from '../ui.feature.key';
import { AccountEffects } from './account.effects';
import { AccountFacade } from './account.facade';
import { accountReducer, initialAccountState } from './account.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(
      uiFeatureKey,
      combineReducers({ account: accountReducer }),
      { initialState: { account: initialAccountState } }
    ),
    EffectsModule.forFeature(AccountEffects),
  ],
  providers: [AccountFacade]
})
export class AccountModule { }
