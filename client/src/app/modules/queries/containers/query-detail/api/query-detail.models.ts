// Class of this slice of store
export class QueryDetail {
    items?: any;
    loading?: boolean;
    error?: any;

    // Layout
    showRightArea?: boolean;

    constructor(data?: QueryDetail) {
        Object.assign(this, data);
    }
}
