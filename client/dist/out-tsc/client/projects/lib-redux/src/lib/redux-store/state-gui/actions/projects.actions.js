var ProjectsActions_1;
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let ProjectsActions = ProjectsActions_1 = class ProjectsActions {
    loadProjectsSucceeded(payload) {
        return {
            type: ProjectsActions_1.LOAD_PROJECTS_SUCCEEDED,
            payload,
            meta: null
        };
    }
};
ProjectsActions.LOAD_PROJECTS_SUCCEEDED = 'LOAD_PROJECTS_SUCCEEDED';
ProjectsActions = ProjectsActions_1 = tslib_1.__decorate([
    Injectable()
], ProjectsActions);
export { ProjectsActions };
//# sourceMappingURL=projects.actions.js.map