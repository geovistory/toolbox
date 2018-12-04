import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ProjectCrm, ProjectDetail } from './active-project.models';
import { DataUnitPreview, PeItDetail } from '../state/models';
import { InfChunk } from '../sdk';



interface MetaData {
    pk_project?: number;
    pk_entity?: number;
    pk_ui_context?: number;

    // return vals for Data Cache
    dataUnitPreview?: DataUnitPreview;
    peItDetail?: PeItDetail;
    chunk?: InfChunk
};
type Payload = ProjectDetail;
export type ActiveProjectAction = FluxStandardAction<Payload, MetaData>;


@Injectable()
export class ActiveProjectActions {
    static LOAD_PROJECT = 'ActiveProject::LOAD_PROJECT';
    static LOAD_PROJECT_FAILED = 'ActiveProject::LOAD_PROJECT_FAILED';
    static ACTIVE_PROJECT_UPDATED = 'ActiveProject::ACTIVE_PROJECT_UPDATED';

    static PROJECT_LOAD_CRM = 'ActiveProject::PROJECT_LOAD_CRM';
    static PROJECT_CRM_LOADED = 'ActiveProject::PROJECT_CRM_LOADED';

    /*******************************************
     * Data cache
     */
    // DataUnitPreviews
    static LOAD_DATA_UNIT_PREVIEW = 'ActiveProject::LOAD_DATA_UNIT_PREVIEW';
    static LOAD_DATA_UNIT_PREVIEW_SUCCEEDED = 'ActiveProject::LOAD_DATA_UNIT_PREVIEW_SUCCEEDED';
    static LOAD_DATA_UNIT_PREVIEW_FAILED = 'ActiveProject::LOAD_DATA_UNIT_PREVIEW_FAILED';
    // DataUnit Details for display in Modals
    static LOAD_DATA_UNIT_DETAIL_FOR_MODAL = 'ActiveProject::LOAD_DATA_UNIT_DETAIL_FOR_MODAL';
    static LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED = 'ActiveProject::LOAD_PE_IT_DETAIL_FOR_MODAL_SUCCEEDED';
    static LOAD_TE_EN_DETAIL_FOR_MODAL_SUCCEEDED = 'ActiveProject::LOAD_TE_EN_DETAIL_FOR_MODAL_SUCCEEDED'; // TODO: Implement action/reducer
    static LOAD_DATA_UNIT_DETAIL_FOR_MODAL_FAILED = 'ActiveProject::LOAD_DATA_UNIT_DETAIL_FOR_MODAL_FAILED';
    // Chunks
    static LOAD_CHUNK = 'ActiveProject::LOAD_CHUNK';
    static LOAD_CHUNK_SUCCEEDED = 'ActiveProject::LOAD_CHUNK_SUCCEEDED';
    static LOAD_CHUNK_FAILED = 'ActiveProject::LOAD_CHUNK_FAILED';


    /********************************************
     *  Things for Mentionings / Annotations
     */
    static UPDATE_SELECTED_CHUNK = 'ActiveProject::UPDATE_SELECTED_CHUNK';
    static SET_REFINING_CHUNK = 'ActiveProject::SET_REFINING_CHUNK';
    static SET_MENTIONINGS_FOCUSED_IN_TEXT = 'ActiveProject::SET_MENTIONINGS_FOCUSED_IN_TEXT';
    static SET_MENTIONINGS_FOCUSED_IN_TABLE = 'ActiveProject::SET_MENTIONINGS_FOCUSED_IN_TABLE';

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

    /*****************************************************
     * Actions to load a DataUnitPreview
     *****************************************************/

    loadDataUnitPreview(pk_project: number, pk_entity: number, pk_ui_context: number): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_DATA_UNIT_PREVIEW,
            payload: null,
            meta: {
                pk_project, pk_entity, pk_ui_context
            }
        }
    }

    loadDataUnitPreviewSucceeded(dataUnitPreview: DataUnitPreview): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_DATA_UNIT_PREVIEW_SUCCEEDED,
            payload: null,
            meta: {
                dataUnitPreview
            },
        }
    }

    loadDataUnitPreviewFailed(error): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_DATA_UNIT_PREVIEW_FAILED,
            payload: null,
            meta: null,
            error
        }
    }


    /*****************************************************
     * Load a Data Unit Details for display in Modals
     *****************************************************/

    loadDataUnitDetailForModal(pk_project: number, pk_entity: number, pk_ui_context: number): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_DATA_UNIT_DETAIL_FOR_MODAL,
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

    loadDataUnitDetailsForModalFailed(error): ActiveProjectAction {
        return {
            type: ActiveProjectActions.LOAD_DATA_UNIT_DETAIL_FOR_MODAL_FAILED,
            payload: null,
            meta: null,
            error
        }
    }



    /*****************************************************
     * Actions to load a Chunk
     *****************************************************/

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

    /*****************************************************
    * Actions for creating mentionings that have a chunk as range
    *****************************************************/

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


    /*****************************************************
    * Action for highlighting mentionings in the gui
    *****************************************************/
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
}
