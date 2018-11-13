import { DfhClass, InfNamespace } from 'app/core';
import { Types } from '../../types/api/types.models';

// Interface of this slice of store
export interface ClassSettingsI {
    dfhClass?: DfhClass;
    types?: Types;
    namespaces?: InfNamespace[];

}

// Class of this slice of store
export class ClassSettings implements ClassSettingsI {
    dfhClass?: DfhClass;
    types?: Types;
    namespaces?: InfNamespace[];

    constructor(data?: ClassSettingsI) {
        Object.assign(this, data);
    }
}

export interface VocabularyItem {
    pk_entity: number;
    label: string
}
