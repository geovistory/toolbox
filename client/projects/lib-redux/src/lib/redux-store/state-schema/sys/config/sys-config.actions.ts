import { SysConfigValue } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { sysFeatureKey } from "../sys.feature.key";
import { sysConfigFeature } from './sys-config.reducer';

export const sysConfigActions = new CrudActionsFactory<SysConfigValue>(sysFeatureKey, sysConfigFeature)
