// Class of this slice of store
export class TextPropertyField implements TextPropertyField {
    items?: {};
    loading?: boolean;
    error?: any;

    constructor(data?: TextPropertyField) {
        Object.assign(this, data);
    }
}
