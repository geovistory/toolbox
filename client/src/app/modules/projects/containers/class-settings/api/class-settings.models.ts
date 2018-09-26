import { DfhClass } from 'app/core';
import { TypesI } from '../../types/api/types.models';

// Interface of this slice of store
export interface ClassSettingsI {
    dfhClass?: DfhClass;
    types?: TypesI

}

// Class of this slice of store
export class ClassSettings implements ClassSettingsI {
    dfhClass?: DfhClass;

    constructor(data?: ClassSettingsI) {
        Object.assign(this, data);
    }
}
