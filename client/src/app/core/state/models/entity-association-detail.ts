import { ClassConfig } from 'app/core/active-project';
import { InfEntityAssociation } from 'app/core/sdk';
import { EntityAssociationList } from './entity-association-list';
import { PeItDetail } from './pe-it-detail';
import { RoleSet } from './role-set';


export class EntityAssociationDetail {

    _peIt?: PeItDetail

    // record
    entityAssociation?: InfEntityAssociation;

    isOutgoing?: boolean;

    propertyConfig?: RoleSet;
    targetClassConfig?: ClassConfig;

    // list of alternatives or existing associations from other projects
    existingList?: EntityAssociationList;

    // giu
    loading?: boolean;


    constructor(data?: EntityAssociationDetail) {
        Object.assign(this, data);
    }

}
