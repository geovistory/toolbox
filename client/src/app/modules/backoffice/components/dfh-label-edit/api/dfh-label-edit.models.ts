import { DfhLabelInterface, DfhLabel } from 'app/core';

// Interface of this slice of store
export interface DfhLabelEditI extends DfhLabelInterface {
    loading?: boolean;
    editing?: boolean;
};

// Class of this slice of store
export class DfhLabelEdit extends DfhLabel implements DfhLabelEditI {
    loading?: boolean;
    editing?: boolean;

    constructor(data?: DfhLabelEditI) {
        super()
        Object.assign(this, data);
    }
}
