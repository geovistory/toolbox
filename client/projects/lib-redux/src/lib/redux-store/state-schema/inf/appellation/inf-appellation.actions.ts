import { InfAppellation } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { infRoot } from '../inf.config';
import { infAppellationFeature } from './inf-appellation.reducer';

export const infAppellationActions = new CrudActionsFactory<InfAppellation>(infRoot, infAppellationFeature)
