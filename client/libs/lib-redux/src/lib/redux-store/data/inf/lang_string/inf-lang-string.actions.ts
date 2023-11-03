import { InfLangString } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { infFeatureKey } from "../inf.feature.key";
import { infLangStringFeature } from './inf-lang-string.reducer';

export const infLangStringActions = new CrudActionsFactory<InfLangString>(infFeatureKey, infLangStringFeature)
