import { InfNamespace } from 'app/core/sdk/models/InfNamespace';

// Interface of this slice of store
export interface NamespaceListI {
    namespaces?: InfNamespace[];
}

// Class of this slice of store
export class NamespaceList implements NamespaceListI {
    namespaces?: InfNamespace[];

    constructor(data?: NamespaceListI) {
        Object.assign(this, data);
    }
}
