import { InfEntityAssociation, DfhClass } from 'app/core/sdk';
import { PeItDetail } from './pe-it-detail';
import { ClassConfig } from 'app/core/active-project';
import { RoleSet } from './role-set';


export class EntityAssociationDetail {

    _peIt?: PeItDetail

    // record
    entityAssociation?: InfEntityAssociation;

    isOutgoing?: boolean;

    propertyConfig?: RoleSet;
    targetClassConfig?: ClassConfig;

    // list of alternatives or existing associations from other projects
    existingList?: EntityAssociationDetail[];

    // giu
    loading?: boolean;


    constructor(data?: EntityAssociationDetail) {
        Object.assign(this, data);
    }

}
