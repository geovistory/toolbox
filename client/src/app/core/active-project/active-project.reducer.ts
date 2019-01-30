import { ActiveProjectActions, ActiveProjectAction } from './active-project.action';
import { ProjectDetail } from './active-project.models';
import { EntityPreview } from '../state/models';
import { indexBy } from 'ramda';
import { InfPersistentItem, InfTemporalEntity } from '../sdk/models';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

const INITIAL_STATE: ProjectDetail = {
    panels: [
        {
            focus: true,
            tabs: [
                {
                    active: true,
                    path: ['activeProject', 'entityDetails', 'a'],
                    pkEntity: 25503,
                    component: 'entity-detail',
                    icon: 'persistent-entity'
                },
                {
                    active: false,
                    path: ['activeProject', 'sourceDetails', 'x'],
                    pkEntity: 80637,
                    component: 'source-detail',
                    icon: 'source'
                },
                {
                    active: false,
                    path: ['activeProject', 'sectionDetails', 'x'],
                    pkEntity: 9,
                    component: 'section-detail',
                    icon: 'section'
                }
            ]
        },
        {
            focus: false,
            tabs: [
                {
                    active: true,
                    path: ['activeProject', 'sourceDetails', 'y'],
                    pkEntity: 3,
                    component: 'source-detail',
                    icon: 'source'
                }
            ]
        }
    ]
};

const activeProjectReducer = (state: ProjectDetail = INITIAL_STATE, action: ActiveProjectAction): ProjectDetail => {
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
            const pi = action.meta.panelIndex;
            const ti = action.meta.tabIndex;
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
            const ppi = action.meta.previousPanelIndex;
            const cpi = action.meta.currentPanelIndex;
            const pti = action.meta.previousTabIndex;
            const cti = action.meta.currentTabIndex;

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
