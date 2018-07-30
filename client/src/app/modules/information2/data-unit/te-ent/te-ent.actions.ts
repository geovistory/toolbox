import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { InfTemporalEntity } from 'app/core';
import { TeEntDetail, CollapsedExpanded, ExistenceTimeDetail } from '../../information.models';
import { DataUnitActions } from '../data-unit.actions';


// replace TeEnt with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = TeEntDetail;
interface MetaData {
  path?: string[]
};
export type TeEntAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TeEntActions extends DataUnitActions {


  static readonly SET_TOGGLE = 'SET_TOGGLE';

  static readonly TOGGLE = 'TOGGLE';

  

  @dispatch() setToggle = (toggle: CollapsedExpanded): TeEntAction => ({
    type: TeEntActions.SET_TOGGLE,
    meta: null,
    payload: {
      toggle
    }
  })

  @dispatch() toggle = (): TeEntAction => ({
    type: TeEntActions.TOGGLE,
    meta: null,
    payload: null
  })

}
