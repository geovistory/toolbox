import { DataUnitChildLabel } from './data-unit-child-label';

export interface DataUnitLabelI {
    hasMore?: boolean;
    parts: DataUnitChildLabel[];
}

export class DataUnitLabel {
    hasMore: boolean;
    parts: DataUnitChildLabel[];

    constructor(data?: DataUnitLabelI) {
        Object.assign(this, data);
    }
}
