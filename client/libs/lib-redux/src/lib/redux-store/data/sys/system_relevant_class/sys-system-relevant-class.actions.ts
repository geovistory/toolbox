import { SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { sysFeatureKey } from "../sys.feature.key";
import { sysSystemRelevantClassFeature } from './sys-system-relevant-class.reducer';

export const sysSystemRelevantClassActions = new CrudActionsFactory<SysSystemRelevantClass>(sysFeatureKey, sysSystemRelevantClassFeature)
