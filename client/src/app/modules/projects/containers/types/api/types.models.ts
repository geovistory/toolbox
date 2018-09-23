import { PeItDetail } from 'app/core';

// Interface of this slice of store
export interface TypesI {
    items?: {};
    add?: boolean;
}

// Class of this slice of store
export class Types implements TypesI {
    items?: {};
    add?: boolean;

    constructor(data?: TypesI) {
        Object.assign(this, data);
    }
}
