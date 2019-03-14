import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ProjectCrm, ProjectDetail, Tab, ListType, TypePeIt } from './active-project.models';
import { EntityPreview, PeItDetail } from '../state/models';
import { InfChunk, InfTemporalEntity, InfPersistentItem } from '../sdk';



interface MetaData {
    pk_project?: number;
    pk_entity?: number;
    pk_entities?: number[];
    pk_classes?: number[]
    pk_ui_context?: number;

    // return vals for Data Cache
    entityPreview?: EntityPreview;
    peItDetail?: PeItDetail;
    chunk?: InfChunk
    teEnGraphs?: InfTemporalEntity[]
    peItGraphs?: InfPersistentItem[]
    types?: TypePeIt[]

    // layout
    list?: ListType;
    panelIndex?: number;
    tabIndex?: number;
    previousPanelIndex?: number
    currentPanelIndex?: number
    previousTabIndex?: number
    currentTabIndex?: number
    tab?: Tab;
    pkEntity?: number;
};
type Payload = ProjectDetail;
export type ActiveProjectAction = FluxStandardAction<Payload, MetaData>;


@Injectable()
export class ActiveProjectActions {
    /* tslint:disable:member-ordering */

    /************************************************************************************
     * Load project data (metadata, crm)
    ************************************************************************************/
    static LOAD_PROJECT = 'ActiveProject::LOAD_PROJECT';
    static LOAD_PROJECT_FAILED = 'ActiveProject::LOAD_PROJECT_FAILED';
    static ACTIVE_PROJECT_UPDATED = 'ActiveProject::ACTIVE_PROJECT_UPDATED';
    static PROJECT_LOAD_CRM = 'ActiveProject::PROJECT_LOAD_CRM';
    static PROJECT_CRM_LOADED = 'ActiveProject::PROJECT_CRM_LOADED';


