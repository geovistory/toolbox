import { createFeatureSelector } from '@ngrx/store';
import { dataFeatureKey } from './data.feature.key';
import { DataState } from './data.model';

export const getDataState = createFeatureSelector<DataState>(dataFeatureKey);
