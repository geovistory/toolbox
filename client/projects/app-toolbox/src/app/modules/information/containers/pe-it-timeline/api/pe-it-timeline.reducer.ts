import { TimeLineSettings } from 'projects/app-toolbox/src/app/modules/timeline/models/timeline';
import { PeItTimelineAPIAction, PeItTimelineAPIActions } from './pe-it-timeline.actions';
import { PeItTimeline } from './pe-it-timeline.models';


const INITIAL_STATE: PeItTimeline = {
};


export const peItTimelineReducer = (lastState: PeItTimeline = INITIAL_STATE, action: PeItTimelineAPIAction): PeItTimeline => {

  switch (action.type) {

    case PeItTimelineAPIActions.TIMELINE_SET_CURSOR_POSITION:
      lastState = {
        ...lastState,
        timeLineSettings: {
          ...lastState.timeLineSettings,
          ...action.payload.timeLineSettings
        }
      };
      break;

    case PeItTimelineAPIActions.TIMELINE_SET_EXTENT:
      lastState = {
        ...lastState,
        timeLineSettings: {
          ...lastState.timeLineSettings,
          ...action.payload.timeLineSettings
        }
      };
      break;
  }

  return lastState;
};

