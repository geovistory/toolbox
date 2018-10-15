import {  PeItDetail } from 'app/core';

// Class of this slice of store
export class LeafPeItView extends PeItDetail {
    error?: any;

    constructor(data?: LeafPeItView) {
        super()
        Object.assign(this, data);
    }
}
