import { ExistenceTimeEdit, RoleSetList } from "../../information.models";
import { FluxStandardAction } from "flux-standard-action";
import { Injectable } from "@angular/core";
import { dispatch } from "@angular-redux/store";

// Flux-standard-action gives us stronger typing of our actions.
type Payload = ExistenceTimeEdit;
interface MetaData { [key: string]: any };
export type ExTimeEditAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ExTimeEditActions {

    static readonly EX_TIME_MODAL_SHOW_HELP = 'EX_TIME_MODAL_SHOW_HELP';
    static readonly EX_TIME_MODAL_HIDE_HELP = 'EX_TIME_MODAL_HIDE_HELP';

    static readonly EX_TIME_ROLESET_ADDED = 'EX_TIME_ROLESET_ADDED';
    static readonly EX_TIME_ROLESET_REMOVED = 'EX_TIME_ROLESET_REMOVED';

    static readonly EX_TIME_MODAL_SHOW_ADVANCED = 'EX_TIME_MODAL_SHOW_ADVANCED';



    @dispatch() showHelp = (): ExTimeEditAction => ({
        type: ExTimeEditActions.EX_TIME_MODAL_SHOW_HELP,
        meta: null,
        payload: null
    })

    @dispatch() hideHelp = (): ExTimeEditAction => ({
        type: ExTimeEditActions.EX_TIME_MODAL_HIDE_HELP,
        meta: null,
        payload: null
    })

    @dispatch() showAdvancedMode = (): ExTimeEditAction => ({
        type: ExTimeEditActions.EX_TIME_MODAL_SHOW_ADVANCED,
        meta: null,
        payload: null
    })


    @dispatch() roleSetAdded = (_roleSet_list: RoleSetList): ExTimeEditAction => ({
        type: ExTimeEditActions.EX_TIME_ROLESET_ADDED,
        meta: null,
        payload: {
            _roleSet_list
        }
    })

    @dispatch() roleSetRemoved = (key: string): ExTimeEditAction => ({
        type: ExTimeEditActions.EX_TIME_ROLESET_REMOVED,
        meta: { key },
        payload: null
    })
}