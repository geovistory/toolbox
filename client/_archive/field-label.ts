export class FieldLabel {
    default: string;
    pl: string;
    sg: string;

    constructor(data?: FieldLabel) {
        Object.assign(this, data);
    }
}
