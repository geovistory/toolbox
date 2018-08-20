import { TimeLineSettings } from '../../../models/timeline';
import { TimeLineApiAction, TimeLineApiActions } from './timeline.actions';


const INITIAL_STATE: TimeLineSettings = {
};


export const timeLineApiReducer = (lastState: TimeLineSettings = INITIAL_STATE, action: TimeLineApiAction): TimeLineSettings => {

  switch (action.type) {

    case TimeLineApiActions.TIMELINE_SET_CURSOR_POSITION:
      lastState = {
        ...lastState,
        cursorPosition: action.payload.cursorPosition
      };
      break;

    case TimeLineApiActions.TIMELINE_SET_EXTENT:
      lastState = {
        ...lastState,
        domainStart: action.payload.domainStart,
        domainEnd: action.payload.domainEnd
      };
      break;
  }

  return lastState;
};

