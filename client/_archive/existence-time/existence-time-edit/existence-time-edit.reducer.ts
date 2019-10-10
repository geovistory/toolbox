import { ExistenceTimeEdit } from "app/core/state/models";
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
                    _fields: {
                        ...lastState._fields,
                        ...action.payload._fields
                    }
                }
                break;

            case ExTimeEditActions.EX_TIME_ROLESET_REMOVED:
                let newPropertyFields = Object.assign({}, lastState._fields);
                delete newPropertyFields[action.meta.key];

                lastState = {
                    ...lastState,
                    _fields: newPropertyFields
                }
                break;
        }
        return lastState;
    };
