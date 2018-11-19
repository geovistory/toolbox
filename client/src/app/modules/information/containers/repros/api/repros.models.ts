// Class of this slice of store
export class Repros {
    items?: {};

    showText?= true;
    showImage?= false;
    showTable?= false;

    textEditor?

    loading?: boolean;
    error?: any;

    constructor(data?: Repros) {
        Object.assign(this, data);
    }
}
