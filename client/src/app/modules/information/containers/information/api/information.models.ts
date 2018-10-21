import { PeItSearchHit, PeItDetail, InfPersistentItem } from 'app/core';
import { CreateOrAddPeIt } from '../../create-or-add-pe-it/api/create-or-add-pe-it.models';
import { ClassAndTypeSelector } from '../../class-and-type-selector/api/class-and-type-selector.models';

export interface SearchResponse { data: InfPersistentItem[], totalCount: number };




export class Information {

    // search results
    _peIt_list?: PeItSearchHit[];
    collectionSize?: number;
    loading?: boolean;

    // the peIt to remove (are you sure?)
    _peIt_remove?: PeItSearchHit;

    // the peIt in editable detail view
    _peIt_editable?: PeItDetail;

    // the peIt to add or create
    _peIt_add?: CreateOrAddPeIt;

    // class and type selector
    classAndTypeSelector?: ClassAndTypeSelector;

    constructor(data?: Information) {
        Object.assign(this, data);
    }
}
