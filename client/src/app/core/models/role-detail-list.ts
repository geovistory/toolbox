import { RoleDetail } from "./role-detail";

export interface RoleDetailListI { [key: string]: RoleDetail }


export class RoleDetailList implements RoleDetailListI {
    [key: string]: RoleDetail;
    
    constructor(data?: RoleDetailListI) {
        Object.assign(this, data);
    }
}