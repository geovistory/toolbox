import { PeItDetail } from 'app/core';
import { CreateOrAddEntity } from 'app/modules/information/containers/create-or-add-entity/create-or-add-entity.componen';

// Class of this slice of store
export class LeafPeItView extends PeItDetail {
    error?: any;

    selectOrCreate?: CreateOrAddEntity;

    constructor(data?: LeafPeItView) {
        super()
        Object.assign(this, data);
    }
}
