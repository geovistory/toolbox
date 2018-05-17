import { BehaviorSubject } from "rxjs";
import { InfPersistentItem, DfhClass } from "app/core";
import { CollapsedExpanded, EditorStates } from "../../information.models";
import { RoleSetListState } from "../../components/role-set-list/role-set-list.model";


export interface IPeItState extends RoleSetListState {
    /** db data */
    peIt?: InfPersistentItem;

    /** init data */
    pkEntity?: number
    state?: EditorStates;

    /** display data */
    label?: string;
    toggle?: CollapsedExpanded;
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean

}

export class PeItState implements IPeItState {
    /** db data */
    peIt?: InfPersistentItem;

    /** init data */
    pkEntity?: number
    state?: EditorStates;

    /** display data */
    label?: string;
    toggle?: CollapsedExpanded;
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean


    constructor(data?:IPeItState) {
        Object.assign(this, data)
    }


}


