import { RoleDetailList } from "./role-detail-list";

/*******************************
 * RoleSetForm Interface
 *******************************/

export interface RoleSetFormI {
    _role_create_list?: RoleDetailList;

    _role_add_list?: RoleDetailList;

    _role_add_in_no_project_list?: RoleDetailList;
}



export class RoleSetForm implements RoleSetFormI {

    _role_create_list?: RoleDetailList;

    _role_add_list?: RoleDetailList;

    _role_add_in_no_project_list?: RoleDetailList;
    
    constructor(data?: RoleSetFormI) {
        Object.assign(this, data);
    }
}