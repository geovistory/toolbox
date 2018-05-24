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

}