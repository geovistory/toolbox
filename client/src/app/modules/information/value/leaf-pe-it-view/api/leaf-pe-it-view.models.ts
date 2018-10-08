import { PeItDetailI, PeItDetail } from 'app/core';

// Interface of this slice of store
export interface LeafPeItViewI extends PeItDetailI {

    error?: any;
}

// Class of this slice of store
export class LeafPeItView extends PeItDetail implements LeafPeItViewI {
    error?: any;

    constructor(data?: LeafPeItViewI) {
        super()
        Object.assign(this, data);
    }
}
