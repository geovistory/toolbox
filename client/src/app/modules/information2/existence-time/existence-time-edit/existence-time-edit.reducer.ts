import { ExistenceTimeEdit } from "../../information.models";
import { ExTimeEditActions, ExTimeEditAction } from "./existence-time-edit.actions";

export const existenceTimeEditReducer =
    (lastState: ExistenceTimeEdit = {}, action: ExTimeEditAction): ExistenceTimeEdit => {
        switch (action.type) {

            case ExTimeEditActions.EX_TIME_MODAL_SET_HELP_MODE:
                lastState = {
                    ...lastState,
                    helpMode: action.payload.helpMode
                };
                break;

            case ExTimeEditActions.EX_TIME_MODAL_SHOW_ADVANCED:
                lastState = {
                    ...lastState,
                    mode: 'advanced'
                };
                break;

            case ExTimeEditActions.EX_TIME_ROLESET_ADDED:
                lastState = {
                    ...lastState,
                    _roleSet_list: {
                        ...lastState._roleSet_list,
                        ...action.payload._roleSet_list
                    }
                }
                break;

            case ExTimeEditActions.EX_TIME_ROLESET_REMOVED:
                let newRoleSets = Object.assign({}, lastState._roleSet_list);
                delete newRoleSets[action.meta.key];

                lastState = {
                    ...lastState,
                    _roleSet_list: newRoleSets
                }
                break;
        }
        return lastState;
    };
