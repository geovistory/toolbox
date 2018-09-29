import { InfPersistentItem } from "../../../../../core";

// Interface of this slice of store
export interface TypeEditFormI {
    peIt?: InfPersistentItem;
    loading?: boolean;
    error?: any;
}

// Class of this slice of store
export class TypeEditForm implements TypeEditFormI {
    peIt?: InfPersistentItem;
    loading?: boolean;
    error?: any;

    constructor(data?: TypeEditFormI) {
        Object.assign(this, data);
    }
}
