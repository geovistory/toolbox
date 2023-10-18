import { createFeatureSelector } from '@ngrx/store';
import { warFeatureKey } from "./war.feature.key";
import { WarState } from "./war.models";

export const getWarState = createFeatureSelector<WarState>(warFeatureKey);
