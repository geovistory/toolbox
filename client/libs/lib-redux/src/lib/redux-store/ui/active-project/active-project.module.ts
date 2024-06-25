import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';

import { uiFeatureKey } from '../ui.feature.key';
import { ActiveProjectEffects } from './active-project.effects';
import { ActiveProjectFacade } from './active-project.facade';
import { activeProjectReducer, initialActiveProjectState } from './active-project.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(
      uiFeatureKey,
      combineReducers({ activeProject: activeProjectReducer }),
      { initialState: { activeProject: initialActiveProjectState } }
    ),
    EffectsModule.forFeature(ActiveProjectEffects)
  ],
  providers: [ActiveProjectFacade]
})
export class ActiveProjectModule { }
