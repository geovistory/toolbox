import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
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
