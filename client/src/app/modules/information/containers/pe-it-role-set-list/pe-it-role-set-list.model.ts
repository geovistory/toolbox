import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { InfRole, DfhProperty, InfPersistentItem } from "app/core";
import { EditorStates } from "../../information.models";
import { DirectionAwareProperty } from "../../shared/property.service";
import { RoleSetState } from "../../components/role-set/role-set.model";


export type SelectPropStateType = 'init' | 'selectProp'

export interface IPiRoleSetListState {
    pkEntity?: number,
    roles?: InfRole[],
    outgoingProperties?: DfhProperty[],
    ingoingProperties?: DfhProperty[],
    parentPeIt?: InfPersistentItem,

    /** gui */
    state?: EditorStates,

    selectPropState?: SelectPropStateType; // state of child components for adding or creating properties
    propertyToAdd?: DirectionAwareProperty; // Poperty that is currently chosen in order to add a role of this kind
    ontoInfoVisible?: boolean,
    communityStatsVisible?: boolean

    roleSets?: RoleSetState[]

}

export class PiRoleSetListState implements IPiRoleSetListState {
    pkEntity?: number;
    roles?: InfRole[];
    outgoingProperties?: DfhProperty[];
    ingoingProperties?: DfhProperty[];
    parentPeIt?: InfPersistentItem;

    state?: EditorStates;
    selectPropState?: SelectPropStateType;
    propertyToAdd?: DirectionAwareProperty;
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean;

    roleSets?: RoleSetState[]

    constructor(data?: IPiRoleSetListState) {
        Object.assign(
            this,
            data
        )
    }


}


