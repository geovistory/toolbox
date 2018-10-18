import { InfPersistentItem } from 'app/core';

// Class of this slice of store
export class PeItSearchExisting implements PeItSearchExisting {
    persistentItems?: InfPersistentItem[];
    collectionSize?: number;
    loading?: boolean;
    error?: any;

    constructor(data?: PeItSearchExisting) {
        Object.assign(this, data);
    }
}
