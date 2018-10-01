// Interface of this slice of store
export interface AppeLangCreateCtrlI {
    items?: {};
    loading?: boolean;
    error?: any;
}

// Class of this slice of store
export class AppeLangCreateCtrl implements AppeLangCreateCtrlI {
    items?: {};
    loading?: boolean;
    error?: any;

    constructor(data?: AppeLangCreateCtrlI) {
        Object.assign(this, data);
    }
}
