import { MentionedEntity } from "../../annotation.models";
import { FluxStandardAction } from "flux-standard-action";
import { Injectable } from "@angular/core";
import { dispatch } from "@angular-redux/store";

export function mentionedEntityKey(m: MentionedEntity) {
    return '_mentioned_' + m.pkEntity;
  }

// Flux-standard-action gives us stronger typing of our actions.
type Payload = { [key: string]: MentionedEntity };
export type MentionedEntityCtrlAction = FluxStandardAction<Payload, any>;

@Injectable()
export class MentionedEntityCtrlActions {
    static readonly REMOVE_MENTIONED_ENTITY = 'REMOVE_MENTIONED_ENTITY';
    static readonly ADD_MENTIONED_ENTITY = 'ADD_MENTIONED_ENTITY';

    @dispatch()


    removeMentionedEntity = (key: string): MentionedEntityCtrlAction => ({
        type: MentionedEntityCtrlActions.REMOVE_MENTIONED_ENTITY,
        meta: { key },
        payload: null
    })



    addMentionedEntity = (entity: MentionedEntity): MentionedEntityCtrlAction => ({
        type: MentionedEntityCtrlActions.ADD_MENTIONED_ENTITY,
        meta: null,
        payload: {
            [entity.pkEntity]: entity
        }
    })

}
