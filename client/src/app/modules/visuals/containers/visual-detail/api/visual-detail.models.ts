// Class of this slice of store
export class VisualDetail implements VisualDetail {
    items?: {};
    loading?: boolean;
    error?: any;

    tabTitle?: string;

    // Layout
    showRightArea?: boolean;
    
    constructor(data?: VisualDetail) {
        Object.assign(this, data);
    }
}
