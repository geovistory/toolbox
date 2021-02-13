var PeItTimelineAPIActions_1;
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
;
let PeItTimelineAPIActions = PeItTimelineAPIActions_1 = class PeItTimelineAPIActions {
    constructor() {
        this.setCursorPosition = (cursorPosition) => ({
            type: PeItTimelineAPIActions_1.TIMELINE_SET_CURSOR_POSITION,
            meta: null,
            payload: {
                timeLineSettings: {
                    cursorPosition
                }
            }
        });
        this.setExtent = (domainStart, domainEnd) => ({
            type: PeItTimelineAPIActions_1.TIMELINE_SET_EXTENT,
            meta: null,
            payload: {
                timeLineSettings: {
                    domainStart,
                    domainEnd
                }
            }
        });
    }
};
PeItTimelineAPIActions.TIMELINE_SET_CURSOR_POSITION = 'TIMELINE_SET_CURSOR_POSITION';
PeItTimelineAPIActions.TIMELINE_SET_EXTENT = 'TIMELINE_SET_EXTENT';
tslib_1.__decorate([
    dispatch()
], PeItTimelineAPIActions.prototype, "setCursorPosition", void 0);
tslib_1.__decorate([
    dispatch()
], PeItTimelineAPIActions.prototype, "setExtent", void 0);
PeItTimelineAPIActions = PeItTimelineAPIActions_1 = tslib_1.__decorate([
    Injectable()
], PeItTimelineAPIActions);
export { PeItTimelineAPIActions };
//# sourceMappingURL=pe-it-timeline.actions.js.map