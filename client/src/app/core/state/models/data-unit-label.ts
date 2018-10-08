import { DataUnitChildLabel } from './data-unit-child-label';

export interface DataUnitLabelI {
    // path of that data unit in store
    path?: string[];

    hasMore?: boolean;

    parts: DataUnitChildLabel[];
}

export class DataUnitLabel {
    // path of that data unit in store
    path?: string[];

    hasMore: boolean;
    parts: DataUnitChildLabel[];

    constructor(data?: DataUnitLabelI) {
        Object.assign(this, data);
    }
}
