import { DfhClass } from 'app/core';

// Interface of this slice of store
export interface ClassSettingsI {
    dfhClass?: DfhClass;

}

// Class of this slice of store
export class ClassSettings implements ClassSettingsI {
    dfhClass?: DfhClass;

    constructor(data?: ClassSettingsI) {
        Object.assign(this, data);
    }
}
