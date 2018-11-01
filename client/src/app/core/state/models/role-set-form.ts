import { RoleDetailList } from './role-detail-list';

export class PropertyFieldForm {

    _role_create_list?: RoleDetailList;

    _role_add_list?: RoleDetailList;

    _role_add_in_no_project_list?: RoleDetailList;

    constructor(data?: PropertyFieldForm) {
        Object.assign(this, data);
    }
}
