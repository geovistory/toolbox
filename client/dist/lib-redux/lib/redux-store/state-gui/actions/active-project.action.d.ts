import { DatChunk, InfPersistentItem, InfTemporalEntity, ProDfhClassProjRel, ProInfoProjRel } from '@kleiolab/lib-sdk-lb3';
import { FluxStandardAction } from 'flux-standard-action';
import { ListType, Panel, PanelTab, ProjectDetail, ProjectPreview, TypePeIt } from '../models/active-project.models';
export interface ActiveProjectMeta {
    projectPreview?: ProjectPreview;
    pk_project?: number;
    pk_entity?: number;
    pk_entities?: number[];
    pk_classes?: number[];
    pk_ui_context?: number;
    entity_version?: number;
    chunk?: DatChunk;
    teEnGraphs?: InfTemporalEntity[];
    peItGraphs?: InfPersistentItem[];
    types?: TypePeIt[];
    projRel?: ProDfhClassProjRel;
    dfh_pk_class?: number;
    infProjRel?: ProInfoProjRel;
    panels?: Panel[];
    list?: ListType;
    panelIndex?: number;
    panelSerial?: number;
    tabIndex?: number;
    uiIdSerial?: number;
    focusedPanel?: number;
    previousPanelIndex?: number;
    currentPanelIndex?: number;
    previousTabIndex?: number;
    currentTabIndex?: number;
    tab?: PanelTab<any>;
}
declare type Payload = ProjectDetail;
export declare type ActiveProjectAction = FluxStandardAction<Payload, ActiveProjectMeta>;
export declare class ActiveProjectActions {
    /************************************************************************************
     * CRM and Config (metadata, crm)
    ************************************************************************************/
    static LOAD_PROJECT_BASICS: string;
    static LOAD_PROJECT_BASICS_FAILED: string;
    static LOAD_PROJECT_BASICS_SUCCEEDED: string;
    static LOAD_PROJECT_CONFIG: string;
    static LOAD_PROJECT_CONFIG_SUCCEEDED: string;
    loadProjectBasics(pk_project: number): ActiveProjectAction;
    loadProjectBasiscsSucceded(projectPreview: ProjectPreview): ActiveProjectAction;
    loadProjectConfig(pk_project: number): ActiveProjectAction;
    loadProjectConfigSucceeded(): ActiveProjectAction;
    /************************************************************************************
     * Layout -- Tabs
    ************************************************************************************/
    static SET_LIST_TYPE: string;
    setListType(list: ListType): ActiveProjectAction;
    static SET_PANELS: string;
    setPanels(panels: Panel[], uiIdSerial: number, panelSerial: number, focusedPanel: number): ActiveProjectAction;
    static ACTIVATE_TAB: string;
    activateTab(panelIndex: number, tabIndex: number): ActiveProjectAction;
    static MOVE_TAB: string;
    moveTab(previousPanelIndex: number, currentPanelIndex: number, previousTabIndex: number, currentTabIndex: number): ActiveProjectAction;
    static CLOSE_TAB: string;
    closeTab(panelIndex: number, tabIndex: number): ActiveProjectAction;
    static ADD_TAB: string;
    addTab<TabData>(tab: PanelTab<TabData>): ActiveProjectAction;
    static SPLIT_PANEL: string;
    splitPanel(previousPanelIndex: number, tabIndex: number, currentPanelIndex: number): ActiveProjectAction;
    static CLOSE_PANEL: string;
    closePanel(panelIndex: number): ActiveProjectAction;
    static FOCUS_PANEL: string;
    focusPanel(panelIndex: number): ActiveProjectAction;
    /************************************************************************************
    * Information cache
    ************************************************************************************/
    /************************************************************************************
     *  Things for Mentionings / Annotations
    ************************************************************************************/
    static UPDATE_SELECTED_CHUNK: string;
    static SET_REFINING_CHUNK: string;
    static SET_CREATING_MENTIONING: string;
    setRefiningChunk(refiningChunk: boolean): ActiveProjectAction;
    setCreatingMentioning(creatingMentioning: boolean): ActiveProjectAction;
    /************************************************************************************
    * Highlighting of mentionings in the gui
    ************************************************************************************/
    static SET_MENTIONINGS_FOCUSED_IN_TEXT: string;
    static SET_MENTIONINGS_FOCUSED_IN_TABLE: string;
    setMentioningsFocusedInText(mentioningsFocusedInText: number[]): ActiveProjectAction;
    setMentioningsFocusedInTable(mentioningsFocusedInTable: number[]): ActiveProjectAction;
    /************************************************************************************
     * Destroy the active project state (on closing a project)
    ************************************************************************************/
    static DESTROY: string;
    destroy(): ActiveProjectAction;
}
export {};
