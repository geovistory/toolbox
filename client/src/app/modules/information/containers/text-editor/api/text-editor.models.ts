import { InfDigitalObject } from 'app/core';
import { IVersion } from 'app/modules/sources';

// Class of this slice of store
export class TextEditor implements TextEditor {

    view?: InfDigitalObject;
    edit?: InfDigitalObject;
    annotate?: InfDigitalObject;
    versionList?: IVersion[];

    loading?: boolean;
    error?: any;

    constructor(data?: TextEditor) {
        Object.assign(this, data);
    }
}
