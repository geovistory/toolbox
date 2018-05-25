
import { Project } from "app/core";
import { ActiveProjectActions, ActiveProjectAction } from "./active-project.action";

const INITIAL_STATE: Project = null;

const activeProjectReducer = (lastState: Project = INITIAL_STATE, action: ActiveProjectAction): Project => {
    switch (action.type) {
        case ActiveProjectActions.ACTIVE_PROJECT_UPDATED:
            return action.payload;
    }

    return lastState;
}

export const createActiveProjectReducer = () => {
    return activeProjectReducer;
}