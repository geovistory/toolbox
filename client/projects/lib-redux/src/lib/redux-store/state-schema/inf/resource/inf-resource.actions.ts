import { InfResource } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { infRoot } from '../inf.config';
import { infResourceFeature } from './inf-resource.reducer';

export const infResourceActions = new CrudActionsFactory<InfResource>(infRoot, infResourceFeature)
