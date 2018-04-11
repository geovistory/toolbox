import { BehaviorSubject } from "rxjs";
import { InfPersistentItem, DfhClass } from "app/core";
import { CollapsedExpanded, EditorStates } from "../../information.models";
import { RoleSets } from "../../shared/role.service";



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

    children?: {
        roleSets: RoleSets
    }
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


    
    children: {
        roleSets: any
    }

    constructor(data?:IPeItState) {
        Object.assign(this, data)
    }


}


