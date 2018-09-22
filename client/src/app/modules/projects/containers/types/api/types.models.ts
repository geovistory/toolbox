// Interface of this slice of store
export interface TypesI {
    items?: {};
    loading?: boolean;
    error?: any;
}

// Class of this slice of store
export class Types implements TypesI {
    items?: {};
    loading?: boolean;
    error?: any;

    constructor(data?: TypesI) {
        Object.assign(this, data);
    }
}
