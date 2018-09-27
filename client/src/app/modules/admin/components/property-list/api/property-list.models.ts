import { DfhProperty } from 'app/core/sdk/models/DfhProperty';

// Interface of this slice of store
export interface PropertyListI {
    propertys?: DfhProperty[];
}

// Class of this slice of store
export class PropertyList implements PropertyListI {
    propertys?: DfhProperty[];

    constructor(data?: PropertyListI) {
        Object.assign(this, data);
    }
}
