import { RoleSet } from './role-set';

export interface RoleSetListI { [key: string]: RoleSet }

export class RoleSetList implements RoleSetListI {
    [key: string]: RoleSet;

    constructor(data?: RoleSetListI) {
        Object.assign(this, data);
    }
}
