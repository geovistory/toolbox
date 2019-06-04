import { PeItDetail, EntityPreview } from 'app/core';
import { CreateOrAddEntity } from 'app/modules/information/containers/create-or-add-entity/api/create-or-add-entity.models';

// Class of this slice of store
export class SectionDetail {
    // pk_entity of the source, this section belongs to
    pkSource?: number;
    // if section being created
    add?: CreateOrAddEntity;
    // the section being edited
    editSection?: PeItDetail;

    loading?: boolean;
    removed?: boolean;

      // title in the tab
      tabTitle?: string;

    constructor(data?: SectionDetail) {
        Object.assign(this, data);
    }
}
