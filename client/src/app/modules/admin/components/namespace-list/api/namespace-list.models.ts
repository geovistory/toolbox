// Interface of this slice of store
export interface NamespaceListI {
    items?: {};
    loading?: boolean;
    error?: any;
}

// Class of this slice of store
export class NamespaceList implements NamespaceListI {
    items?: {};
    loading?: boolean;
    error?: any;

    constructor(data?: NamespaceListI) {
        Object.assign(this, data);
    }
}
