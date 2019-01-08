import { PeItDetail } from 'app/core';
import { CreateOrAddEntity } from 'app/modules/information/containers/create-or-add-entity/api/create-or-add-entity.models';

// Class of this slice of store
export class LeafPeItView extends PeItDetail {
    error?: any;

    selectOrCreate?: CreateOrAddEntity;

    constructor(data?: LeafPeItView) {
        super()
        Object.assign(this, data);
    }
}
