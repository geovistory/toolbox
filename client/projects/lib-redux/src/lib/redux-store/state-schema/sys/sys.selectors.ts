import { createFeatureSelector } from '@ngrx/store';
import { sysFeatureKey } from "./sys.feature.key";
import { SysState } from './sys.models';

export const getSysState = createFeatureSelector<SysState>(sysFeatureKey);
