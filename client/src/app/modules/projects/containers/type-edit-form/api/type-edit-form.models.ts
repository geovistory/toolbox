// Interface of this slice of store
export interface TypeEditFormI {
    items?: {};
    loading?: boolean;
    error?: any;
}

// Class of this slice of store
export class TypeEditForm implements TypeEditFormI {
    items?: {};
    loading?: boolean;
    error?: any;

    constructor(data?: TypeEditFormI) {
        Object.assign(this, data);
    }
}
