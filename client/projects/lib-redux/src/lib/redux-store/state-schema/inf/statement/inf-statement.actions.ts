import { InfStatement } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { infRoot } from '../inf.config';
import { infStatementFeature } from './inf-statement.reducer';

export const infStatementActions = new CrudActionsFactory<InfStatement>(infRoot, infStatementFeature)
