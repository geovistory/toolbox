import { RoleSetI } from './role-set';

export interface RoleSetListI { [key: string]: RoleSetI }

export class RoleSetList implements RoleSetListI {
    [key: string]: RoleSetI;

    constructor(data?: RoleSetListI) {
        Object.assign(this, data);
    }
}
