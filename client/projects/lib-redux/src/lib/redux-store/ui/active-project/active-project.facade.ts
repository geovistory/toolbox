import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { ActiveProjectActions, classSettings, tabLayoutActions } from './active-project.action'
import { ListType, Panel, PanelTab } from './active-project.models'
import { getActiveProjectId, getChangingClassProjRel, getCreatingMentioning, getFocusedPanel, getListType, getMentioningsFocusedInTable, getMentioningsFocusedInText, getPanels, getRefiningChunk, getTab, getTabLayoutLoading, getTabLayoutMode, getTabLayoutTitle, getTabLayoutTooltip, isActiveTab } from './active-project.selectors'
import { TabLayoutMode } from './active-project/tab-layout.models'

@Injectable({
  providedIn: 'root'
})
export class ActiveProjectFacade {

  projectId$ = this.store.select(getActiveProjectId)
  focusedPanel$ = this.store.select(getFocusedPanel)
  panels$ = this.store.select(getPanels)
  listType$ = this.store.select(getListType)
  refiningChunk$ = this.store.select(getRefiningChunk)
  createMentioning$ = this.store.select(getCreatingMentioning)
  mentioningsFocusedInText$ = this.store.select(getMentioningsFocusedInText)
  mentioningsFocusedInTable$ = this.store.select(getMentioningsFocusedInTable)

  constructor(private store: Store) { }

  loadProjectBasiscsSucceded = (projectId: number) => this.store.dispatch(ActiveProjectActions.loadProjectBasiscsSucceded(projectId))
  setPanels = (panels: Panel[], uiIdSerial: number, panelSerial: number, focusedPanel: number) =>
    this.store.dispatch(ActiveProjectActions.setPanels(panels, uiIdSerial, panelSerial, focusedPanel))
  setListType = (listType: ListType) => this.store.dispatch(ActiveProjectActions.setListType(listType))
  setActiveTab = (panelIndex: number, tabIndex: number) => this.store.dispatch(ActiveProjectActions.activateTab(panelIndex, tabIndex))
  moveTab = (previousPanelIndex: number, currentPanelIndex: number, previousTabIndex: number, currentTabIndex: number) =>
    this.store.dispatch(ActiveProjectActions.moveTab(previousPanelIndex, currentPanelIndex, previousTabIndex, currentTabIndex))
  addTab = <TabData>(tab: PanelTab<TabData>) =>
    this.store.dispatch(ActiveProjectActions.addTab(tab))
  closeTab = (panelIndex: number, tabIndex: number) =>
    this.store.dispatch(ActiveProjectActions.closeTab(panelIndex, tabIndex))
  closePanel = (panelIndex: number) =>
    this.store.dispatch(ActiveProjectActions.closePanel(panelIndex))
  focusPanel = (panelIndex: number) =>
    this.store.dispatch(ActiveProjectActions.focusPanel(panelIndex))
  splitPanel = (previousPanelIndex: number, tabIndex: number, currentPanelIndex: number) =>
    this.store.dispatch(ActiveProjectActions.splitPanel(previousPanelIndex, tabIndex, currentPanelIndex))
  setRefiningChunk = (refiningChunk: boolean) =>
    this.store.dispatch(ActiveProjectActions.setRefiningChunk(refiningChunk))
  setCreatingMentioning = (createMentioning: boolean) =>
    this.store.dispatch(ActiveProjectActions.setCreatingMentioning(createMentioning))
  setMentioningsFocusedInText = (mentioningsFocusedInText: number[]) =>
    this.store.dispatch(ActiveProjectActions.setMentioningsFocusedInText(mentioningsFocusedInText))
  setMentioningsFocusedInTable = (mentioningsFocusedInTable: number[]) =>
    this.store.dispatch(ActiveProjectActions.setMentioningsFocusedInTable(mentioningsFocusedInTable))
  // Tab data selections
  setTabTitle(tabId: string, title: string) {
    return this.store.dispatch(tabLayoutActions.setTabTitle({ tabId, title }))
  }
  setTabTooltip(tabId: string, tooltip: string) {
    return this.store.dispatch(tabLayoutActions.setTabTooltip({ tabId, tooltip }))
  }
  setTabLoading(tabId: string, loading: boolean) {
    return this.store.dispatch(tabLayoutActions.setTabLoading({ tabId, loading }))
  }
  setTabLayoutMode(tabId: string, mode: TabLayoutMode) {
    return this.store.dispatch(tabLayoutActions.setLayoutMode({ tabId, mode }))
  }
  setChangingClassProjRel(classId: number, projectRelationIsChanging: boolean) {
    return this.store.dispatch(classSettings.setChangingClassProjRel({ classId, projectRelationIsChanging }))
  }
  destroy = () => this.store.dispatch(ActiveProjectActions.destroy())

  getTab$ = (panelIndex: number, tabIndex: number) => this.store.select(getTab(panelIndex, tabIndex))
  getIsActiveTab$ = (panelIndex: number, tabIndex: number) => this.store.select(isActiveTab(panelIndex, tabIndex))

  // Tab data selections
  getTabTitle(id: string) {
    return this.store.select(getTabLayoutTitle(id))
  }
  getTabTooltip(id: string) {
    return this.store.select(getTabLayoutTooltip(id))
  }
  getTabLoading(id: string) {
    return this.store.select(getTabLayoutLoading(id))
  }
  getTabLayoutMode(id: string) {
    return this.store.select(getTabLayoutMode(id))
  }
  getChangingClassProjRel(classId: number) {
    return this.store.select(getChangingClassProjRel(classId))
  }
}
