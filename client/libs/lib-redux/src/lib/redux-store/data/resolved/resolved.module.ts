import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ResolvedEffects } from './resolved.effects';
import { resolvedFeatureKey } from './resolved.feature.key';
import { resolvedReducers } from './resolved.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(resolvedFeatureKey, resolvedReducers),
    EffectsModule.forFeature(ResolvedEffects)
  ]
})
export class ResolvedModule { }
