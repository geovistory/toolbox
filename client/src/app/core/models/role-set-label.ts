export interface RoleSetLabelI {
    default: string;
    pl: string;
    sg: string;
}

export class RoleSetLabel implements RoleSetLabelI {
    default: string;
    pl: string;
    sg: string;

    constructor(data?: RoleSetLabelI) {
        Object.assign(this, data);
    }
}