import { PeItDetail } from 'app/core';
import { CreateOrAddEntity } from 'app/modules/information/containers/create-or-add-entity/api/create-or-add-entity.models';

// Class of this slice of store
export class SourceDetail {

    // if source being created
    add?: CreateOrAddEntity;
    // the source being edited
    editSource?: PeItDetail;
    // the source being removed
    // remove?: ISourceSearchHitState

    // the section being edited
    editSection?: PeItDetail;

    loading?: boolean;
    removed?: boolean;
    
    // title in the tab
    tabTitle?: string;

    constructor(data?: SourceDetail) {
        Object.assign(this, data);
    }
}
