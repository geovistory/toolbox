import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { omit } from 'ramda';
import { ActiveProjectActions, ActiveProjectAction } from '../../state-gui/actions/active-project.action';
import { ProjectDetail } from '../models/active-project.models';


const INITIAL_STATE: ProjectDetail = {
  label: '',
  list: '',
  uiIdSerial: 0,
  panelSerial: 0,
  focusedPanel: 0,
  panels: []
};
export const activeProjectReducer = (state: ProjectDetail = INITIAL_STATE, action: ActiveProjectAction): ProjectDetail => {
  let pi, ti, ppi, cpi, pti, cti;
  switch (action.type) {
    /************************************************************************************
     * Load project data (metadata, crm)
    ************************************************************************************/
    case ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED:
      state = {
        ...state,
        ...action.meta.projectPreview
      };
      break;
    case ActiveProjectActions.LOAD_PROJECT_CONFIG:
      state = {
        ...state,
        loadingConfigData: true
      }
      break;
    case ActiveProjectActions.LOAD_PROJECT_CONFIG_SUCCEEDED:
      state = {
        ...state,
        // crm: action.payload.crm,
        configDataInitialized: true,
        loadingConfigData: false
      }
      break;

    /************************************************************************************
     * Layout -- Tabs
    ************************************************************************************/
    case ActiveProjectActions.SET_PANELS:
      state = {
        ...state,
        panels: action.meta.panels,
        uiIdSerial: action.meta.uiIdSerial,
        panelSerial: action.meta.panelSerial,
        focusedPanel: action.meta.focusedPanel
      }
      break;
    case ActiveProjectActions.SET_LIST_TYPE:
      state = {
        ...state,
        list: action.meta.list
      }
      break;
    case ActiveProjectActions.ACTIVATE_TAB:
      pi = action.meta.panelIndex;
      ti = action.meta.tabIndex;
      state = {
        ...state,
        panels: Object.assign([...state.panels], {
          [pi]: {
            ...state.panels[pi],
            tabs: [...state.panels[pi].tabs].map((tab, index) => {
              tab.active = (index === ti);
              return tab;
            })
          }
        })
      }
      break;
    case ActiveProjectActions.MOVE_TAB:
      ppi = action.meta.previousPanelIndex;
      cpi = action.meta.currentPanelIndex;
      pti = action.meta.previousTabIndex;
      cti = action.meta.currentTabIndex;

      if (ppi === cpi) {
        const tabs = [...state.panels[cpi].tabs];
        moveItemInArray(tabs, pti, cti);
        state = {
          ...state,
          panels: Object.assign([...state.panels], {
            [cpi]: {
              ...state.panels[cpi],
              tabs
            }
          })
        }
      } else {
        const pTabs = [...state.panels[ppi].tabs];
        const cTabs = [...state.panels[cpi].tabs];
        transferArrayItem(pTabs, cTabs, pti, cti);
        state = {
          ...state,
          panels: Object.assign([...state.panels], {
            [ppi]: {
              ...state.panels[ppi],
              tabs: pTabs.map((tab, index) => {
                tab.active = (index === (pti < pTabs.length ? pti : (pti - 1)));
                return tab;
              })
            },
            [cpi]: {
              ...state.panels[cpi],
              tabs: cTabs.map((tab, index) => {
                tab.active = (index === cti);
                return tab;
              })
            }
          })
        }
      }

      break;
    case ActiveProjectActions.ADD_TAB:
      if (state.panels.length === 0) {
        state = {
          ...state,
          panels: [
            {
              id: state.panelSerial,
              tabs: []
            }
          ],
          focusedPanel: 0,
          panelSerial: state.panelSerial + 1
        }
      }
      pi = state.focusedPanel;
      state = {
        ...state,
        panels: Object.assign([...state.panels], {
          [pi]: {
            ...state.panels[pi],
            tabs: [
              ...state.panels[pi].tabs.map(t => {
                t.active = false;
                return t;
              }),
              {
                ...omit(['pathSegment'], action.meta.tab),
                // panelIndex: pi,
                path: ['activeProject', action.meta.tab.pathSegment, state.uiIdSerial.toString()]
              }
            ]
          }
        }),
        uiIdSerial: (state.uiIdSerial + 1)
      }
      break;
    case ActiveProjectActions.CLOSE_TAB:
      pi = action.meta.panelIndex;
      ti = action.meta.tabIndex;
      // remove the closing tab
      state = {
        ...state,
        panels: Object.assign([...state.panels], {
          [pi]: {
            ...state.panels[pi],
            tabs: [...state.panels[pi].tabs]
              .filter((tab, index) => index !== ti)

          }
        })
      }
      // activate a sibling tab, if needed and possible
      if (!state.panels[pi].tabs.find(t => t.active)) {
        state = {
          ...state,
          panels: Object.assign([...state.panels], {
            [pi]: {
              ...state.panels[pi],
              tabs: [...state.panels[pi].tabs]
                .map((tab, index) => {
                  tab.active = (index === (ti < state.panels[pi].tabs.length ? ti : (ti - 1)));
                  return tab;
                })
            }
          })

        }
      }
      break;
    case ActiveProjectActions.CLOSE_PANEL:
      pi = action.meta.panelIndex;
      const panels = [...state.panels];
      panels.splice(pi, 1);
      state = {
        ...state,
        panels
      }
      break;

    case ActiveProjectActions.FOCUS_PANEL:
      state = {
        ...state,
        focusedPanel: action.meta.panelIndex
      }
      break;
    case ActiveProjectActions.SPLIT_PANEL:
      ppi = action.meta.previousPanelIndex;
      ti = action.meta.tabIndex;
      cpi = action.meta.currentPanelIndex;
      const moveTab = state.panels[ppi].tabs[ti];
      // removes tab from old panel
      state = {
        ...state,
        panels: Object.assign([...state.panels], {
          [ppi]: {
            ...state.panels[ppi],
            tabs: [...state.panels[ppi].tabs]
              .filter((tab, index) => index !== ti)
              .map((tab, index) => {
                if (index === 0) tab.active = true;
                return tab;
              })
          }
        })
      }
      // insert a new panel at position of cpi
      const newPanels = [...state.panels];
      newPanels.splice(cpi, 0, {
        id: state.panelSerial,
        tabs: [moveTab]
      })
      state = {
        ...state,
        panels: newPanels,
        // increase panel id sequence
        panelSerial: state.panelSerial + 1
      }

      break;


    case ActiveProjectActions.SET_REFINING_CHUNK:
      state = {
        ...state,
        refiningChunk: action.payload.refiningChunk
      };
      break;
    case ActiveProjectActions.SET_CREATING_MENTIONING:
      state = {
        ...state,
        creatingMentioning: action.payload.creatingMentioning
      };
      break;

    /************************************************************************************
    * Highlighting of mentionings in the gui
    ************************************************************************************/
    case ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TEXT:
      state = {
        ...state,
        mentioningsFocusedInText: action.payload.mentioningsFocusedInText
      };
      break;

    case ActiveProjectActions.SET_MENTIONINGS_FOCUSED_IN_TABLE:
      state = {
        ...state,
        mentioningsFocusedInTable: action.payload.mentioningsFocusedInTable
      };
      break;


    /************************************************************************************
     * Destroy the active project state (on closing a project)
    ************************************************************************************/
    case ActiveProjectActions.DESTROY:
      state = INITIAL_STATE;
      break;
  }

  return state;
}
