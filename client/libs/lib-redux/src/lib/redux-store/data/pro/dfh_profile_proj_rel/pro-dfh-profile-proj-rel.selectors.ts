import { createSelector } from '@ngrx/store';
import { getProState } from '../pro.selectors';

const featureState = createSelector(getProState, s => s?.dfh_profile_proj_rel);

export const byFkProjectFkClassState = createSelector(featureState, state =>
  state?.by_fk_project__fk_profile);

const byFkProjectState = createSelector(featureState, state =>
  state?.by_fk_project);

const byFkProjectEnabledInEntitiesState = createSelector(featureState, state =>
  state?.by_fk_project__enabled);


const byFkProjectFkClass = (fkProject: number, fkClass: number) =>
  createSelector(byFkProjectFkClassState, (state) => state?.[fkProject + '_' + fkClass]);

const byFkProject = (fkProject: number) =>
  createSelector(byFkProjectState, (state) => state?.[fkProject]);

const byFkProjectEnabled = (fkProject: number, enabled: boolean) =>
  createSelector(byFkProjectEnabledInEntitiesState, (state) => state?.[fkProject + '_' + enabled]);


export const getDfhProfileProjRel = {
  byFkProjectFkClass,
  byFkProject,
  byFkProjectEnabled
}
