import { EntityPreview, PeItDetail, TeEntDetail } from 'app/core';
import { CreateOrAddEntity } from '../../create-or-add-entity/api/create-or-add-entity.models';


export class EntityDetail {

    // the peIt to remove (are you sure?)
    _peIt_remove?: EntityPreview;

    // the peIt in editable detail view
    _peIt_editable?: PeItDetail;

    // the teEn in editable detail view
    _teEnt_editable?: TeEntDetail;

    // the entity to add or create
    _add?: CreateOrAddEntity;

    loading?: boolean;

    removed?: boolean;

    // title in the tab
    tabTitle?: string;

    constructor(data?: EntityDetail) {
        Object.assign(this, data);
    }
}
