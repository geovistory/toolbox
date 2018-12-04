import { InfDigitalObject, InfEntityAssociation } from 'app/core';
import { IVersion } from 'app/modules/information/components/version-picker/version-picker.component';
import { QuillDoc, Delta } from 'app/modules/quill';

// Class of this slice of store
export class TextEditor {


    entityAssociation?: InfEntityAssociation;
    digitalObject?: InfDigitalObject;
    quillDoc?: QuillDoc;
    readOnly?: boolean;
    creatingAnnotation?: boolean;

    annotationsVisible?: boolean;

    selectedDelta?: Delta;

    versionList?: IVersion[];

    loading?: boolean;
    error?: any;

    constructor(data?: TextEditor) {
        Object.assign(this, data);
    }
}
