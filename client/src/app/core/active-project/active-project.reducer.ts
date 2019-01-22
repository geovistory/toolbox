import { ActiveProjectActions, ActiveProjectAction } from './active-project.action';
import { ProjectDetail } from './active-project.models';
import { EntityPreview } from '../state/models';
import { indexBy } from 'ramda';
import { InfPersistentItem, InfTemporalEntity } from '../sdk/models';

const INITIAL_STATE: ProjectDetail = null;

const activeProjectReducer = (state: ProjectDetail = INITIAL_STATE, action: ActiveProjectAction): ProjectDetail => {
    switch (action.type) {
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


        /***************************************************
        * Reducers to load DataUnitPreview
        ****************************************************/
        case ActiveProjectActions.LOAD_ENTITY_PREVIEW:
            state = {
                ...state,
                entityPreviews: {
                    ...(state || {}).entityPreviews,
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


        /***************************************************
        * Reducers for creating mentionings that have a chunk as range
        ****************************************************/

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


        /*****************************************************
        * highlighting mentionings in the gui
        *****************************************************/
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


        /*****************************************************
         * destroy the active project
         *****************************************************/
        case ActiveProjectActions.DESTROY:
            state = INITIAL_STATE;
            break;
    }

    return state;
}

export const createActiveProjectReducer = () => {
    return activeProjectReducer;
}
