import { PeItDetail, DfhClass } from 'app/core';

// Interface of this slice of store
export interface TypesI {
    items?: {};
    add?: boolean;
    class?: DfhClass;
    loading?: boolean;
    error?: any;
}

// Class of this slice of store
export class Types implements TypesI {
    items?: {};
    add?: boolean;
    loading?: boolean;
    class?: DfhClass;
    error?: any;

    constructor(data?: TypesI) {
        Object.assign(this, data);
    }
}
