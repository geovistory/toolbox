import { SysSystemType } from 'app/core/sdk/models/ComSystemType';

// Interface of this slice of store
export interface SystemTypeListI {
    systemtypes?: SysSystemType[];
}

// Class of this slice of store
export class SystemTypeList implements SystemTypeListI {
    systemtypes?: SysSystemType[];

    constructor(data?: SystemTypeListI) {
        Object.assign(this, data);
    }
}
