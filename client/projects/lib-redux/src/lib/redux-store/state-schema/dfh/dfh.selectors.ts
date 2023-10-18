import { createFeatureSelector } from '@ngrx/store';
import { dfhFeatureKey } from "./dfh.feature.key";
import { DfhState } from './dfh.models';

export const getDfhState = createFeatureSelector<DfhState>(dfhFeatureKey);
