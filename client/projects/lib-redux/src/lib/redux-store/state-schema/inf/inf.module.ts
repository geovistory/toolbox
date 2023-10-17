import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { infAppellationFeature as infAppellationFeatureKey, infAppellationReducers } from './appellation/inf-appellation.reducer';
import { infDimensionFeature as infDimensionFeatureKey, infDimensionReducers } from './dimension/inf-dimension.reducer';
import { infFeatureKey } from "./inf.feature.key";
import { infLanguageFeature as infLanguageFeatureKey, infLanguageReducers } from './language/inf-language.reducer';
import { infLangStringFeature as infLangStringFeatureKey, infLangStringReducers } from './lang_string/inf-lang-string.reducer';
import { infPlaceFeature as infPlaceFeatureKey, infPlaceReducers } from './place/inf-place.reducer';
import { infResourceFeature as infResourceFeatureKey, infResourceReducers } from './resource/inf-resource.reducer';
import { infStatementFeature as infStatementFeatureKey, infStatementReducers } from './statement/inf-statement.reducer';
import { infTimePrimitiveFeature as infTimePrimitiveFeatureKey, infTimePrimitiveReducers } from './time_primitive/inf-time-primitive.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(infFeatureKey, {
      [infAppellationFeatureKey]: infAppellationReducers,
      [infDimensionFeatureKey]: infDimensionReducers,
      [infLangStringFeatureKey]: infLangStringReducers,
      [infLanguageFeatureKey]: infLanguageReducers,
      [infPlaceFeatureKey]: infPlaceReducers,
      [infResourceFeatureKey]: infResourceReducers,
      [infStatementFeatureKey]: infStatementReducers,
      [infTimePrimitiveFeatureKey]: infTimePrimitiveReducers,
    })
  ],
})
export class InfStoreModule { }
