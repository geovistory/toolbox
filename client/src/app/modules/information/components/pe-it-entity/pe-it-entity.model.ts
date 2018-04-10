import { BehaviorSubject } from "rxjs";
import { InfPersistentItem, DfhClass } from "app/core";
import { CollapsedExpanded, EditorStates } from "../../information.models";
import { IPiRoleSetListWrapper } from "../pe-it-role-set-list/model";



export interface IPeItWrapper {
    data: {
        pkEntity: number
        peIt: InfPersistentItem;
        class: DfhClass;
    }

    gui: {
        label: string;
        state: EditorStates;
        toggle: CollapsedExpanded;
        ontoInfoVisible: boolean;
        communityStatsVisible: boolean
    }

    children: {
        piRoleSetList$: BehaviorSubject<IPiRoleSetListWrapper>;
    }
}

export class PeItWrapper implements IPeItWrapper {
    data: {
        pkEntity: number;
        peIt: InfPersistentItem;
        class: DfhClass;
    }

    gui: {
        label: string;
        state: EditorStates;
        toggle: CollapsedExpanded;
        ontoInfoVisible: boolean;
        communityStatsVisible: boolean
    }

    children: {
        piRoleSetList$: BehaviorSubject<IPiRoleSetListWrapper>;
    }

    constructor(data?) {
        Object.assign(
            this,
            {
                data: {
                    pkEntity: undefined,
                    peIt: undefined,
                    class: undefined,
                },
                gui: {
                    label: undefined,
                    state: undefined,
                    toggle: undefined,
                    ontoInfoVisible: undefined,
                    communityStatsVisible: undefined
                },
                children: {
                    piRoleSetList$: new BehaviorSubject(null),
                }
            },
            data
        )
    }


}


