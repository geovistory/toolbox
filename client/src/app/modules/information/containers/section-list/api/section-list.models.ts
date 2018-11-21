import { EntityAssociationDetail } from 'app/core/state/models/entity-association-detail';
import { EntityAssociationList } from 'app/core/state/models/entity-association-list';

// Class of this slice of store
export class SectionList implements SectionList {
    pkSections?: number[];
    loading?: boolean;
    error?: any;

    create?: EntityAssociationDetail;

    constructor(data?: SectionList) {
        Object.assign(this, data);
    }
}
