import { PeItDetail, TeEntDetail } from 'app/core';
import { PeItSearchExisting } from '../../pe-it-search-existing/api/pe-it-search-existing.models';
import { ClassAndTypePk } from '../../class-and-type-selector/api/class-and-type-selector.models';

// Class of this slice of store
export class CreateOrAddEntity implements CreateOrAddEntity {
    items?: {};
    loading?: boolean;
    error?: any;

    createPeItForm?: PeItDetail;
    createTeEnForm?: TeEntDetail;
    searchExisting?: PeItSearchExisting;
    classAndTypePk?: ClassAndTypePk;
    pkUiContext?: number;
    pkNamespace?: number; // this is used for creating E55 Types

    constructor(data?: CreateOrAddEntity) {
        Object.assign(this, data);
    }
}
