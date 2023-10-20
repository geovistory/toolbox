import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { PROJECT_ID$ } from '../PROJECT_ID$';
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
    { provide: PROJECT_ID$, useValue: new BehaviorSubject(1) }
  ]
})
export class DataModule { }
