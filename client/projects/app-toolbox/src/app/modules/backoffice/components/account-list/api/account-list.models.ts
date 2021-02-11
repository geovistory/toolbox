// Class of this slice of store

export interface BoRole {
    id: number;
    name: string; // system_admin
}
export interface BoProjectRels {
    pk_project: number;
    role: string; // owner, member
}
export interface BoAccount {
    roles: BoRole[];
    projectrels: BoProjectRels
}
export interface BoAccounts {
        [key: string]: Account
}
export class AccountList implements AccountList {
    items?: BoAccounts;
    loading?: boolean;
    error?: any;

    constructor(data?: AccountList) {
        Object.assign(this, data);
    }
}
