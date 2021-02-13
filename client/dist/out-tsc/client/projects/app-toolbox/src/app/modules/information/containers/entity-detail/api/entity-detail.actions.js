var EntityDetailAPIActions_1;
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
;
let EntityDetailAPIActions = EntityDetailAPIActions_1 = class EntityDetailAPIActions {
    constructor() {
        /**
         * Set index of the active tab in the right panel
         * @param tabIndex index of the active tab in the right panel
         */
        this.setRightPanelActiveTab = (rightPanelActiveTab) => ({
            type: EntityDetailAPIActions_1.SET_RIGHT_PANEL_ACTIVE_TAB,
            meta: null,
            payload: {
                rightPanelActiveTab
            }
        });
        // setShowRightArea = (showRightArea: boolean): EntityDetailAPIAction => ({
        //   type: EntityDetailAPIActions.SET_SHOW_RIGHT_AREA,
        //   meta: null,
        //   payload: {
        //     showRightArea
        //   }
        // })
        /**
         * Toggle booleans
         * @param keyToToggle key of the property to toggle. E.g. 'showRightPanel' or 'showProperties'
         */
        this.toggleBoolean = (keyToToggle) => ({
            type: EntityDetailAPIActions_1.TOGGLE_BOOLEAN,
            meta: { keyToToggle },
            payload: null
        });
        this.init = (config) => ({
            type: EntityDetailAPIActions_1.INIT,
            meta: { config },
            payload: null,
        });
        this.destroy = () => ({
            type: EntityDetailAPIActions_1.DESTROY,
            meta: null,
            payload: null
        });
    }
};
EntityDetailAPIActions.INIT = 'PeItDetail::INIT';
EntityDetailAPIActions.DESTROY = 'PeItDetail::DESTROY';
EntityDetailAPIActions.TOGGLE_BOOLEAN = 'PeItActions::TOGGLE_BOOLEAN';
// static readonly SET_SHOW_RIGHT_AREA = 'Entity::SET_SHOW_RIGHT_AREA';
EntityDetailAPIActions.SET_RIGHT_PANEL_ACTIVE_TAB = 'Entity::SET_RIGHT_PANEL_ACTIVE_TAB';
tslib_1.__decorate([
    dispatch()
], EntityDetailAPIActions.prototype, "init", void 0);
tslib_1.__decorate([
    dispatch()
], EntityDetailAPIActions.prototype, "destroy", void 0);
EntityDetailAPIActions = EntityDetailAPIActions_1 = tslib_1.__decorate([
    Injectable()
], EntityDetailAPIActions);
export { EntityDetailAPIActions };
//# sourceMappingURL=entity-detail.actions.js.map