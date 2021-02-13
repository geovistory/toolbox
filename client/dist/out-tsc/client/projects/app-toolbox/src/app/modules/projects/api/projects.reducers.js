import { ProjectsActions } from './projects.actions';
const INITIAL_STATE = {
    records: []
};
const projectListReducer = (lastState = INITIAL_STATE, action) => {
    switch (action.type) {
        case ProjectsActions.LOAD_PROJECTS_SUCCEEDED: return Object.assign({}, lastState, { records: action.payload.map((record) => ({ record: record })) });
    }
    return lastState;
};
export const createProjectsReducer = () => {
    return projectListReducer;
};
//# sourceMappingURL=projects.reducers.js.map