import { HasTypePropertyReadable } from "app/core/state/models";

// Class of this slice of store
export class HasType implements HasType {
    items?: HasTypePropertyReadable[];
    loading?: boolean;
    error?: any;

    constructor(data?: HasType) {
        Object.assign(this, data);
    }
}
