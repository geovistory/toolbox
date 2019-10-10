import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { CollapsedExpanded, TeEntAccentuation, TeEntDetail } from 'app/core/state/models';
import { FluxStandardAction } from 'flux-standard-action';
import { EntityActions } from '../../pe-it-detail/api/entity.actions';


// replace TeEnt with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = TeEntDetail;
interface MetaData {
  path?: string[];
  accentuation?: TeEntAccentuation;
  timespanActivated?: boolean;
};
export type TeEntAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TeEntActions extends EntityActions {


  static readonly SET_TOGGLE = 'SET_TOGGLE';

  static readonly TOGGLE = 'TOGGLE';

  static readonly TE_ENT_SET_ACCENTUATION = 'TE_ENT_SET_ACCENTUATION';

  static readonly TE_ENT_SET_TIMESPAN_ACTIVATED = 'TE_ENT_SET_TIMESPAN_ACTIVATED';

  static readonly START_EDITING = 'TeEntActions::START_EDITING';
  static readonly STOP_EDITING = 'TeEntActions::STOP_EDITING';


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

  @dispatch() setAccentuation = (accentuation: TeEntAccentuation): TeEntAction => ({
    type: TeEntActions.TE_ENT_SET_ACCENTUATION,
    meta: {
      accentuation
    },
    payload: null
  })

  @dispatch() setTimespanActivated = (timespanActivated): TeEntAction => ({
    type: TeEntActions.TE_ENT_SET_TIMESPAN_ACTIVATED,
    meta: {
      timespanActivated
    },
    payload: null
  })

  @dispatch() startEditing = (): TeEntAction => ({
    type: TeEntActions.START_EDITING,
    meta: null,
    payload: null
  })

  @dispatch() stopEditing = (): TeEntAction => ({
    type: TeEntActions.STOP_EDITING,
    meta: null,
    payload: null
  })

}
