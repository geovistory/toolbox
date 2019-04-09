import { Injectable } from '../../../../../../../node_modules/@angular/core';
import { FluxStandardAction } from '../../../../../../../node_modules/flux-standard-action';
import { dispatch } from '../../../../../../../node_modules/@angular-redux/store';
import { TimeLineSettings } from 'app/modules/timeline/models/timeline';
import { PeItTimeline } from './pe-it-timeline.models';


// Flux-standard-action gives us stronger typing of our actions.
type Payload = PeItTimeline;
// tslint:disable-next-line:no-empty-interface
interface MetaData { };
export type PeItTimelineAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PeItTimelineAPIActions {


  static readonly TIMELINE_SET_CURSOR_POSITION = 'TIMELINE_SET_CURSOR_POSITION';
  static readonly TIMELINE_SET_EXTENT = 'TIMELINE_SET_EXTENT';

  @dispatch() setCursorPosition = (cursorPosition: number): PeItTimelineAPIAction => ({
    type: PeItTimelineAPIActions.TIMELINE_SET_CURSOR_POSITION,
    meta: null,
    payload: {
      timeLineSettings: {
        cursorPosition
      }
    }
  })

  @dispatch() setExtent = (domainStart: number, domainEnd: number): PeItTimelineAPIAction => ({
    type: PeItTimelineAPIActions.TIMELINE_SET_EXTENT,
    meta: null,
    payload: {
      timeLineSettings: {
        domainStart,
        domainEnd
      }
    }
  })


}
