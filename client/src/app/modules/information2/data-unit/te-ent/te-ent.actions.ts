import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { InfTemporalEntity } from 'app/core';
import { TeEntDetail, CollapsedExpanded } from '../../information.models';
import { DataUnitActions } from '../data-unit.actions';


// replace TeEnt with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = TeEntDetail;
interface MetaData { };
export type TeEntAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TeEntActions extends DataUnitActions {
  // static readonly TE_ENT_TO_EDIT_UPDATED = 'TE_ENT_TO_EDIT_UPDATED';

  // static readonly TE_ENT_TO_ADD_UPDATED = 'TE_ENT_TO_ADD_UPDATED';

  // static readonly TE_ENT_TO_CREATE_UPDATED = 'TE_ENT_TO_CREATE_UPDATED';

  // static readonly TE_ENT_ROLE_SET_LIST_INITIALIZED = 'TE_ENT_ROLE_SET_LIST_INITIALIZED';

  // static readonly TE_ENT_LABEL_UPDATED = 'TE_ENT_LABEL_UPDATED';

  static readonly SET_TOGGLE = 'SET_TOGGLE';

  static readonly TOGGLE = 'TOGGLE';

  @dispatch()

  // teEntToEditUpdated = (teEntToEdit: InfTemporalEntity): TeEntAction => ({
  //   type: TeEntActions.TE_ENT_TO_EDIT_UPDATED,
  //   meta: null,
  //   payload: {
  //     teEntToEdit
  //   }
  // })

  // teEntToAddUpdated = (teEntToAdd: InfTemporalEntity): TeEntAction => ({
  //   type: TeEntActions.TE_ENT_TO_ADD_UPDATED,
  //   meta: null,
  //   payload: {
  //     teEntToAdd
  //   }
  // })

  // teEntToCreateUpdated = (teEntToCreate: InfTemporalEntity): TeEntAction => ({
  //   type: TeEntActions.TE_ENT_TO_CREATE_UPDATED,
  //   meta: null,
  //   payload: {
  //     teEntToCreate
  //   }
  // })

  setToggle = (toggle: CollapsedExpanded): TeEntAction  => ({
    type: TeEntActions.SET_TOGGLE,
    meta: null,
    payload: {
      toggle
    }
  })

  toggle = (): TeEntAction  => ({
    type: TeEntActions.TOGGLE,
    meta: null,
    payload: null
  })

  // teEntLabelUpdated = (label:string): TeEntAction  => ({
  //   type: TeEntActions.TE_ENT_LABEL_UPDATED,
  //   meta: null,
  //   payload: {
  //     label
  //   }
  // })

}
