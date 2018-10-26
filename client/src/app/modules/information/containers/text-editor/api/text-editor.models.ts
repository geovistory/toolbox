import { InfDigitalObject, InfEntityAssociation } from 'app/core';
import { IVersion } from 'app/modules/information/components/version-picker/version-picker.component';
import { QuillDoc } from 'app/modules/quill';

// Class of this slice of store
export class TextEditor implements TextEditor {


    entityAssociation?: InfEntityAssociation;
    digitalObject?: InfDigitalObject;
    quillDoc?: QuillDoc;
    readOnly?: boolean;
    creatingAnnotation?: boolean;

    versionList?: IVersion[];

    loading?: boolean;
    error?: any;

    constructor(data?: TextEditor) {
        Object.assign(this, data);
    }
}
