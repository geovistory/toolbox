import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { ExistenceTimeDetail, RoleSetList, ExTimeModalMode } from 'app/core/state/models';


// Flux-standard-action gives us stronger typing of our actions.
type Payload = ExistenceTimeDetail;
interface MetaData { [key: string]: any };
export type ExistenceTimeAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ExistenceTimeActions {


  static readonly EX_TIME_START_EDITING = 'EX_TIME_START_EDITING';

  static readonly EX_TIME_STOP_EDITING = 'EX_TIME_STOP_EDITING';

  static readonly EX_TIME_UPDATED = 'EX_TIME_UPDATED';

  static readonly TOGGLE = 'TOGGLE';


  @dispatch()

  startEditingExTime = (mode: ExTimeModalMode): ExistenceTimeAction => ({
    type: ExistenceTimeActions.EX_TIME_START_EDITING,
    meta: {
      mode
    },
    payload: null
  })

  stopEditingExTime = (): ExistenceTimeAction => ({
    type: ExistenceTimeActions.EX_TIME_STOP_EDITING,
    meta: null,
    payload: null
  })

  existenceTimeUpdated = (payload: ExistenceTimeDetail): ExistenceTimeAction => ({
    type: ExistenceTimeActions.EX_TIME_UPDATED,
    meta: null,
    payload
  })

  toggle = () => ({
    type: ExistenceTimeActions.TOGGLE,
    meta: null,
    payload: null
  })



}