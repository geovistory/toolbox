import { RoleSetI } from 'app/core/state/models/role-set';

export interface StateSettings {
    parentRolePk?: number;
    parentRoleSet?: RoleSetI;
    isCreateMode?: boolean;
    isAddMode?: boolean;
}
