
import { ActiveProjectActions, ActiveProjectAction } from "./active-project.action";
import { ProjectDetail } from "./active-project.models";

const INITIAL_STATE: ProjectDetail = null;

const activeProjectReducer = (lastState: ProjectDetail = INITIAL_STATE, action: ActiveProjectAction): ProjectDetail => {
    switch (action.type) {
        case ActiveProjectActions.ACTIVE_PROJECT_UPDATED:
            lastState = {
                ...lastState,
                ...action.payload
            };
            break;

        case ActiveProjectActions.PROJECT_CRM_LOADED:
            lastState = {
                ...lastState,
                crm: action.payload.crm
            }
            break;
    }

    return lastState;
}

export const createActiveProjectReducer = () => {
    return activeProjectReducer;
}