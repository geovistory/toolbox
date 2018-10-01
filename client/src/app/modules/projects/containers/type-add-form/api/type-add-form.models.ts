// Interface of this slice of store
export interface TypeAddFormI {
    items?: {};
    loading?: boolean;
    error?: any;
}

// Class of this slice of store
export class TypeAddForm implements TypeAddFormI {
    items?: {};
    loading?: boolean;
    error?: any;

    constructor(data?: TypeAddFormI) {
        Object.assign(this, data);
    }
}
