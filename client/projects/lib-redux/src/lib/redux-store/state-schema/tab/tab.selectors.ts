import { createFeatureSelector } from '@ngrx/store';
import { tabFeatureKey } from "./tab.feature.key";
import { TabState } from "./tab.models";

export const getTabState = createFeatureSelector<TabState>(tabFeatureKey);
