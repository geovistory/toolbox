import { DatDigital, InfEntityAssociation } from 'app/core';
import { IVersion } from 'app/modules/information/components/version-picker/version-picker.component';
import { Ops, QuillDoc } from 'app/modules/quill/quill.models';

// Class of this slice of store
export class TextEditor {


    entityAssociation?: InfEntityAssociation;
    digitalObject?: DatDigital;
    quillDoc?: QuillDoc;
    readOnly?: boolean;
    creatingAnnotation?: boolean;

    annotationsVisible?: boolean;

    selectedDelta?: Ops;

    versionList?: IVersion[];

    loading?: boolean;
    error?: any;

    constructor(data?: TextEditor) {
        Object.assign(this, data);
    }
}
