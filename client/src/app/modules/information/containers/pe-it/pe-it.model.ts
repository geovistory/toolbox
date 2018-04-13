import { BehaviorSubject } from "rxjs";
import { InfPersistentItem, DfhClass } from "app/core";
import { CollapsedExpanded, EditorStates } from "../../information.models";
import { PiRoleSetListState } from "./../pe-it-role-set-list/pe-it-role-set-list.model";



export interface IPeItState {
    /** db data */
    peItToEdit?: InfPersistentItem;
    peItToAdd?: InfPersistentItem;
    peItToCreate?: InfPersistentItem;

    /** init data */
    pkEntity?: number
    state?: EditorStates;

    /** display data */
    label?: string;
    toggle?: CollapsedExpanded;
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean

    piRoleSetListState?: PiRoleSetListState
}

export class PeItState implements IPeItState {
    /** db data */
    peItToEdit?: InfPersistentItem;
    peItToAdd?: InfPersistentItem;
    peItToCreate?: InfPersistentItem;

    /** init data */
    pkEntity?: number
    state?: EditorStates;

    /** display data */
    label?: string;
    toggle?: CollapsedExpanded;
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean

    piRoleSetListState?: PiRoleSetListState

    constructor(data?:IPeItState) {
        Object.assign(this, data)
    }


}


