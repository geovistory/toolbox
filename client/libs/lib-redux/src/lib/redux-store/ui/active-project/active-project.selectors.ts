import { createSelector } from '@ngrx/store';
import { getUiState } from '../ui.selectors';


export const getActiveProjectState = createSelector(getUiState, s => s.activeProject)

export const getActiveProjectId = createSelector(getActiveProjectState, s => s.pk_project);
export const getFocusedPanel = createSelector(getActiveProjectState, s => s.focusedPanel);
export const getPanels = createSelector(getActiveProjectState, s => s.panels);
export const getListType = createSelector(getActiveProjectState, s => s.list);

export const getRefiningChunk = createSelector(getActiveProjectState, s => s.refiningChunk);
export const getCreatingMentioning = createSelector(getActiveProjectState, s => s.creatingMentioning);
export const getMentioningsFocusedInText = createSelector(getActiveProjectState, s => s.mentioningsFocusedInText);
export const getMentioningsFocusedInTable = createSelector(getActiveProjectState, s => s.mentioningsFocusedInTable);
export const getChangingClassProjRelState = createSelector(getActiveProjectState, s => s?.changingClassProjRel)

const getTabLayouts = createSelector(getActiveProjectState, s => s?.tabLayouts)


export const getPanel = (panelIndex: number) => createSelector(getPanels, s => s?.[panelIndex]);
export const getTab = (panelIndex: number, tabIndex: number) =>
  createSelector(getPanel(panelIndex), s => s.tabs?.[tabIndex]);
export const isActiveTab = (panelIndex: number, tabIndex: number) =>
  createSelector(getTab(panelIndex, tabIndex), s => s?.active);

export const getTabLayout = (id: string) => createSelector(getTabLayouts, s => s?.[id])
export const getTabLayoutTitle = (id: string) => createSelector(getTabLayout(id), s => s?.tabTitle)
export const getTabLayoutLoading = (id: string) => createSelector(getTabLayout(id), s => s?.loading)
export const getTabLayoutMode = (id: string) => createSelector(getTabLayout(id), s => s?.layoutMode)
export const getTabLayoutTooltip = (id: string) => createSelector(getTabLayout(id), s => s?.tabTooltip)

export const getChangingClassProjRel = (classId: number) => createSelector(getChangingClassProjRelState, s => s?.[classId])
