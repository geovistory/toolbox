import { createSelector } from '@ngrx/store';
import { getLanguageByPkEntityState } from './data/inf/language/inf-language.selectors';
import { getProjectByPkEntityState } from './data/pro/project/pro-project.selectors';
import { getActiveProjectId } from './ui/active-project/active-project.selectors';


export const getActiveProject = createSelector(getActiveProjectId, getProjectByPkEntityState, (id, projects) => projects?.[id])
export const getActiveProjectLanguage = createSelector(getActiveProject, getLanguageByPkEntityState, (project, language) => language?.[project?.fk_language])


