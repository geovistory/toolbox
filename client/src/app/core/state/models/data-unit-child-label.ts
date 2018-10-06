import { RoleLabel } from './role-label';

export interface DataUnitChildLabelI {
    // path of that data unit child in store
    path?: string[];

    introducer?: string;
    roleLabels?: RoleLabel[];
    prefix?: string;
    suffix?: string;
}

export class DataUnitChildLabel {
    // path of that data unit child in store
    path?: string[];

    introducer: string;
    roleLabels: RoleLabel[];
    prefix: string;
    suffix: string;

    constructor(data?: DataUnitChildLabelI) {
        Object.assign(this, data);
    }
}
