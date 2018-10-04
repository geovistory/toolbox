import { DfhProperty } from 'app/core/sdk/models/DfhProperty';

// Interface of this slice of store
export interface PropertyListI {
    items?: { [key: string]: DfhProperty };
}

// Class of this slice of store
export class PropertyList implements PropertyListI {
    items?: { [key: string]: DfhProperty };

    constructor(data?: PropertyListI) {
        Object.assign(this, data);
    }
}
