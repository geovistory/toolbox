import { DfhClass, InfNamespace } from 'app/core';

// Interface of this slice of store
export interface TypesI {
    items?: {};
    add?: boolean;
    edit?: boolean;
    class?: DfhClass;
    loading?: boolean;
    error?: any;
    namespace?: InfNamespace;
}

// Class of this slice of store
export class Types implements TypesI {
    items?: {};
    add?: boolean;
    loading?: boolean;
    class?: DfhClass;
    error?: any;
    namespace?: InfNamespace;

    constructor(data?: TypesI) {
        Object.assign(this, data);
    }
}
