import { DatNamespace } from '@kleiolab/lib-sdk-lb3';

// Interface of this slice of store
export interface NamespaceListI {
    namespaces?: DatNamespace[];
}

// Class of this slice of store
export class NamespaceList implements NamespaceListI {
    namespaces?: DatNamespace[];

    constructor(data?: NamespaceListI) {
        Object.assign(this, data);
    }
}
