import { DfhClass, InfNamespace, InfPersistentItem } from 'app/core';
import { TypeEditFormI } from '../../type-edit-form/api/type-edit-form.models';

// Interface of this slice of store
export interface TypesI {
    items?: {};
    add?: boolean;
    edit?: boolean | TypeEditFormI;
    class?: DfhClass;
    loading?: boolean;
    error?: any;
    namespace?: InfNamespace;
}

// Class of this slice of store
export class Types implements TypesI {
    items?: {};
    add?: boolean;
    edit?: boolean | TypeEditFormI;
    loading?: boolean;
    class?: DfhClass;
    error?: any;
    namespace?: InfNamespace;

    constructor(data?: TypesI) {
        Object.assign(this, data);
    }
}
