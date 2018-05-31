import { MentionedEntity } from "../../annotation.models";
import { MentionedEntityCtrlActions, MentionedEntityCtrlAction } from "./mentioned-entities-ctrl.actions";
import { omit } from 'ramda';

const INITIAL_STATE:  { [key: string]: MentionedEntity } = {

};

export const mentionedEntityCtrlReducer =
    (lastState:  { [key: string]: MentionedEntity } = INITIAL_STATE, action: MentionedEntityCtrlAction):  { [key: string]: MentionedEntity } => {

        switch (action.type) {
            case MentionedEntityCtrlActions.REMOVE_MENTIONED_ENTITY:
                lastState = omit([action.meta.key], lastState)
                break;
        }

        switch (action.type) {
            case MentionedEntityCtrlActions.ADD_MENTIONED_ENTITY:
                lastState = {
                    ...lastState,
                    ...action.payload
                }
                break;
        }


        return lastState;
    };

