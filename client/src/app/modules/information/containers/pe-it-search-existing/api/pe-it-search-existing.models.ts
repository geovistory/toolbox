import { InfPersistentItem } from 'app/core';

// Class of this slice of store
export class PeItSearchExisting {

    // filters
    pkClass?: number;
    pkNamespace?: number; // for E55 Type instances that belong to a namespace

    // result
    persistentItems?: InfPersistentItem[];
    collectionSize?: number;
    loading?: boolean;
    error?: any;

    constructor(data?: PeItSearchExisting) {
        Object.assign(this, data);
    }
}
