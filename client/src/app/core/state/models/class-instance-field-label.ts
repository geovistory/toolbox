import { RoleLabel } from './role-label';


export class ClassInstanceFieldLabel {
    // path of that data unit child in store
    path?: string[];

    introducer?: string;
    roleLabels?: RoleLabel[];
    prefix?: string;
    suffix?: string;

    constructor(data?: ClassInstanceFieldLabel) {
        Object.assign(this, data);
    }
}
