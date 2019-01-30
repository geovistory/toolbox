import { PeItDetail } from 'app/core';
import { CreateOrAddEntity } from 'app/modules/information/containers/create-or-add-entity/api/create-or-add-entity.models';

// Class of this slice of store
export class SourceDetail {

    // if source being created
    create?: CreateOrAddEntity;
    // the source being edited
    edit?: PeItDetail;
    // the source being removed
    // remove?: ISourceSearchHitState

    // the section being edited
    editSection?: PeItDetail;

    loading?: boolean;

    constructor(data?: SourceDetail) {
        Object.assign(this, data);
    }
}
