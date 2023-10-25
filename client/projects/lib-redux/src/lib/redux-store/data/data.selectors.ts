import { createSelector } from '@ngrx/store';
import { getLanguageByPkEntityState } from './inf/language/inf-language.selectors';
import { getProjectByPkEntity } from './pro/project/pro-project.selectors';

export const getProjectLangugage = (projectId: number) =>
  createSelector(getProjectByPkEntity(projectId), getLanguageByPkEntityState, (project, langguages) => langguages?.[project.fk_language])


export const getProjectLangugageLabel = (projectId: number) =>
  createSelector(getProjectByPkEntity(projectId), getLanguageByPkEntityState, (project, langguages) => langguages?.[project.fk_language]?.notes)

