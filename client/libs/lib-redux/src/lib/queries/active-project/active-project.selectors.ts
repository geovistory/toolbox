import { createSelector } from '@ngrx/store';
import { values } from 'ramda';
import { getNamespaceByFkProjectState } from '../../redux-store/data/dat/namespace/dat-namespace.selectors';
import { getLanguageByPkEntityState } from '../../redux-store/data/inf/language/inf-language.selectors';
import { getProjectByPkEntityState } from '../../redux-store/data/pro/project/pro-project.selectors';
import { getActiveProjectId } from '../../redux-store/ui/active-project/active-project.selectors';



export const getActiveProject = createSelector(getActiveProjectId, getProjectByPkEntityState, (id, projects) => projects?.[id])
export const getActiveProjectLanguage = createSelector(getActiveProject, getLanguageByPkEntityState, (project, language) => language?.[project?.fk_language])
export const getActiveProjectNamespaces = createSelector(getActiveProjectId, getNamespaceByFkProjectState, (id, namespaces) => values(namespaces?.[id]))
