import { List } from 'app/modules/information/containers/list/api/list.models';
import { CreateOrAddEntity } from 'app/modules/information/containers/create-or-add-entity/api/create-or-add-entity.models';
import { ClassAndTypeSelector } from 'app/modules/information/containers/class-and-type-selector/api/class-and-type-selector.models';
import { PeItDetail } from 'app/core';

// Class of this slice of store
export class SourceList implements SourceList {

    // the list of sources (search result)
    list?: List;
    // if source being created
    create?: CreateOrAddEntity;
    // the source being edited
    edit?: PeItDetail;
    // the source being removed
    // remove?: ISourceSearchHitState

    // the section being edited
    editSection?: PeItDetail;

    // class and type selector
    classAndTypeSelector?: ClassAndTypeSelector;

    loading?: boolean;

    constructor(data?: SourceList) {
        Object.assign(this, data);
    }
}
