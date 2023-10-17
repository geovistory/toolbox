import { createFeatureSelector } from '@ngrx/store';
import { proFeatureKey } from "./pro.feature.key";
import { ProState } from "./pro.models";

export const getProState = createFeatureSelector<ProState>(proFeatureKey);
