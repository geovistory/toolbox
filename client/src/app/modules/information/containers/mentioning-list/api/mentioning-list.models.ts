// Class of this slice of store
export class MentioningList implements MentioningList {
    items?: {};
    loading?: boolean;
    error?: any;

    constructor(data?: MentioningList) {
        Object.assign(this, data);
    }
}
