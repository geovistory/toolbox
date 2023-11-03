import { InfLanguage } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { infFeatureKey } from "../inf.feature.key";
import { infLanguageFeature } from './inf-language.reducer';

export const infLanguageActions = new CrudActionsFactory<InfLanguage>(infFeatureKey, infLanguageFeature)
