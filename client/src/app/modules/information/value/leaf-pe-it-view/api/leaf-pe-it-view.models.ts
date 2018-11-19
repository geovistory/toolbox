import { PeItDetail } from 'app/core';
import { CreateOrAddPeIt } from 'app/modules/information/containers/create-or-add-pe-it/api/create-or-add-pe-it.models';

// Class of this slice of store
export class LeafPeItView extends PeItDetail {
    error?: any;

    selectOrCreate?: CreateOrAddPeIt;

    constructor(data?: LeafPeItView) {
        super()
        Object.assign(this, data);
    }
}
