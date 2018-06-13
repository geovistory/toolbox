import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { ExistenceTimeDetail, RoleSetList } from '../information.models';


// Flux-standard-action gives us stronger typing of our actions.
type Payload = ExistenceTimeDetail;
interface MetaData { [key: string]: any };
export type ExistenceTimeAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ExistenceTimeActions {

  static readonly EX_TIME_ROLESET_ADDED = 'EX_TIME_ROLESET_ADDED';

  static readonly EX_TIME_ROLESET_REMOVED = 'EX_TIME_ROLESET_REMOVED';
  
  static readonly TOGGLE = 'TOGGLE';


  @dispatch()

  addRoleSet = (_roleSet_list: RoleSetList): ExistenceTimeAction => ({
    type: ExistenceTimeActions.EX_TIME_ROLESET_ADDED,
    meta: null,
    payload: {
      _roleSet_list
    }
  })

  removeRoleSet = (key: string): ExistenceTimeAction => ({
    type: ExistenceTimeActions.EX_TIME_ROLESET_REMOVED,
    meta: { key },
    payload: null
  })

  toggle = () => ({
    type: ExistenceTimeActions.TOGGLE,
    meta: null,
    payload: null
  })


  
}