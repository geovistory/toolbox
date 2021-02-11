import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { omit } from 'ramda';
import { ActiveProjectAction, ActiveProjectActions } from './active-project.action';
import { ProjectDetail } from './active-project.models';

const INITIAL_STATE: ProjectDetail = {
  label: '',
  list: '',
  uiIdSerial: 0,
  panelSerial: 0,
  focusedPanel: 0,
  panels: []
};
const activeProjectReducer = (state: ProjectDetail = INITIAL_STATE, action: ActiveProjectAction): ProjectDetail => {
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

    // /*****************************************************
    // * Layout -- Modals
    // *****************************************************/
    // case ActiveProjectActions.OPEN_ADD_FORM:
    //   state = {
    //     ...state,
    //     addModal: action.meta.createOrAddEntity
    //   };
    //   break;

    // case ActiveProjectActions.CLOSE_ADD_FORM:
    //   state = {
    //     ...state,
    //     addModal: undefined
    //   };
    //   break;

    /************************************************************************************
    * Data cache
    ************************************************************************************/
    /***************************************************
    * Reducers to load EntityPreview
    ****************************************************/
    // case ActiveProjectActions.LOAD_ENTITY_PREVIEW:
    //   state = {
    //     ...state,
    //     entityPreviews: {
    //       ...(state || {}).entityPreviews,
    //       [action.meta.pk_entity]: { loading: true } as EntityPreview
    //     }
    //   };
    //   break;

    // case ActiveProjectActions.LOAD_ENTITY_PREVIEW_SUCCEEDED:
    //   if (action.meta.entityPreview && action.meta.entityPreview.pk_entity) {
    //     state = {
    //       ...state,
    //       entityPreviews: {
    //         ...state.entityPreviews,
    //         [action.meta.entityPreview.pk_entity]: action.meta.entityPreview
    //       }
    //     };
    //   }
    //   break;

    // case ActiveProjectActions.LOAD_ENTITY_PREVIEW_FAILED:
    //   state = {
    //     ...state,
    //   };
    //   break;

    /***************************************************
    * Reducers to load Types
    ****************************************************/
    // case ActiveProjectActions.LOAD_TYPES_SUCCEEDED:
    //   state = {
    //     ...state,
    //     typesByPk: {
    //       ...state.typesByPk,
    //       ...indexBy<TypePeIt>((type) => (type.pk_entity.toString()), action.meta.types)
    //     },
    //     typesByClass: {
    //       ...zipObj(action.meta.pk_classes.map(pk => pk.toString()), action.meta.pk_classes.map(x => [])),
    //       ...state.typesByClass,
    //       ...groupBy<TypePeIt>((type) => (type.fk_typed_class.toString()), action.meta.types)
    //     }
    //   };
    //   break;

    /*****************************************************
    * Load a Entity Details for display in Modals
    *****************************************************/

    // // case ActiveProjectActions.LOAD_ENTITY_DETAIL_FOR_MODAL:
    // //   state = {
    // //     ...state,
    // //     peItModals: {
    // //       ...state.peItModals,
    // //       [action.meta.pk_entity]: {
    // //         loading: true
    // //       }
    // //     }
    // //   };
    // //   break;

    // case ActiveProjectActions.LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED:
    //   state = {
    //     ...state,
    //     peItModals: {
    //       ...state.peItModals,
    //       [action.meta.peItDetail.pkEntity]: action.meta.peItDetail
    //     }
    //   };
    //   break;

    // // TODO: add reducer for LOAD_TE_EN_DETAIL_FOR_MODAL_SUCCEEDED

    // /***************************************************
    // * Reducers to load chunk
    // ****************************************************/

    // case ActiveProjectActions.LOAD_CHUNK_SUCCEEDED:
    //   state = {
    //     ...state,
    //     chunks: {
    //       ...state.chunks,
    //       [action.meta.chunk.pk_entity]: action.meta.chunk
    //     }
    //   };
    //   break;

    // case ActiveProjectActions.LOAD_CHUNK_FAILED:
    //   state = {
    //     ...state,
    //   };
    //   break;

    // /***************************************************
    // * Reducers to load peIt-Graphs
    // ****************************************************/

    // case ActiveProjectActions.LOAD_PEIT_GRAPHS_SUCCEEDED:
    //   state = {
    //     ...state,
    //     peItGraphs: {
    //       ...state.peItGraphs,
    //       ...indexBy(((peIt: InfPersistentItem) => peIt.pk_entity.toString()), action.meta.peItGraphs)
    //     }
    //   };
    //   break;

    // case ActiveProjectActions.LOAD_PEIT_GRAPHS_FAILED:
    //   state = {
    //     ...state,
    //   };
    //   break;


    // /***************************************************
    // * Reducers to load teEn-Graphs
    // ****************************************************/

    // case ActiveProjectActions.LOAD_TEEN_GRAPHS_SUCCEEDED:
    //   state = {
    //     ...state,
    //     teEnGraphs: {
    //       ...state.teEnGraphs,
    //       ...indexBy(((teEn: InfTemporalEntity) => teEn.pk_entity.toString()), action.meta.teEnGraphs)
    //     }
    //   };
    //   break;

    // case ActiveProjectActions.LOAD_TEEN_GRAPHS_FAILED:
    //   state = {
    //     ...state,
    //   };
    //   break;



    // /***************************************************
    // * Reducers to load ComQuery List
    // ****************************************************/
    // case ActiveProjectActions.LOAD_QUERIES:
    //   state = {
    //     ...state,
    //     comQueryLoading: true
    //   };
    //   break;
    // case ActiveProjectActions.LOAD_QUERIES_SUCCEEDED:
    //   state = {
    //     ...state,
    //     comQueryVersionsByPk: {
    //       ...indexBy(
    //         ((comQuery: VersionEntity<ProQuery>) => comQuery[comQuery._latestVersion].pk_entity.toString()),
    //         action.meta.comQueryArray.map(comQ => ({
    //           _latestVersion: comQ.entity_version,
    //           ...indexBy((n) => n.toString(), (comQ.versions || [])),
    //           [comQ.entity_version]: comQ
    //         }))
    //       )
    //     },
    //     comQueryLoading: false
    //   };
    //   break;

    // case ActiveProjectActions.LOAD_QUERIES_FAILED:
    //   state = {
    //     ...state,
    //     comQueryLoading: false
    //   };
    //   break;


    // /***************************************************
    //  * Reducers to load one ComQuery Version
    //  ****************************************************/
    // case ActiveProjectActions.LOAD_QUERY_VERSION:
    //   state = {
    //     ...state,
    //     comQueryVersionLoading: {
    //       ...state.comQueryVersionLoading,
    //       [action.meta.pk_entity + '_' + action.meta.entity_version]: true
    //     }
    //   };
    //   break;
    // case ActiveProjectActions.LOAD_QUERY_VERSION_SUCCEEDED:
    //   state = {
    //     ...state,
    //     comQueryVersionsByPk: {
    //       ...state.comQueryVersionsByPk,
    //       [action.meta.comQuery.pk_entity]: {
    //         ...(state.comQueryVersionsByPk || {})[action.meta.comQuery.pk_entity],
    //         [action.meta.comQuery.entity_version]: action.meta.comQuery
    //       }
    //     },
    //     comQueryVersionLoading: omit([action.meta.comQuery.pk_entity + '_' + action.meta.comQuery.entity_version], state.comQueryVersionLoading)
    //   };
    //   break;

    // case ActiveProjectActions.LOAD_QUERY_VERSION_FAILED:
    //   state = {
    //     ...state,
    //     comQueryVersionLoading: {}
    //   };
    //   break;


    // /***************************************************
    //  * Reducers to load ComVisual List
    //  ****************************************************/
    // case ActiveProjectActions.LOAD_VISUALS:
    //   state = {
    //     ...state,
    //     comVisualLoading: true
    //   };
    //   break;
    // case ActiveProjectActions.LOAD_VISUALS_SUCCEEDED:
    //   state = {
    //     ...state,
    //     comVisualVersionsByPk: {
    //       ...indexBy(
    //         ((comVisual: VersionEntity<ProVisual>) => comVisual[comVisual._latestVersion].pk_entity.toString()),
    //         action.meta.comVisualArray.map(comQ => ({
    //           _latestVersion: comQ.versions[0],
    //           ...indexBy((n) => n.toString(), (comQ.versions || [])),
    //           [comQ.entity_version]: comQ
    //         }))
    //       )
    //     },
    //     comVisualLoading: false
    //   };
    //   break;

    // case ActiveProjectActions.LOAD_VISUALS_FAILED:
    //   state = {
    //     ...state,
    //     comVisualLoading: false
    //   };
    //   break;



    // /***************************************************
    //  * Reducers to load ComVisual List
    //  ****************************************************/
    // case ActiveProjectActions.LOAD_VISUAL_VERSION:
    //   state = {
    //     ...state,
    //     comVisualLoading: true
    //   };
    //   break;
    // case ActiveProjectActions.LOAD_VISUAL_VERSION_SUCCEEDED:
    //   state = {
    //     ...state,
    //     comVisualVersionsByPk: {
    //       ...state.comVisualVersionsByPk,
    //       ...indexBy(
    //         ((comVisual: VersionEntity<ProVisual>) => comVisual[comVisual._latestVersion].pk_entity.toString()),
    //         action.meta.comVisualArray.map(comV => ({
    //           _latestVersion: comV.versions[0],
    //           ...indexBy((n) => n.toString(), (comV.versions || [])),
    //           ...(state.comVisualVersionsByPk || {})[comV.pk_entity],
    //           [comV.entity_version]: comV
    //         }))
    //       )
    //     },
    //     comVisualLoading: false
    //   };
    //   break;

    // case ActiveProjectActions.LOAD_VISUAL_VERSION_FAILED:
    //   state = {
    //     ...state,
    //     comVisualLoading: false
    //   };
    //   break;


    /********************************************
      * Reducers to handle disabling and enabling a class
      *****************************************************/
    // case ActiveProjectActions.UPSERT_CLASS_PROJ_REL:
    //   return {
    //     ...state,
    //     crm: {
    //       ...state.crm,
    //       classes: {
    //         ...state.crm.classes,
    //         [action.meta.dfh_pk_class]: {
    //           ...state.crm.classes[action.meta.dfh_pk_class],
    //           changingProjRel: true
    //         }
    //       }
    //     }
    //   };
    // case ActiveProjectActions.UPSERT_CLASS_PROJ_REL_SUCCEEDED:
    //   return {
    //     ...state,
    //     crm: {
    //       ...state.crm,
    //       classes: {
    //         ...state.crm.classes,
    //         [action.meta.dfh_pk_class]: {
    //           ...state.crm.classes[action.meta.dfh_pk_class],
    //           projRel: action.meta.projRel,
    //           isInProject: action.meta.projRel.enabled_in_entities,
    //           changingProjRel: false
    //         }
    //       }
    //     }
    //   };
    // case ActiveProjectActions.UPSERT_CLASS_PROJ_REL_FAILED:
    //   return {
    //     ...state,
    //     crm: {
    //       ...state.crm,
    //       classes: {
    //         ...state.crm.classes,
    //         [action.meta.dfh_pk_class]: {
    //           ...state.crm.classes[action.meta.dfh_pk_class],
    //           changingProjRel: false
    //         }
    //       }
    //     }
    //   };


    /************************************************************************************
    *  Things for Mentionings / Annotations
    ************************************************************************************/

    // case ActiveProjectActions.UPDATE_SELECTED_CHUNK:
    //   state = {
    //     ...state,
    //     selectedChunk: action.payload.selectedChunk
    //   };
    //   break;

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

export const createActiveProjectReducer = () => {
  return activeProjectReducer;
}
