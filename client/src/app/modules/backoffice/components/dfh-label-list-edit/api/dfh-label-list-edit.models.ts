// Interface of this slice of store
export interface DfhLabelListEditI {
    items?: {};
    infFkLanguage?: number;
    comFkSystemType?: number;

    creating?: boolean;
    loading?: boolean;
    error?: any;
}

// Class of this slice of store
export class DfhLabelListEdit implements DfhLabelListEditI {
    items?: {};
    infFkLanguage?: number;
    comFkSystemType?: number;
    creating?: boolean;
    loading?: boolean;
    error?: any;

    constructor(data?: DfhLabelListEditI) {
        Object.assign(this, data);
    }
}
