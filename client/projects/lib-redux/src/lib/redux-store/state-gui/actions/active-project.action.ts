import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ListType, Panel, PanelTab, ProjectDetail } from '../models/active-project.models';

export interface ActiveProjectMeta {


  pk_project?: number;
  pk_entity?: number;
  pk_entities?: number[];
  pk_classes?: number[]
  // pk_ui_context?: number;
  entity_version?: number;

  // layout
  panels?: Panel[];
  list?: ListType;
  panelIndex?: number;
  panelSerial?: number;
  tabIndex?: number;
  uiIdSerial?: number;
  focusedPanel?: number;
  previousPanelIndex?: number
  currentPanelIndex?: number
  previousTabIndex?: number
  currentTabIndex?: number
  tab?: PanelTab<any>;

  // Layout Modals
  // createOrAddEntity?: CreateOrAddEntity; // Check if this really belongt in state
};
type Payload = ProjectDetail;
export type ActiveProjectAction = FluxStandardAction<Payload, ActiveProjectMeta>;


@Injectable({
  providedIn: 'root'
})
export class ActiveProjectActions {

  /* tslint:disable:member-ordering */

  /************************************************************************************
   * CRM and Config (metadata, crm)
  ************************************************************************************/
  static LOAD_PROJECT_BASICS_SUCCEEDED = 'ActiveProject::LOAD_PROJECT_BASICS_SUCCEEDED';

  loadProjectBasiscsSucceded(pk_project: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED,
      payload: null,
      meta: { pk_project },
    }
  }

  /************************************************************************************
   * Layout -- Tabs
  ************************************************************************************/
  static SET_LIST_TYPE = 'ActiveProject::SET_LIST_TYPE';

  setListType(list: ListType): ActiveProjectAction {
    return {
      type: ActiveProjectActions.SET_LIST_TYPE,
      payload: null,
      meta: {
        list
      }
    }
  }

  static SET_PANELS = 'ActiveProject::SET_PANELS';

  setPanels(panels: Panel[], uiIdSerial: number, panelSerial: number, focusedPanel: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.SET_PANELS,
      payload: null,
      meta: { panels, uiIdSerial, panelSerial, focusedPanel }
    }
  }

  static ACTIVATE_TAB = 'ActiveProject::ACTIVATE_TAB';

  activateTab(panelIndex: number, tabIndex: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.ACTIVATE_TAB,
      payload: null,
      meta: {
        panelIndex, tabIndex
      }
    }
  }
  static MOVE_TAB = 'ActiveProject::MOVE_TAB';
  moveTab(previousPanelIndex: number, currentPanelIndex: number, previousTabIndex: number, currentTabIndex: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.MOVE_TAB,
      payload: null,
      meta: {
        previousPanelIndex, currentPanelIndex, previousTabIndex, currentTabIndex
      }
    }
  }

  static CLOSE_TAB = 'ActiveProject::CLOSE_TAB';
  closeTab(panelIndex: number, tabIndex: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.CLOSE_TAB,
      payload: null,
      meta: {
        panelIndex, tabIndex
      }
    }
  }

  static ADD_TAB = 'ActiveProject::ADD_TAB';
  addTab<TabData>(tab: PanelTab<TabData>): ActiveProjectAction {
    return {
      type: ActiveProjectActions.ADD_TAB,
      payload: null,
      meta: { tab }
    }
  }

  static SPLIT_PANEL = 'ActiveProject::SPLIT_PANEL';
  splitPanel(previousPanelIndex: number, tabIndex: number, currentPanelIndex: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.SPLIT_PANEL,
      payload: null,
      meta: { previousPanelIndex, tabIndex, currentPanelIndex }
    }
  }

  static CLOSE_PANEL = 'ActiveProject::CLOSE_PANEL';
  closePanel(panelIndex: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.CLOSE_PANEL,
      payload: null,
      meta: { panelIndex }
    }
  }


  static FOCUS_PANEL = 'ActiveProject::FOCUS_PANEL';
  focusPanel(panelIndex: number): ActiveProjectAction {
    return {
      type: ActiveProjectActions.FOCUS_PANEL,
      payload: null,
      meta: { panelIndex }
    }
  }


  /************************************************************************************
   *  Things for Mentionings / Annotations
  ************************************************************************************/
  static UPDATE_SELECTED_CHUNK = 'ActiveProject::UPDATE_SELECTED_CHUNK';
  static SET_REFINING_CHUNK = 'ActiveProject::SET_REFINING_CHUNK';
  static SET_CREATING_MENTIONING = 'ActiveProject::SET_CREATING_MENTIONING';


  setRefiningChunk(refiningChunk: boolean): ActiveProjectAction {
    return {
      type: ActiveProjectActions.SET_REFINING_CHUNK,
      payload: { refiningChunk },
      meta: null
    }
  }

  setCreatingMentioning(creatingMentioning: boolean): ActiveProjectAction {
    return {
      type: ActiveProjectActions.SET_CREATING_MENTIONING,
      payload: { creatingMentioning },
      meta: null
    }
  }

  /************************************************************************************
  * Highlighting of mentionings in the gui
  ************************************************************************************/
  static SET_MENTIONINGS_FOCUSED_IN_TEXT = 'ActiveProject::SET_MENTIONINGS_FOCUSED_IN_TEXT';
  static SET_MENTIONINGS_FOCUSED_IN_TABLE = 'ActiveProject::SET_MENTIONINGS_FOCUSED_IN_TABLE';

  setMentioningsFocusedInText(mentioningsFocusedInText: number[]): ActiveProjectAction {
    return {
      type: ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT,
      payload: { mentioningsFocusedInText },
      meta: null
    }
  }

  setMentioningsFocusedInTable(mentioningsFocusedInTable: number[]): ActiveProjectAction {
    return {
      type: ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE,
      payload: { mentioningsFocusedInTable },
      meta: null
    }
  }


  /************************************************************************************
   * Destroy the active project state (on closing a project)
  ************************************************************************************/
  static DESTROY = 'ActiveProject::DESTROY';
  destroy(): ActiveProjectAction {
    return {
      type: ActiveProjectActions.DESTROY,
      payload: null,
      meta: null,
    }
  }
}
