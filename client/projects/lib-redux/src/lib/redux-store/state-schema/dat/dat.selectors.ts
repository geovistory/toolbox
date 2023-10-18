import { createFeatureSelector } from '@ngrx/store';
import { datFeatureKey } from "./dat.feature.key";
import { DatState } from "./dat.models";

export const getDatState = createFeatureSelector<DatState>(datFeatureKey);
