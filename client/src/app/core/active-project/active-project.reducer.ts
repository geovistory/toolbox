import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { active } from 'd3';
import { indexBy } from 'ramda';
import { InfPersistentItem, InfTemporalEntity } from '../sdk/models';
import { EntityPreview } from '../state/models';
import { ActiveProjectAction, ActiveProjectActions } from './active-project.action';
import { ProjectDetail, Panel } from './active-project.models';

const INITIAL_STATE: ProjectDetail = {
    uiIdSerial: 0,
    panelSerial: 4,
    focusedPanel: 1,
    panels: [
        {
            id: 2,
            tabs: [
                {
                    active: true,
                    path: ['activeProject', 'entityDetails', 'a'],
                    pkEntity: 25503,
                    component: 'entity-detail',
                    icon: 'persistent-entity'
                },
            ]
        },
        {
            id: 3,
            tabs: [
                {
                    active: false,
                    path: ['activeProject', 'sourceDetails', 'x'],
                    pkEntity: 80637,
                    component: 'source-detail',
                    icon: 'source'
                }
            ]
        }
    ]
};

const activeProjectReducer = (state: ProjectDetail = INITIAL_STATE, action: ActiveProjectAction): ProjectDetail => {
    let pi, ti, ppi, cpi, pti, cti;
    switch (action.type) {
        /************************************************************************************
         * Load project data (metadata, crm)
        ************************************************************************************/
        case ActiveProjectActions.ACTIVE_PROJECT_UPDATED:
            state = {
                ...state,
                ...action.payload
            };
            break;

        case ActiveProjectActions.PROJECT_CRM_LOADED:
            state = {
                ...state,
                crm: action.payload.crm
            }
            break;

        /************************************************************************************
         * Layout
        ************************************************************************************/
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
                                active: true,
                                component: action.meta.component,
                                icon: action.meta.icon,
                                pkEntity: action.meta.pkEntity,
                                panelIndex: pi,
                                path: ['activeProject', action.meta.stateSlug, state.uiIdSerial.toString()]
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
            state = {
                ...state,
                panels: Object.assign([...state.panels], {
                    [pi]: {
                        ...state.panels[pi],
                        tabs: [...state.panels[pi].tabs].filter((tab, index) => index !== ti)
                    }
                })
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
        /************************************************************************************
        * Data cache
        ************************************************************************************/
        /***************************************************
        * Reducers to load DataUnitPreview
        ****************************************************/
        case ActiveProjectActions.LOAD_ENTITY_PREVIEW:
            state = {
                ...state,
                entityPreviews: {
                    ...(state || {}).entityPreviews,
                    [action.meta.pk_entity]: { loading: true } as EntityPreview
                }
            };
            break;

        case ActiveProjectActions.LOAD_ENTITY_PREVIEW_SUCCEEDED:
            if (action.meta.entityPreview && action.meta.entityPreview.pk_entity) {
                state = {
                    ...state,
                    entityPreviews: {
                        ...state.entityPreviews,
                        [action.meta.entityPreview.pk_entity]: action.meta.entityPreview
                    }
                };
            }
            break;

        case ActiveProjectActions.LOAD_ENTITY_PREVIEW_FAILED:
            state = {
                ...state,
            };
            break;

        /*****************************************************
        * Load a Data Unit Details for display in Modals
        *****************************************************/

        case ActiveProjectActions.LOAD_DATA_UNIT_DETAIL_FOR_MODAL:
            state = {
                ...state,
                peItModals: {
                    ...state.peItModals,
                    [action.meta.pk_entity]: {
                        loading: true
                    }
                }
            };
            break;

        case ActiveProjectActions.LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED:
            state = {
                ...state,
                peItModals: {
                    ...state.peItModals,
                    [action.meta.peItDetail.pkEntity]: action.meta.peItDetail
                }
            };
            break;

        // TODO: add reducer for LOAD_TE_EN_DETAIL_FOR_MODAL_SUCCEEDED

        /***************************************************
        * Reducers to load chunk
        ****************************************************/

        case ActiveProjectActions.LOAD_CHUNK_SUCCEEDED:
            state = {
                ...state,
                chunks: {
                    ...state.chunks,
                    [action.meta.chunk.pk_entity]: action.meta.chunk
                }
            };
            break;

        case ActiveProjectActions.LOAD_CHUNK_FAILED:
            state = {
                ...state,
            };
            break;

        /***************************************************
        * Reducers to load peIt-Graphs
        ****************************************************/

        case ActiveProjectActions.LOAD_PEIT_GRAPHS_SUCCEEDED:
            state = {
                ...state,
                peItGraphs: {
                    ...state.peItGraphs,
                    ...indexBy(((peIt: InfPersistentItem) => peIt.pk_entity.toString()), action.meta.peItGraphs)
                }
            };
            break;

        case ActiveProjectActions.LOAD_PEIT_GRAPHS_FAILED:
            state = {
                ...state,
            };
            break;


        /***************************************************
        * Reducers to load teEn-Graphs
        ****************************************************/

        case ActiveProjectActions.LOAD_TEEN_GRAPHS_SUCCEEDED:
            state = {
                ...state,
                teEnGraphs: {
                    ...state.teEnGraphs,
                    ...indexBy(((teEn: InfTemporalEntity) => teEn.pk_entity.toString()), action.meta.teEnGraphs)
                }
            };
            break;

        case ActiveProjectActions.LOAD_TEEN_GRAPHS_FAILED:
            state = {
                ...state,
            };
            break;

        /************************************************************************************
        *  Things for Mentionings / Annotations
        ************************************************************************************/

        case ActiveProjectActions.UPDATE_SELECTED_CHUNK:
            state = {
                ...state,
                selectedChunk: action.payload.selectedChunk
            };
            break;

        case ActiveProjectActions.SET_REFINING_CHUNK:
            state = {
                ...state,
                refiningChunk: action.payload.refiningChunk
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
