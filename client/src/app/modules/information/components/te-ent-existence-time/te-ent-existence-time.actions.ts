import { IExistenceTimeState } from "./te-ent-existence-time.model";
import { FluxStandardAction } from "flux-standard-action";
import { Injectable } from "@angular/core";
import { dispatch } from "@angular-redux/store";
import { IRoleSetState } from "../role-set/role-set.model";
import { IRoleSets } from "../role-set-list/role-set-list.model";


// Flux-standard-action gives us stronger typing of our actions.
type Payload = IExistenceTimeState;
interface MetaData { [key: string]: any };
export type ExistenceTimeAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ExistenceTimeActions {

  static readonly EX_TIME_ROLESET_ADDED = 'EX_TIME_ROLESET_ADDED';

  static readonly EX_TIME_ROLESET_REMOVED = 'EX_TIME_ROLESET_REMOVED';

  static readonly EX_TIME_START_EDITING = 'EX_TIME_START_EDITING';

  static readonly EX_TIME_STOP_EDITING = 'EX_TIME_STOP_EDITING';
  
  static readonly EX_TIME_UPDATED = 'EX_TIME_UPDATED';

  static readonly TOGGLE = 'TOGGLE';


  @dispatch()

  addRoleSet = (roleSets: IRoleSets): ExistenceTimeAction => ({
    type: ExistenceTimeActions.EX_TIME_ROLESET_ADDED,
    meta: null,
    payload: {
      roleSets
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

  startEditing = (): ExistenceTimeAction => ({
    type: ExistenceTimeActions.EX_TIME_START_EDITING,
    meta: null,
    payload: null
  })

  stopEditing = (payload:IExistenceTimeState): ExistenceTimeAction => ({
    type: ExistenceTimeActions.EX_TIME_STOP_EDITING,
    meta: null,
    payload
  })

  existenceTimeUpdated = (payload:IExistenceTimeState): ExistenceTimeAction => ({
    type: ExistenceTimeActions.EX_TIME_UPDATED,
    meta: null,
    payload
  })
  
}