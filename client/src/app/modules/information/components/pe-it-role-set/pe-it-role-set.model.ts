import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { RoleSets } from "../../shared/role.service";
import { InfPersistentItem } from "app/core";
import { CollapsedExpanded, EditorStates } from "../../information.models";


export interface IPiRoleSetWrapper {
    data: {
        propertySection: RoleSets,
        fkProperty: number,
        parentPeIt: InfPersistentItem,
        parentEntityPk: number,
    }

    gui: {
        state: EditorStates,
        toggle: CollapsedExpanded,
        ontoInfoVisible: boolean,
        communityStatsVisible: boolean,
    }

    // children: BehaviorSubject<IPiRoleWrapper[]>
}

export class PiRoleSetWrapper implements IPiRoleSetWrapper {

    data: {
        propertySection: RoleSets,
        fkProperty: number,
        parentPeIt: InfPersistentItem,
        parentEntityPk: number,
    }

    gui: {
        state: EditorStates,
        toggle: CollapsedExpanded,
        ontoInfoVisible: boolean,
        communityStatsVisible: boolean,
    }

    // children: BehaviorSubject<IPiRoleWrapper[]>


    constructor(data?) {
        Object.assign(
            this,
            {
                data: {
                    propertySection: undefined,
                    fkProperty: undefined,
                    parentPeIt: undefined,
                    parentEntityPk: undefined,
                },

                gui: {
                    state: undefined,
                    toggle: undefined,
                    ontoInfoVisible: undefined,
                    communityStatsVisible: undefined,
                },

                children: new BehaviorSubject(null),
            },
            data
        )
    }

}
