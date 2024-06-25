import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import { uiFeatureKey } from '../ui.feature.key';
import { LoadingBarFacade } from './loading-bar.facade';
import { initialState, loadingBarReducer } from './loading-bar.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(
      uiFeatureKey,
      combineReducers({ loadingBar: loadingBarReducer }),
      { initialState: { loadingBar: initialState } }
    ),
  ],
  providers: [LoadingBarFacade]
})
export class LoadingBarModule { }
