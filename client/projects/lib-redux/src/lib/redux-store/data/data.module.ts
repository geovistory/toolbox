import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DataEffects } from './data.effects';
import { DataFacade } from './data.facade';
import { dataFeatureKey } from './data.feature.key';
import { dataReducer } from './data.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(dataFeatureKey, dataReducer),
    EffectsModule.forFeature(DataEffects)
  ],
  providers: [
    DataFacade,
  ]
})
export class DataModule { }
