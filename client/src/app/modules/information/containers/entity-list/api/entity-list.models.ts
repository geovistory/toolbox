import { PeItDetail, InfPersistentItem, EntityPreview, TeEntDetail } from 'app/core';
import { CreateOrAddEntity } from '../../create-or-add-entity/api/create-or-add-entity.models';
import { ClassAndTypeSelector } from '../../class-and-type-selector/api/class-and-type-selector.models';
import { List } from '../../list/api/list.models';


export class Information {

    // search results
    items?: List;

    // class and type selector
    classAndTypeSelector?: ClassAndTypeSelector;

    loading?: boolean;

    constructor(data?: Information) {
        Object.assign(this, data);
    }
}
