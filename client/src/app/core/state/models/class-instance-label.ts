import { ClassInstanceFieldLabel } from './class-instance-field-label';


export class  ClassInstanceLabel {
    // path of that data unit in store
    path?: string[];

    hasMore?: boolean;
    parts: ClassInstanceFieldLabel[];

    constructor(data?:  ClassInstanceLabel) {
        Object.assign(this, data);
    }
}
