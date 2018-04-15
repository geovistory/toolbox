import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { InfRole, DfhProperty, InfPersistentItem, DfhClass } from "app/core";
import { EditorStates } from "../../information.models";
import { DirectionAwareProperty } from "../../shared/property.service";
import { RoleSetState } from "../../components/role-set/role-set.model";


export type SelectPropStateType = 'init' | 'selectProp'

export interface IRoleSetListState {
    pkEntity?: number,
    roles?: InfRole[],
    outgoingProperties?: DfhProperty[],
    ingoingProperties?: DfhProperty[],
    ingoingPropertiesToAdd?: DirectionAwareProperty[];
    outgoingPropertiesToAdd?: DirectionAwareProperty[];
    parentPeIt?: InfPersistentItem,

    fkClass?: number;
    dfhClass?: DfhClass;

    /** gui */
    state?: EditorStates,

    selectPropState?: SelectPropStateType; // state of child components for adding or creating properties
    propertyToAdd?: DirectionAwareProperty; // Poperty that is currently chosen in order to add a role of this kind
    ontoInfoVisible?: boolean,
    communityStatsVisible?: boolean

    roleSets?: RoleSetState[]

}

export class RoleSetListState implements IRoleSetListState {
    pkEntity?: number;
    roles?: InfRole[];
    outgoingProperties?: DfhProperty[];
    ingoingProperties?: DfhProperty[];
    ingoingPropertiesToAdd?: DirectionAwareProperty[];
    outgoingPropertiesToAdd?: DirectionAwareProperty[];
    parentPeIt?: InfPersistentItem;

    fkClass?: number
    dfhClass?: DfhClass;

    state?: EditorStates;
    selectPropState?: SelectPropStateType;
    propertyToAdd?: DirectionAwareProperty;
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean;

    roleSets?: RoleSetState[]

    constructor(data?: IRoleSetListState) {
        Object.assign(
            this,
            data
        )
    }


}


