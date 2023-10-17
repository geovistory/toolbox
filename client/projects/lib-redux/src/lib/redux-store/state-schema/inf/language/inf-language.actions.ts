import { InfLanguage } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { infRoot } from '../inf.config';
import { infLanguageFeature } from './inf-language.reducer';

export const infLanguageActions = new CrudActionsFactory<InfLanguage>(infRoot, infLanguageFeature)
