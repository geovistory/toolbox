var ProjectSettingsDataAPIActions_1;
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
;
let ProjectSettingsDataAPIActions = ProjectSettingsDataAPIActions_1 = class ProjectSettingsDataAPIActions {
    constructor() {
        /*********************************************************************
         *  Set tab title
         *********************************************************************/
        this.setTabTitle = (tabTitle) => ({
            type: ProjectSettingsDataAPIActions_1.SET_TAB_TITLE,
            meta: { tabTitle },
            payload: null,
        });
        /*********************************************************************
        *  Method to distroy the slice of store
        *********************************************************************/
        this.destroy = () => ({
            type: ProjectSettingsDataAPIActions_1.DESTROY,
            meta: null,
            payload: null
        });
    }
};
ProjectSettingsDataAPIActions.SET_TAB_TITLE = 'ProjectSettingsData::SET_TAB_TITLE';
ProjectSettingsDataAPIActions.DESTROY = 'ProjectSettingsData::DESTROY';
tslib_1.__decorate([
    dispatch()
], ProjectSettingsDataAPIActions.prototype, "setTabTitle", void 0);
tslib_1.__decorate([
    dispatch()
], ProjectSettingsDataAPIActions.prototype, "destroy", void 0);
ProjectSettingsDataAPIActions = ProjectSettingsDataAPIActions_1 = tslib_1.__decorate([
    Injectable()
], ProjectSettingsDataAPIActions);
export { ProjectSettingsDataAPIActions };
//# sourceMappingURL=project-settings-data.actions.js.map