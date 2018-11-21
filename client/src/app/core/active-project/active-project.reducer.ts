import { ActiveProjectActions, ActiveProjectAction } from './active-project.action';
import { ProjectDetail } from './active-project.models';

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

        case ActiveProjectActions.LOAD_DATA_UNIT_PREVIEW_SUCCEEDED:
            state = {
                ...state,
                dataUnitPreviews: {
                    ...state.dataUnitPreviews,
                    [action.meta.dataUnitPreview.pk_entity]: action.meta.dataUnitPreview
                }
            };
            break;

        case ActiveProjectActions.LOAD_DATA_UNIT_PREVIEW_FAILED:
            state = {
                ...state,
            };
            break;

    }

    return state;
}

export const createActiveProjectReducer = () => {
    return activeProjectReducer;
}
