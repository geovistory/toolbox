import { ExistenceTimeEdit } from "app/core/models";
import { ExTimeEditActions, ExTimeEditAction } from "./existence-time-edit.actions";

export const existenceTimeEditReducer =
    (lastState = new ExistenceTimeEdit(), action: ExTimeEditAction): ExistenceTimeEdit => {
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
                    _children: {
                        ...lastState._children,
                        ...action.payload._children
                    }
                }
                break;

            case ExTimeEditActions.EX_TIME_ROLESET_REMOVED:
                let newRoleSets = Object.assign({}, lastState._children);
                delete newRoleSets[action.meta.key];

                lastState = {
                    ...lastState,
                    _children: newRoleSets
                }
                break;
        }
        return lastState;
    };
