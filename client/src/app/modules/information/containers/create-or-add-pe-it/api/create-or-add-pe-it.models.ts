import { PeItDetail } from 'app/core';
import { PeItSearchExisting } from '../../pe-it-search-existing/api/pe-it-search-existing.models';
import { ClassAndTypePk } from '../../class-and-type-selector/api/class-and-type-selector.models';

// Class of this slice of store
export class CreateOrAddPeIt implements CreateOrAddPeIt {
    items?: {};
    loading?: boolean;
    error?: any;

    createForm?: PeItDetail;
    searchExisting?: PeItSearchExisting;
    classAndTypePk?: ClassAndTypePk;

    constructor(data?: CreateOrAddPeIt) {
        Object.assign(this, data);
    }
}
