// Class of this slice of store
export class VisualList implements VisualList {
    items?: {};
    loading?: boolean;
    error?: any;

    constructor(data?: VisualList) {
        Object.assign(this, data);
    }
}
