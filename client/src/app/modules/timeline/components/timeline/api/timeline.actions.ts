import { Injectable } from '../../../../../../../node_modules/@angular/core';
import { FluxStandardAction } from '../../../../../../../node_modules/flux-standard-action';
import { TimeLineSettings } from '../../../models/timeline';
import { dispatch } from '../../../../../../../node_modules/@angular-redux/store';


// Flux-standard-action gives us stronger typing of our actions.
type Payload = TimeLineSettings;
// tslint:disable-next-line:no-empty-interface
interface MetaData { };
export type TimeLineApiAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TimeLineApiActions {


  static readonly TIMELINE_SET_CURSOR_POSITION = 'TIMELINE_SET_CURSOR_POSITION';
  static readonly TIMELINE_SET_EXTENT = 'TIMELINE_SET_EXTENT';

  @dispatch() setCursorPosition = (cursorPosition: number): TimeLineApiAction => ({
    type: TimeLineApiActions.TIMELINE_SET_CURSOR_POSITION,
    meta: null,
    payload: {
      cursorPosition
    }
  })

  @dispatch() setExtent = (domainStart: number, domainEnd:number): TimeLineApiAction => ({
    type: TimeLineApiActions.TIMELINE_SET_EXTENT,
    meta: null,
    payload: {
      domainStart,
      domainEnd
    }
  })


}
