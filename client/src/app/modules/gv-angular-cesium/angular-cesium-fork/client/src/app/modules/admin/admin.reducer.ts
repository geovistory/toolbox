import { Admin } from "./admin.models";
import { AdminAction, AdminActions } from "./admin.actions";

const INITIAL_STATE: Admin = {

};

export const adminReducer = (lastState: Admin = INITIAL_STATE, action: AdminAction): Admin => {
    switch (action.type) {

    }

    return lastState;
}

