import { RoleLabel } from "./role-label";

export interface DataUnitChildLabelI {
    introducer?: string;
    roleLabel?: RoleLabel;
    prefix?: string;
    suffix?: string;
}

export class DataUnitChildLabel {
    introducer: string;
    roleLabel: RoleLabel;
    prefix: string;
    suffix: string;

    constructor(data?: DataUnitChildLabelI) {
        Object.assign(this, data);
    }
}