    loadProject(pk_project: number): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_PROJECT,
            payload: null,
            meta: {
                pk_project
            }
        }
    }

    activeProjectLoadCrm(pk_project: number): ActiveProjectAction {
        return {
            type: ActiveProjectActions.PROJECT_LOAD_CRM,
            payload: null,
            meta: {
                pk_project
            },
        }
    }

    activeProjectUpdated(payload: Payload): ActiveProjectAction {
        return {
            type: ActiveProjectActions.ACTIVE_PROJECT_UPDATED,
            payload,
            meta: null,
        }
    }

    projectCrmLoaded(crm: ProjectCrm): ActiveProjectAction {
        return {
            type: ActiveProjectActions.PROJECT_CRM_LOADED,
            payload: {
                crm
            },
            meta: null,
        }
    }


    /************************************************************************************
     * Layout
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
    addTab(tab: Tab): ActiveProjectAction {
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
    * Data cache
    ************************************************************************************/

    // EntityPreviews
    static LOAD_ENTITY_PREVIEW = 'ActiveProject::LOAD_ENTITY_PREVIEW';
    static LOAD_ENTITY_PREVIEW_SUCCEEDED = 'ActiveProject::LOAD_ENTITY_PREVIEW_SUCCEEDED';
    static LOAD_ENTITY_PREVIEW_FAILED = 'ActiveProject::LOAD_ENTITY_PREVIEW_FAILED';


    loadEntityPreview(pk_project: number, pk_entity: number, pk_ui_context: number): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_ENTITY_PREVIEW,
            payload: null,
            meta: {
                pk_project, pk_entity, pk_ui_context
            }
        }
    }

    loadEntityPreviewSucceeded(entityPreview: EntityPreview): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_ENTITY_PREVIEW_SUCCEEDED,
            payload: null,
            meta: {
                entityPreview
            },
        }
    }

    loadEntityPreviewFailed(error): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_ENTITY_PREVIEW_FAILED,
            payload: null,
            meta: null,
            error
        }
    }

    // EntityPreviews
    static LOAD_TYPES = 'ActiveProject::LOAD_TYPES';
    static LOAD_TYPES_SUCCEEDED = 'ActiveProject::LOAD_TYPES_SUCCEEDED';
    static LOAD_TYPES_FAILED = 'ActiveProject::LOAD_TYPES_FAILED';
    loadTypes(pk_project: number, pk_classes: number[]): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_TYPES,
            payload: null,
            meta: {
                pk_project, pk_classes
            }
        }
    }

    loadTypesSucceeded(types: TypePeIt[], pk_classes:number[]): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_TYPES_SUCCEEDED,
            payload: null,
            meta: {
                types, pk_classes
            },
        }
    }

    loadTypesFailed(error): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_TYPES_FAILED,
            payload: null,
            meta: null,
            error
        }
    }



    // Entities Details for display in Modals
    static LOAD_ENTITY_DETAIL_FOR_MODAL = 'ActiveProject::LOAD_ENTITY_DETAIL_FOR_MODAL';
    static LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED = 'ActiveProject::LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED';
    static LOAD_TE_EN_DETAIL_FOR_MODAL_SUCCEEDED = 'ActiveProject::LOAD_TE_EN_DETAIL_FOR_MODAL_SUCCEEDED'; // TODO: Implement action/reducer
    static LOAD_ENTITY_DETAIL_FOR_MODAL_FAILED = 'ActiveProject::LOAD_ENTITY_DETAIL_FOR_MODAL_FAILED';

    loadEntityDetailForModal(pk_project: number, pk_entity: number, pk_ui_context: number): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_ENTITY_DETAIL_FOR_MODAL,
            payload: null,
            meta: {
                pk_project, pk_entity, pk_ui_context
            }
        }
    }

    loadPeItDetailsForModalSucceeded(peItDetail: PeItDetail): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED,
            payload: null,
            meta: {
                peItDetail
            },
        }
    }

    loaEntitytDetailsForModalFailed(error): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_ENTITY_DETAIL_FOR_MODAL_FAILED,
            payload: null,
            meta: null,
            error
        }
    }


    // Chunks
    static LOAD_CHUNK = 'ActiveProject::LOAD_CHUNK';
    static LOAD_CHUNK_SUCCEEDED = 'ActiveProject::LOAD_CHUNK_SUCCEEDED';
    static LOAD_CHUNK_FAILED = 'ActiveProject::LOAD_CHUNK_FAILED';

    loadChunk(pk_project: number, pk_entity: number): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_CHUNK,
            payload: null,
            meta: {
                pk_project, pk_entity
            }
        }
    }

    loadChunkSucceeded(chunk: InfChunk): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_CHUNK_SUCCEEDED,
            payload: null,
            meta: {
                chunk
            },
        }
    }

    loadChunkFailed(error): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_CHUNK_FAILED,
            payload: null,
            meta: null,
            error
        }
    }

    // PeIt Graphs
    static LOAD_PEIT_GRAPHS = 'ActiveProject::LOAD_PEIT_GRAPHS';
    static LOAD_PEIT_GRAPHS_SUCCEEDED = 'ActiveProject::LOAD_PEIT_GRAPHS_SUCCEEDED';
    static LOAD_PEIT_GRAPHS_FAILED = 'ActiveProject::LOAD_PEIT_GRAPHS_FAILED';


    loadPeItGraphs(pk_project: number, pk_entities: number[]): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_PEIT_GRAPHS,
            payload: null,
            meta: {
                pk_project, pk_entities
            }
        }
    }

    loadPeItGraphsSucceeded(peItGraphs: InfPersistentItem[]): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_PEIT_GRAPHS_SUCCEEDED,
            payload: null,
            meta: {
                peItGraphs
            },
        }
    }

    loadPeItGraphsFailed(error): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_PEIT_GRAPHS_FAILED,
            payload: null,
            meta: null,
            error
        }
    }

    // TeEn Graphs
    static LOAD_TEEN_GRAPHS = 'ActiveProject::LOAD_TEEN_GRAPHS';
    static LOAD_TEEN_GRAPHS_SUCCEEDED = 'ActiveProject::LOAD_TEEN_GRAPHS_SUCCEEDED';
    static LOAD_TEEN_GRAPHS_FAILED = 'ActiveProject::LOAD_TEEN_GRAPHS_FAILED';

    loadTeEnGraphs(pk_project: number, pk_entities: number[]): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_TEEN_GRAPHS,
            payload: null,
            meta: {
                pk_project, pk_entities
            }
        }
    }

    loadTeEnGraphsSucceeded(teEnGraphs: InfTemporalEntity[]): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_TEEN_GRAPHS_SUCCEEDED,
            payload: null,
            meta: {
                teEnGraphs
            },
        }
    }

    loadTeEnGraphsFailed(error): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_TEEN_GRAPHS_FAILED,
            payload: null,
            meta: null,
            error
        }
    }




    /************************************************************************************
     *  Things for Mentionings / Annotations
    ************************************************************************************/
    static UPDATE_SELECTED_CHUNK = 'ActiveProject::UPDATE_SELECTED_CHUNK';
    static SET_REFINING_CHUNK = 'ActiveProject::SET_REFINING_CHUNK';
    static SET_CREATING_MENTIONING = 'ActiveProject::SET_CREATING_MENTIONING';


    updateSelectedChunk(selectedChunk: InfChunk): ActiveProjectAction {
        return {
            type: ActiveProjectActions.UPDATE_SELECTED_CHUNK,
            payload: { selectedChunk },
            meta: null
        }
    }

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
