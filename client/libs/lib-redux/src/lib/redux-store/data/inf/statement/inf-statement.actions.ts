import { InfStatement } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { infFeatureKey } from "../inf.feature.key";
import { infStatementFeature } from './inf-statement.reducer';

export const infStatementActions = new CrudActionsFactory<InfStatement>(infFeatureKey, infStatementFeature)
