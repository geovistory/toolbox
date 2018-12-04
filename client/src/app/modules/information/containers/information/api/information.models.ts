import { PeItSearchHit, PeItDetail, InfPersistentItem, DataUnitPreview } from 'app/core';
import { CreateOrAddPeIt } from '../../create-or-add-pe-it/api/create-or-add-pe-it.models';
import { ClassAndTypeSelector } from '../../class-and-type-selector/api/class-and-type-selector.models';
import { List } from '../../list/api/list.models';

export interface DataUnitSearchHit extends DataUnitPreview {
    full_text_headline?: string;
    class_label_headline?: string;
    entity_label_headline?: string;
    type_label_headline?: string;
}

export interface SearchResponse { data: DataUnitSearchHit[], totalCount: number };


export class Information {

    // search results
    _peIt_list?: List;

    // the peIt to remove (are you sure?)
    _peIt_remove?: PeItSearchHit;

    // the peIt in editable detail view
    _peIt_editable?: PeItDetail;

    // the peIt to add or create
    _peIt_add?: CreateOrAddPeIt;

    // class and type selector
    classAndTypeSelector?: ClassAndTypeSelector;

    loading?: boolean;

    constructor(data?: Information) {
        Object.assign(this, data);
    }
}
