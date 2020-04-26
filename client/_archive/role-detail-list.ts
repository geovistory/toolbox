import { RoleDetail } from './role-detail';


export class RoleDetailList  {
    [key: string]: RoleDetail;

    constructor(data?: RoleDetailList) {
        Object.assign(this, data);
    }
}
