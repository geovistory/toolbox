import { PeItTimelineAPIActions } from './pe-it-timeline.actions';
const INITIAL_STATE = {};
export const peItTimelineReducer = (lastState = INITIAL_STATE, action) => {
    switch (action.type) {
        case PeItTimelineAPIActions.TIMELINE_SET_CURSOR_POSITION:
            lastState = Object.assign({}, lastState, { timeLineSettings: Object.assign({}, lastState.timeLineSettings, action.payload.timeLineSettings) });
            break;
        case PeItTimelineAPIActions.TIMELINE_SET_EXTENT:
            lastState = Object.assign({}, lastState, { timeLineSettings: Object.assign({}, lastState.timeLineSettings, action.payload.timeLineSettings) });
            break;
    }
    return lastState;
};
//# sourceMappingURL=pe-it-timeline.reducer.js.map