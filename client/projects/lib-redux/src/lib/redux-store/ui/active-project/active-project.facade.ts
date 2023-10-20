import { Injectable } from '@angular/core'
import { TabData } from '@kleiolab/lib-redux/lib/redux-store/ui/models/active-project.models'
import { Store } from '@ngrx/store'
import { ActiveProjectActions } from './active-project.action'
import { ListType, Panel, PanelTab } from './active-project.models'
import { getActiveProjectId, getCreatingMentioning, getFocusedPanel, getListType, getMentioningsFocusedInTable, getMentioningsFocusedInText, getPanels, getRefiningChunk, getTab, isActiveTab } from './active-project.selectors'

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
  addTab = (tab: PanelTab<TabData>) =>
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
  destroy = () => this.store.dispatch(ActiveProjectActions.destroy())


  getTab$ = (panelIndex: number, tabIndex: number) => this.store.select(getTab(panelIndex, tabIndex))
  getIsActiveTab$ = (panelIndex: number, tabIndex: number) => this.store.select(isActiveTab(panelIndex, tabIndex))
}
