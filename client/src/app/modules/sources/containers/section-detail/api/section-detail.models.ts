// Class of this slice of store
export class SectionDetail implements SectionDetail {
    items?: {};
    loading?: boolean;
    error?: any;

    constructor(data?: SectionDetail) {
        Object.assign(this, data);
    }
}
