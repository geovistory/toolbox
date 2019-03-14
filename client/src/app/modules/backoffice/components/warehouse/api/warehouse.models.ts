// Class of this slice of store
export class Warehouse implements Warehouse {
    createEntityPreviewsLoading?: boolean;
    createEntityPreviewsInfo?: string;
    
    error?: any;

    constructor(data?: Warehouse) {
        Object.assign(this, data);
    }
}
