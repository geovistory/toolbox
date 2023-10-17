import { createFeatureSelector } from '@ngrx/store';
import { infFeatureKey } from "./inf.feature.key";
import { InfState } from "./inf.models";

export const getInfState = createFeatureSelector<InfState>(infFeatureKey);
