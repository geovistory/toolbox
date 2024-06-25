import { ProAnalysis } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { proFeatureKey } from "../pro.feature.key";
import { proAnalysisFeature } from './pro-analysis.reducer';

export const proAnalysisActions = new CrudActionsFactory<ProAnalysis>(proFeatureKey, proAnalysisFeature)
