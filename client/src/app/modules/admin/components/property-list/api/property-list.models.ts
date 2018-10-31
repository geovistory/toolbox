import { DfhProperty } from 'app/core/sdk/models/DfhProperty';


// Class of this slice of store
export class PropertyList {
    items?: { [key: string]: DfhProperty };

    constructor(data?: PropertyList) {
        Object.assign(this, data);
    }
}
