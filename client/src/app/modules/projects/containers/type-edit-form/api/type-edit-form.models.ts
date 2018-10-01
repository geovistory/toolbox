import { PeItDetail } from 'app/core';

// Interface of this slice of store
export interface TypeEditFormI {
    peItDetail?: PeItDetail;
    loading?: boolean;
    error?: any;
}

// Class of this slice of store
export class TypeEditForm implements TypeEditFormI {
    peItDetail?: PeItDetail;
    loading?: boolean;
    error?: any;

    constructor(data?: TypeEditFormI) {
        Object.assign(this, data);
    }
}
