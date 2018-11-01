import { ExistenceTimeEdit, RoleSetList, ExTimeHelpMode } from 'app/core/state/models';
import { FluxStandardAction } from 'flux-standard-action';
import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = ExistenceTimeEdit;
interface MetaData { [key: string]: any };
export type ExTimeEditAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ExTimeEditActions {


    static readonly EX_TIME_MODAL_SET_HELP_MODE = 'EX_TIME_MODAL_SET_HELP_MODE';

    static readonly EX_TIME_ROLESET_ADDED = 'EX_TIME_ROLESET_ADDED';
    static readonly EX_TIME_ROLESET_REMOVED = 'EX_TIME_ROLESET_REMOVED';

    static readonly EX_TIME_MODAL_SHOW_ADVANCED = 'EX_TIME_MODAL_SHOW_ADVANCED';

    @dispatch() setHelpMode = (helpMode: ExTimeHelpMode): ExTimeEditAction => ({
        type: ExTimeEditActions.EX_TIME_MODAL_SET_HELP_MODE,
        meta: null,
        payload: new ExistenceTimeEdit({
            helpMode
        })
    })

    @dispatch() showAdvancedMode = (): ExTimeEditAction => ({
        type: ExTimeEditActions.EX_TIME_MODAL_SHOW_ADVANCED,
        meta: null,
        payload: null
    })


    @dispatch() roleSetAdded = (_fields: RoleSetList): ExTimeEditAction => ({
        type: ExTimeEditActions.EX_TIME_ROLESET_ADDED,
        meta: null,
        payload: new ExistenceTimeEdit({
            _fields
        })
    })

    @dispatch() roleSetRemoved = (key: string): ExTimeEditAction => ({
        type: ExTimeEditActions.EX_TIME_ROLESET_REMOVED,
        meta: { key },
        payload: null
    })
}