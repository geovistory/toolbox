import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { ITeEntState } from './te-ent.model';
import { InfTemporalEntity } from '../../../../core';
import { RoleSetListState } from '../role-set-list/role-set-list.model';
import { RoleSetListActions } from '../role-set-list/role-set-list-actions';
import { CollapsedExpanded } from '../../information.models';

// replace TeEnt with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = ITeEntState;
interface MetaData { };
export type TeEntAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TeEntActions extends RoleSetListActions {
  static readonly TE_ENT_TO_EDIT_UPDATED = 'TE_ENT_TO_EDIT_UPDATED';

  static readonly TE_ENT_TO_ADD_UPDATED = 'TE_ENT_TO_ADD_UPDATED';

  static readonly TE_ENT_TO_CREATE_UPDATED = 'TE_ENT_TO_CREATE_UPDATED';

  static readonly TE_ENT_ROLE_SET_LIST_INITIALIZED = 'TE_ENT_ROLE_SET_LIST_INITIALIZED';

  static readonly SET_TOGGLE = 'SET_TOGGLE';

  static readonly TOGGLE = 'TOGGLE';

  @dispatch()

  teEntToEditUpdated = (teEntToEdit: InfTemporalEntity): TeEntAction => ({
    type: TeEntActions.TE_ENT_TO_EDIT_UPDATED,
    meta: null,
    payload: {
      teEntToEdit
    }
  })

  teEntToAddUpdated = (teEntToAdd: InfTemporalEntity): TeEntAction => ({
    type: TeEntActions.TE_ENT_TO_ADD_UPDATED,
    meta: null,
    payload: {
      teEntToAdd
    }
  })

  teEntToCreateUpdated = (teEntToCreate: InfTemporalEntity): TeEntAction => ({
    type: TeEntActions.TE_ENT_TO_CREATE_UPDATED,
    meta: null,
    payload: {
      teEntToCreate
    }
  })

  setToggle = (toggle: CollapsedExpanded) => ({
    type: TeEntActions.SET_TOGGLE,
    meta: null,
    payload: {
      toggle
    }
  })

  toggle = () => ({
    type: TeEntActions.TOGGLE,
    meta: null,
    payload: null
  })


}
