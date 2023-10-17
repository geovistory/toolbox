import { InfLangString } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { infRoot } from '../inf.config';
import { infLangStringFeature } from './inf-lang-string.reducer';

export const infLangStringActions = new CrudActionsFactory<InfLangString>(infRoot, infLangStringFeature)
