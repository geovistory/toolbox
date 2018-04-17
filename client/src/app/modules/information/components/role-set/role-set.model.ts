import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { InfPersistentItem, DfhProperty, InfRole } from "app/core";
import { CollapsedExpanded, EditorStates } from "../../information.models";

import { IPeItState } from "../../containers/pe-it/pe-it.model";
import { RoleSetLabelObj } from "./role-set.component";
import { IRoleState } from "../role/role.model";

export interface IRoleStates {
    [key: string]: IRoleState;
}

export type AddRoleState = 'init' | 'selectExisting' | 'createNew';

export interface IRoleSetState {
    property?: DfhProperty;
    isOutgoing?: boolean;
    // fkProperty?: number;

    roles?: InfRole[];

    // related to adding roles
    rolesToAdd?: InfRole[];
    rolesInOtherProjects?: InfRole[];
    rolesInNoProject?: InfRole[];
    addRoleState?: AddRoleState;

    // related to creating roles
    rolesToCreate?: InfRole[];

    state?: EditorStates;
    toggle?: CollapsedExpanded;
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean;

    label?: RoleSetLabelObj;
    targetClassPk?: number;

    //Children
    childRoleStates?: IRoleStates
}

export class RoleSetState implements IRoleSetState {
    property?: DfhProperty;
    isOutgoing?: boolean;
    // fkProperty?: number;

    roles?: InfRole[];

    // related to adding roles
    rolesToAdd?: InfRole[];
    rolesInOtherProjects?: InfRole[];
    rolesInNoProject?: InfRole[];
    addRoleState?: AddRoleState;

    // related to creating roles
    rolesToCreate?: InfRole[];

    state?: EditorStates;
    toggle?: CollapsedExpanded;
    ontoInfoVisible?: boolean;
    communityStatsVisible?: boolean;

    label?: RoleSetLabelObj;
    targetClassPk?: number;

    //Children
    childRoleStates?: IRoleStates

    constructor(data?: IRoleSetState) {
        Object.assign(
            this,
            data
        )
    }

}
